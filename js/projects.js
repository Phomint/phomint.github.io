import { drawGeminiStar } from './utils.js';

export function initProjects() {
    // --- Project Card Background (Scattered Dots & Symbols) ---
    function initProjectCard(card) {
        const canvas = card.querySelector('.project-points');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let points = [];
        const pointCount = 720; // Increased by 20% (600 -> 720)
        let isHovered = false;
        let isVisible = false;

        // --- Symbol Formation Targets ---
        const symbolTargets = [];
        const centerX = 0.5, centerY = 0.5;

        // 4-Pointed Star ✧ (Center) - Bolder/Thicker Border
        // Wider range for 's' creates a thicker line
        for (let s = 0.20; s <= 0.28; s += 0.015) {
            const density = 0.08; // Slightly lower density for "breathing room" in bold lines
            for (let angle = 0; angle < Math.PI * 2; angle += density) {
                const cosA = Math.cos(angle);
                const sinA = Math.sin(angle);
                // Add a tiny bit of jitter to the target itself for an organic feel
                const jitter = (Math.random() - 0.5) * 0.01;
                const x = Math.sign(cosA) * Math.pow(Math.abs(cosA), 3) * (s + jitter);
                const y = Math.sign(sinA) * Math.pow(Math.abs(sinA), 3) * (s + jitter);
                symbolTargets.push({
                    x: centerX + x,
                    y: centerY + y,
                    type: 'star-border'
                });
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });
        observer.observe(card);

        function resizeCardCanvas() {
            canvas.width = card.offsetWidth;
            canvas.height = card.offsetHeight;
            points.forEach(p => p.setTarget());
        }

        class ProjectPoint {
            constructor() {
                this.init();
                this.isStray = Math.random() < 0.15; // 15% stray points as requested
                this.canJoinSymbol = false;
            }
            init(homeX, homeY) {
                this.x = homeX ?? Math.random() * (card.offsetWidth || 300);
                this.y = homeY ?? Math.random() * (card.offsetHeight || 400);
                this.homeX = this.x;
                this.homeY = this.y;
                this.size = (0.3 + Math.random() * 0.4) * 1.56; // 20% bigger than previous 1.30
                this.setTarget();
                this.speed = Math.random() * 0.01 + 0.005;
                this.ripplePhase = Math.random() * Math.PI * 2;
                this.twinklePhase = Math.random() * Math.PI * 2;
                this.twinkleSpeed = 0.02 + Math.random() * 0.03;
                this.jumpX = 0;
                this.jumpY = 0;
                this.color = { r: 0, g: 0, b: 0 };
            }
            setTarget() {
                if (isHovered && !this.isStray && this.canJoinSymbol) {
                    // Attraction to nearest star
                    let minDist = Infinity;
                    let bestTarget = symbolTargets[0];

                    // Sample a few targets for performance or check all if small count
                    const samples = 40;
                    for (let i = 0; i < samples; i++) {
                        const target = symbolTargets[Math.floor(Math.random() * symbolTargets.length)];
                        const tx = target.x * canvas.width;
                        const ty = target.y * canvas.height;
                        const dist = Math.hypot(this.x - tx, this.y - ty);
                        if (dist < minDist) {
                            minDist = dist;
                            bestTarget = target;
                        }
                    }

                    this.targetX = bestTarget.x * canvas.width;
                    this.targetY = bestTarget.y * canvas.height;
                    this.targetType = bestTarget.type;
                } else {
                    // Floating at same position (directly target home)
                    this.targetX = this.homeX;
                    this.targetY = this.homeY;
                    this.targetType = 'scatter';
                }
            }
            draw() {
                // Twinkling effect: sine wave alpha modulation
                const shimmer = (Math.sin(this.twinklePhase) + 1) * 0.5; // 0 to 1
                const baseAlpha = isHovered ? (this.isStray ? 0.2 : 0.8) : 1.0;
                // Modulate alpha by shimmer (keep it between 40% and 100% of baseAlpha for subtle twinkling)
                const alpha = baseAlpha * (0.6 + shimmer * 0.4);

                // Update twinkle phase for next frame
                this.twinklePhase += this.twinkleSpeed;

                // Matched points turn purple
                const isMatched = isHovered && !this.isStray && this.canJoinSymbol && this.targetType !== 'scatter';
                const r = isMatched ? 106 : 0;
                const g = isMatched ? 27 : 0;
                const b = isMatched ? 154 : 0;

                if (isMatched && (this.targetType === 'star-border' || this.targetType === 'star-fill')) {
                    // Central star points get the Gemini treatment
                    drawGeminiStar(ctx, this.x, this.y, this.size * 2, r, g, b, alpha);
                } else {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                    ctx.fill();
                }
            }
            update() {
                const dx = this.targetX - this.x;
                const dy = this.targetY - this.y;

                const currentSpeed = (isHovered && !this.isStray) ? 0.1 : this.speed;
                this.x += dx * currentSpeed;
                this.y += dy * currentSpeed;

                // Smoother multi-directional wave motion
                const time = Date.now() * 0.0008; // Slower time
                if (!isHovered || this.isStray || !this.canJoinSymbol) {
                    // Wider ripples (lower spatial frequency)
                    const wave1 = Math.sin(time + this.homeX * 0.008);
                    const wave2 = Math.sin(time * 1.1 + this.homeY * 0.008);
                    const wave3 = Math.sin(time * 0.9 + (this.homeX + this.homeY) * 0.004);

                    const combinedWave = (wave1 + wave2 + wave3) / 3;
                    const amp = 0.3; // Very subtle ripples
                    this.y += combinedWave * amp;
                } else {
                    // Very subtle breathing when forming symbol (only for 20% nearest)
                    this.y += Math.sin(time + this.ripplePhase) * 0.1;
                }
            }
        }

        resizeCardCanvas();
        window.addEventListener('resize', resizeCardCanvas);

        // --- Uniform Grid Distribution ---
        const rows = Math.floor(Math.sqrt(pointCount * (card.offsetHeight / card.offsetWidth)));
        const cols = Math.floor(pointCount / rows);
        const cellW = card.offsetWidth / cols;
        const cellH = card.offsetHeight / rows;

        for (let i = 0; i < pointCount; i++) {
            const r = Math.floor(i / cols);
            const c = i % cols;
            // Grid position + slight jitter for organic feel
            const jitterX = (Math.random() - 0.5) * cellW * 0.5;
            const jitterY = (Math.random() - 0.5) * cellH * 0.5;
            const homeX = (c + 0.5) * cellW + jitterX;
            const homeY = (r + 0.5) * cellH + jitterY;

            const p = new ProjectPoint();
            p.init(homeX, homeY);

            // Pre-calculate distance to nearest symbol target (normalized)
            let minDist = Infinity;
            symbolTargets.forEach(target => {
                const dist = Math.hypot(homeX / card.offsetWidth - target.x, homeY / card.offsetHeight - target.y);
                if (dist < minDist) minDist = dist;
            });
            p.distToSymbol = minDist;

            points.push(p);
        }

        // --- localized symbol formation ---
        // Identify the 20% of stars closest to the star symbol
        const nonStrayPoints = points.filter(p => !p.isStray);
        nonStrayPoints.sort((a, b) => a.distToSymbol - b.distToSymbol);
        const joinCount = Math.floor(nonStrayPoints.length * 0.2);
        for (let i = 0; i < joinCount; i++) {
            nonStrayPoints[i].canJoinSymbol = true;
        }

        function animateCard() {
            if (isVisible) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const len = points.length;
                for (let i = 0; i < len; i++) {
                    const p = points[i];
                    p.update();
                    p.draw();
                }
            }
            requestAnimationFrame(animateCard);
        }
        animateCard();

        card.addEventListener('mouseenter', () => {
            isHovered = true;
            points.forEach(p => p.setTarget());
        });
        card.addEventListener('mouseleave', () => {
            isHovered = false;
            points.forEach(p => p.setTarget());
        });
    }

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(initProjectCard);

    // --- Modal Logic ---
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const readmeContent = document.getElementById('readme-content');
    const translationStatus = document.getElementById('translation-status');
    const modalLoader = modal?.querySelector('.modal-loader');

    function openModal() {
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
        if (readmeContent) readmeContent.innerHTML = '';
        if (translationStatus) translationStatus.textContent = '';
    }

    modalClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    async function fetchReadme(repo) {
        const branches = [repo.default_branch, 'main', 'master'];
        const filenames = ['README.md', 'README.markdown', 'README.txt', 'README.rst', 'README', 'readme.md', 'readme.txt'];
        const owner = repo.owner?.login?.toLowerCase() || 'phomint';

        for (const branch of branches) {
            if (!branch) continue;
            for (const filename of filenames) {
                try {
                    const url = `https://raw.githubusercontent.com/${owner}/${repo.name}/${branch}/${filename}`;
                    const response = await fetch(url);
                    if (response.ok) return await response.text();
                } catch (e) { }
            }
        }
        return null;
    }

    async function translateWithGemini(text, targetLang) {
        // Aligned with chat-ai/index.js for robust retrieval across environments
        const apiKey = (window.process && window.process.env && window.process.env.API_KEY) ||
            (import.meta && import.meta.env && import.meta.env.VITE_API_KEY);

        if (!apiKey || apiKey === "YOUR_ACTUAL_GEMINI_API_KEY" || apiKey.includes("PLACEHOLDER")) {
            console.warn('Gemini API key not found. Skipping translation.');
            return text;
        }

        try {
            // Using the standardized package from importmap
            const { GoogleGenerativeAI } = await import('@google/generative-ai');
            const genAI = new GoogleGenerativeAI(apiKey);

            // Fallback list of models, prioritizing the one found in the working chat-ai implementation
            const modelNames = ["gemini-3-flash-preview", "gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro"];

            for (const modelName of modelNames) {
                try {
                    const model = genAI.getGenerativeModel({ model: modelName });
                    const prompt = `Translate the following Markdown content to ${targetLang === 'pt' ? 'Portuguese (Brazil)' : 'English'}. 
                    Keep ALL Markdown formatting identical. If already in target language, return as is. No preamble.
                    Content:\n\n${text}`;

                    const result = await model.generateContent(prompt);
                    const resultText = result.response.text();
                    if (resultText) return resultText;
                } catch (e) {
                    console.warn(`Translation failed with model ${modelName}:`, e);
                }
            }
            throw new Error("All translation models failed.");
        } catch (error) {
            console.error('Final translation error:', error);
            return text;
        }
    }

    // --- Helper for Content Hashing ---
    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash.toString(36);
    }

    async function showProjectDetails(repo) {
        openModal();
        if (modalLoader) modalLoader.style.display = 'flex';
        if (readmeContent) readmeContent.style.display = 'none';
        if (translationStatus) translationStatus.textContent = '';

        const readme = await fetchReadme(repo);
        if (!readme) {
            if (readmeContent) {
                readmeContent.innerHTML = '<p>README not found for this repository.</p>';
                readmeContent.style.display = 'block';
            }
            if (modalLoader) modalLoader.style.display = 'none';
            return;
        }

        const currentLang = localStorage.getItem('selectedLanguage') || 'pt';
        const contentHash = hashCode(readme);
        const cacheKey = `trans_${repo.name}_${currentLang}_${contentHash}`;

        // --- Cache Lookup ---
        const cachedTranslation = localStorage.getItem(cacheKey);
        let displayedContent;

        if (cachedTranslation) {
            displayedContent = cachedTranslation;
            if (translationStatus) {
                translationStatus.textContent = currentLang === 'pt' ?
                    'Traduzido automaticamente por IA (Cache)' :
                    'Automatically translated by AI (Cached)';
            }
        } else {
            if (translationStatus) translationStatus.textContent = currentLang === 'pt' ? 'Traduzindo...' : 'Translating...';

            displayedContent = await translateWithGemini(readme, currentLang);

            // --- Cache Save ---
            if (displayedContent !== readme) {
                try {
                    localStorage.setItem(cacheKey, displayedContent);
                } catch (e) {
                    console.warn('LocalStorage limit reached, could not cache translation.');
                }
            }

            if (translationStatus) {
                translationStatus.textContent = currentLang === 'pt' ?
                    'Traduzido automaticamente por IA' :
                    'Automatically translated by AI';
            }
        }

        if (readmeContent && typeof marked !== 'undefined') {
            readmeContent.innerHTML = marked.parse(displayedContent);
        } else if (readmeContent) {
            readmeContent.textContent = displayedContent; // Fallback
        }

        if (modalLoader) modalLoader.style.display = 'none';
        if (readmeContent) readmeContent.style.display = 'block';
    }

    // --- GitHub Integration ---
    let allRepos = [];
    let filteredRepos = [];
    let currentPage = 1;
    const itemsPerPage = 6;
    const CACHE_TTL = 3600 * 1000; // 1 hour in milliseconds

    function getCachedData(key) {
        const cached = localStorage.getItem(key);
        if (!cached) return null;
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_TTL) return null;
        return data;
    }

    function setCachedData(key, data) {
        localStorage.setItem(key, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    }

    async function fetchGitHubRepos(username) {
        const cacheKey = `repos_${username}`;
        const cached = getCachedData(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=public`);
            if (!response.ok) throw new Error('Failed to fetch repos');
            const repos = await response.json();
            const publicRepos = repos.filter(repo => !repo.private);
            setCachedData(cacheKey, publicRepos);
            return publicRepos;
        } catch (error) {
            console.error('Error fetching GitHub repos:', error);
            const oldCached = localStorage.getItem(cacheKey);
            if (oldCached) return JSON.parse(oldCached).data;
            return [];
        }
    }

    async function fetchRepoLanguages(repoName) {
        const cacheKey = `langs_${repoName}`;
        const cached = getCachedData(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(`https://api.github.com/repos/phomint/${repoName}/languages`);
            if (!response.ok) throw new Error('Failed to fetch languages');
            const languages = await response.json();
            const topLangs = Object.entries(languages)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([name]) => name);
            setCachedData(cacheKey, topLangs);
            return topLangs;
        } catch (error) {
            console.error(`Error fetching languages for ${repoName}:`, error);
            const oldCached = localStorage.getItem(cacheKey);
            if (oldCached) return JSON.parse(oldCached).data;
            return [];
        }
    }

    function formatProjectName(name) {
        // 1. Replace underscores and hyphens with spaces
        let formatted = name.replace(/[_-]/g, ' ');
        // 2. Separate CamelCase with spaces
        formatted = formatted.replace(/([a-z])([A-Z])/g, '$1 $2');
        // 3. Title Case: Capitalize first letter of each word
        return formatted.toLowerCase().split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    function createProjectCard(repo) {
        const article = document.createElement('article');
        article.className = 'project-card';

        const logoUrl = `https://raw.githubusercontent.com/phomint/${repo.name}/${repo.default_branch}/logo.png`;
        const formattedName = formatProjectName(repo.name);

        article.innerHTML = `
            <canvas class="project-points"></canvas>
            <img src="${logoUrl}" alt="${repo.name}" onerror="this.style.display='none'">
            <h3>${formattedName}</h3>
            <div class="project-languages" id="langs-${repo.name}"></div>
            ${repo.description ? `<p>${repo.description}</p>` : ''}
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-github-button" data-i18n="nav.view_github">Ver no GitHub</a>
        `;

        fetchRepoLanguages(repo.name).then(langs => {
            const langContainer = article.querySelector(`#langs-${repo.name}`);
            if (langContainer && langs.length > 0) {
                langContainer.innerHTML = langs.map(lang => `<span class="lang-tag">${lang}</span>`).join('');
            }
        });

        const currentLang = localStorage.getItem('selectedLanguage') || 'pt';
        const trans = window.translations?.[currentLang];

        const btn = article.querySelector('.project-github-button');
        if (btn && trans?.nav?.view_github) {
            btn.textContent = trans.nav.view_github;
        }

        article.style.cursor = 'pointer';
        article.addEventListener('click', (e) => {
            if (e.target.closest('.nav-button')) return;
            showProjectDetails(repo);
        });

        return article;
    }

    function renderProjectsPage(page) {
        const container = document.querySelector('.projects-container');
        const paginationContainer = document.getElementById('pagination');
        if (!container) return;

        container.innerHTML = '';

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = filteredRepos.slice(start, end);

        const currentLang = localStorage.getItem('selectedLanguage') || 'pt';
        const trans = window.translations?.[currentLang];

        if (pageItems.length === 0) {
            container.innerHTML = `<p class="loading-projects">${trans?.common?.no_projects || 'Nenhum projeto encontrado.'}</p>`;
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        pageItems.forEach(repo => {
            const card = createProjectCard(repo);
            container.appendChild(card);
            initProjectCard(card);
        });

        if (paginationContainer) {
            const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);
            if (totalPages <= 1) {
                paginationContainer.innerHTML = '';
                return;
            }
            const prevText = trans?.common?.prev || 'Anterior';
            const nextText = trans?.common?.next || 'Próxima';
            const pageOfText = trans?.common?.page_of || 'Página {current} de {total}';
            const formattedPageOf = pageOfText.replace('{current}', page).replace('{total}', totalPages);

            paginationContainer.innerHTML = `
                <button class="pagination-button" id="prev-page" ${page === 1 ? 'disabled' : ''}>${prevText}</button>
                <span class="page-info">${formattedPageOf}</span>
                <button class="pagination-button" id="next-page" ${page === totalPages ? 'disabled' : ''}>${nextText}</button>
            `;

            document.getElementById('prev-page').addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderProjectsPage(currentPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });

            document.getElementById('next-page').addEventListener('click', () => {
                const totalPages = Math.ceil(allRepos.length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    renderProjectsPage(currentPage);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }

    async function syncProjects() {
        const container = document.querySelector('.projects-container');
        if (!container) return;

        const searchInput = document.getElementById('project-search');

        const username = 'phomint';
        allRepos = await fetchGitHubRepos(username);
        filteredRepos = allRepos;

        if (allRepos.length > 0) {
            renderProjectsPage(currentPage);
        } else {
            container.innerHTML = '<p class="loading-projects">Não foi possível carregar os projetos no momento.</p>';
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                filteredRepos = allRepos.filter(repo => {
                    const nameMatch = repo.name.toLowerCase().includes(query);
                    const descMatch = (repo.description || '').toLowerCase().includes(query);
                    return nameMatch || descMatch;
                });
                currentPage = 1;
                renderProjectsPage(currentPage);
            });
        }
    }

    document.addEventListener('languageChanged', () => {
        renderProjectsPage(currentPage);
    });

    syncProjects();
}
