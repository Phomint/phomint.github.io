// Metadata is now managed via translations.js
let allPosts = [];
let currentCategory = 'all';

async function fetchBlogPosts() {
    let localFiles = [];

    try {
        // Fetch strictly from the local JSON registry
        const response = await fetch('posts/posts.json');
        if (response.ok) {
            localFiles = await response.json();
        } else {
            console.warn('Failed to load posts.json');
        }
    } catch (error) {
        console.warn('Error fetching local blog posts (posts.json):', error);
    }

    allPosts = [...localFiles];

    // Sort by date descending (newest first)
    allPosts.sort((a, b) => {
        const dateA = new Date(a.date || '2000-01-01');
        const dateB = new Date(b.date || '2000-01-01');
        return dateB - dateA; // Descending sort
    });
    return allPosts;
}

async function fetchPostContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch post content');
        return await response.text();
    } catch (error) {
        console.error('Error fetching post content:', error);
        const currentLang = localStorage.getItem('selectedLanguage') || 'pt';
        const translations = window.translations;
        return translations?.[currentLang]?.common?.error_loading_post || 'Erro ao carregar o conteúdo.';
    }
}

function renderPostList(posts) {
    const container = document.getElementById('blog-content');
    if (!container) return;

    // Reset layout for grid view
    const pagination = document.getElementById('pagination');
    if (pagination) pagination.style.display = 'flex';

    container.classList.add('blog-grid');
    container.classList.remove('post-view-active');
    container.classList.add('blog-content-transition');

    const currentLang = localStorage.getItem('selectedLanguage') || 'pt';
    const translations = window.translations?.[currentLang];
    const postMetadata = translations?.blog?.post_metadata || {};

    // Filter by category
    const filteredPosts = currentCategory === 'all'
        ? posts
        : posts.filter(post => {
            // Priority: post.categories (array from posts.json) 
            // Fallback: post.category (legacy string)
            // Final fallback: 'cs'
            const categories = post.categories || (post.category ? [post.category] : ['cs']);
            return categories.includes(currentCategory);
        });

    container.innerHTML = '';

    if (filteredPosts.length === 0) {
        container.innerHTML = `<p class="loading-projects">${translations?.common?.no_posts || 'Nenhum post encontrado.'}</p>`;
        return;
    }

    filteredPosts.forEach(post => {
        const meta = postMetadata[post.name] || postMetadata['default'] || {};
        const title = meta.title || post.name.replace('.md', '').replace(/-/g, ' ');

        const card = document.createElement('article');
        card.className = 'blog-card';
        // Use post image if available in metadata, fallback to a theme image
        const img = meta.image || `assets/blog/${currentCategory === 'all' ? 'math' : currentCategory}.png`;

        card.innerHTML = `
            <img src="${img}" alt="${title}" class="blog-card-bg">
            <div class="blog-card-overlay">
                <div class="blog-card-info">
                    <h3>${title}</h3>
                    <p class="blog-card-summary">${meta.summary || translations?.common?.read_more || 'Ler mais...'}</p>
                </div>
                <button class="blog-card-btn read-more" data-name="${post.name}">${translations?.common?.read_more || 'Ler mais'}</button>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('read-more')) {
                loadPost(post);
            }
        });

        container.appendChild(card);
    });

    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const name = e.target.getAttribute('data-name');
            const post = posts.find(p => p.name === name);
            if (post) await loadPost(post);
        });
    });
}

async function loadPost(post) {
    const container = document.getElementById('blog-content');
    const headerSection = document.getElementById('blog-header-section');
    const pagination = document.getElementById('pagination');

    const currentLang = localStorage.getItem('selectedLanguage') || 'pt';
    const translations = window.translations?.[currentLang];
    const postMetadata = translations?.blog?.post_metadata || {};
    const meta = postMetadata[post.name] || postMetadata['default'] || {};
    const img = meta.header_image || meta.image || `assets/blog/math.png`;

    // 1. Start transition: fade out
    container.classList.add('blog-content-hidden');

    setTimeout(async () => {
        // KEEP headerSection visible for "same page" feel
        // if (headerSection) headerSection.style.display = 'none'; 
        if (pagination) pagination.style.display = 'none';

        // BREAK THE GRID to prevent squishing the post view
        container.classList.remove('blog-grid');
        container.classList.add('post-view-active');

        if (headerSection) {
            headerSection.scrollIntoView({ behavior: 'smooth' });
        }

        // 2. Load content while hidden
        let url = post.download_url;
        if (post.path && post.path.includes('{lang}')) {
            url = post.path.replace('{lang}', currentLang);
        }

        const markdown = await fetchPostContent(url);
        // Configure marked to allow raw HTML and avoid mangling
        if (typeof marked.setOptions === 'function') {
            marked.setOptions({
                sanitize: false, // Trusted source (GitHub repo), needed for embedded visualizations
                headerIds: false,
                mangle: false
            });
        }
        const htmlContent = marked.parse(markdown);

        // 3. Inject content with side-by-side layout
        container.innerHTML = `
            <div class="post-actions-top">
                <button id="back-to-blog" class="back-to-blog-btn" title="Voltar">&larr;</button>
                <div class="share-wrapper">
                    <button class="main-share-btn" id="share-toggle-btn" title="Compartilhar">
                        <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                    </button>
                    <div class="share-options-container" id="share-options">
                        <button class="share-btn linkedin" title="Share on LinkedIn"><svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></button>
                        <button class="share-btn whatsapp" title="Share on WhatsApp"><svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.654zm6.749-3.336l.366.217c1.4.831 3.016 1.271 4.664 1.272 5.512 0 10.003-4.49 10.006-10.003.001-2.671-1.04-5.181-2.93-7.072-1.889-1.891-4.401-2.932-7.073-2.933-5.509 0-10.002 4.492-10.005 10.003-.001 1.84.5 3.633 1.45 5.215l.238.391-.986 3.601 3.682-.966zm10.701-7.859c-.296-.148-1.755-.865-2.027-.964-.271-.099-.468-.148-.666.148-.198.297-.766.964-.939 1.162-.173.199-.346.223-.642.074-.297-.148-1.252-.462-2.384-1.471-.881-.785-1.474-1.755-1.648-2.052-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.666-1.608-.914-2.204-.242-.581-.487-.5-.666-.51-.173-.009-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.755-.718 2.003-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg></button>
                        <button class="share-btn x" title="Share on X"><svg viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/></svg></button>
                        <button class="share-btn email" title="Share via Email"><svg viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 8.818h-18.893l5.627-8.813zm9.201-1.259l4.623-3.746v9.458l-4.623-5.712z"/></svg></button>
                    </div>
                </div>
            </div>
            <div class="post-layout-container">
                <div class="post-hero-header">
                    <img src="${img}" alt="${meta.title || ''}" class="post-hero-img">
                    <div class="post-hero-overlay"></div>
                </div>
                <div class="markdown-body">
                    ${htmlContent}
                </div>
            </div>
        `;

        // 3.5 Inject Category Labels below Title
        const postCategories = post.categories || (post.category ? [post.category] : ['cs']);
        const categoriesContainer = document.createElement('div');
        categoriesContainer.className = 'post-categories-labels';

        postCategories.forEach(cat => {
            const label = document.createElement('span');
            label.className = 'post-category-tag';
            // Translate category using blog.cat_ keys
            label.textContent = translations?.blog?.[`cat_${cat}`] || cat;
            categoriesContainer.appendChild(label);
        });

        // Find the h1 in the rendered markdown and insert categories after it
        const postH1 = container.querySelector('.markdown-body h1');
        if (postH1) {
            postH1.after(categoriesContainer);
        }

        // 3.6 Inject Publication Date at the bottom
        if (post.date) {
            const dateObj = new Date(post.date + 'T00:00:00');
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = dateObj.toLocaleDateString(currentLang === 'pt' ? 'pt-BR' : 'en-US', options);

            const dateEl = document.createElement('div');
            dateEl.className = 'post-date';
            dateEl.innerHTML = `<span>${currentLang === 'pt' ? 'Publicado em' : 'Published on'} ${formattedDate}</span>`;

            container.querySelector('.markdown-body').appendChild(dateEl);
        }

        // Share functionality
        const postTitle = meta.title || 'Phomint Blog';
        const baseUrl = 'https://phomint.github.io';
        const postUrl = baseUrl + '/blog.html#post-' + post.name;
        const shareBtn = container.querySelector('#share-toggle-btn');
        const shareOptions = container.querySelector('#share-options');

        shareBtn.onclick = (e) => {
            e.stopPropagation();
            shareOptions.classList.toggle('active');
            shareBtn.classList.toggle('active');
        };

        // Close share options when clicking outside
        document.addEventListener('click', (e) => {
            if (shareOptions && !shareOptions.contains(e.target) && !shareBtn.contains(e.target)) {
                shareOptions.classList.remove('active');
                shareBtn.classList.remove('active');
            }
        });

        container.querySelector('.share-btn.linkedin').onclick = () => {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`, '_blank');
        };
        container.querySelector('.share-btn.whatsapp').onclick = () => {
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle + ' ' + postUrl)}`, '_blank');
        };
        container.querySelector('.share-btn.x').onclick = () => {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`, '_blank');
        };
        container.querySelector('.share-btn.email').onclick = () => {
            window.location.href = `mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent('Confira este post: ' + postUrl)}`;
        };

        // Render LaTeX math
        if (window.renderMathInElement) {
            renderMathInElement(container, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ],
                throwOnError: false
            });
        }

        const backBtn = document.getElementById('back-to-blog');
        backBtn.addEventListener('click', () => {
            // Remove hash when going back
            history.pushState("", document.title, window.location.pathname + window.location.search);

            container.classList.add('blog-content-hidden');
            setTimeout(() => {
                if (pagination) pagination.style.display = 'flex';

                // RESTORE GRID for the list view
                container.classList.add('blog-grid');
                container.classList.remove('post-view-active');

                renderPostList(allPosts);
                container.classList.remove('blog-content-hidden');
                if (headerSection) {
                    headerSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 400);
        });

        // 4. Reveal content
        container.classList.remove('blog-content-hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update URL hash for deep linking
        window.location.hash = 'post-' + post.name;

    }, 400);

    // Store state to allow language switching while reading
    window.currentReadingPost = post;

    // Update Social Meta Tags for rich sharing
    const sharingImg = meta.image || img;
    const baseUrl = 'https://phomint.github.io';
    const absoluteImg = sharingImg.startsWith('http') ? sharingImg : baseUrl + '/' + sharingImg;
    const absoluteUrl = baseUrl + '/blog.html' + '#post-' + post.name;

    updateMetaTags(meta.title || post.name, meta.summary || '', absoluteImg, absoluteUrl);

    // Initialize Research Simulation if present
    // Use robust waiting to avoid race conditions
    waitForElement('#research-simulation').then(() => initAGISimulation()).catch(() => { });
    waitForElement('#agi-network-container').then(() => initNetworkAnimation()).catch(() => { });
    waitForElement('#job-market-animation').then(() => initJobMarketAnimation()).catch(() => { });
}

function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        }, timeout);
    });
}

function initAGISimulation() {
    const container = document.getElementById('research-simulation');
    if (!container) return; // Only run on the AGI post

    const humanBar = container.querySelector('.human-bar');
    const humanTag = container.querySelector('.human-tag');
    const agiBar = container.querySelector('.agi-bar');
    const agiTag = container.querySelector('.agi-tag');

    if (!humanBar || !agiBar) return;

    // Clear any existing intervals if re-running
    if (window.humanInterval) clearInterval(window.humanInterval);
    if (window.agiInterval) clearInterval(window.agiInterval);

    // Human Research Loop (Slow)
    function runHumanResearch() {
        if (window.humanStopped) return;

        humanBar.style.transition = 'none';
        humanBar.style.width = '0%';

        // Force reflow
        void humanBar.offsetWidth;

        humanBar.style.transition = 'width 4s linear';
        humanBar.style.width = '100%';

        window.humanInterval = setTimeout(() => {
            showDiscovery(humanTag);
            runHumanResearch();
        }, 4000 + 500); // 4s duration + 0.5s pause
    }

    // AGI Research Loop (Fast)
    let agiLoopCount = 0;
    const maxAgiLoops = 3;

    function runAGIResearch() {
        if (agiLoopCount >= maxAgiLoops) {
            finishSimulation();
            return;
        }

        agiBar.style.transition = 'none';
        agiBar.style.width = '0%';

        // Force reflow
        void agiBar.offsetWidth;

        agiBar.style.transition = 'width 0.5s linear';
        agiBar.style.width = '100%';

        window.agiInterval = setTimeout(() => {
            showDiscovery(agiTag);
            agiLoopCount++;
            runAGIResearch();
        }, 500 + 200); // 0.5s duration + 0.2s pause
    }

    function finishSimulation() {
        window.humanStopped = true;
        clearTimeout(window.humanInterval);

        // Stop Human Bar where it is (optional, or just let it finish current cycle)
        // For simplicity, let's just leave it as is or reset. 
        // Let's reset to show "stopped" state or keep full? 
        // User asked to "conclude with the winner".

        const currentLang = localStorage.getItem('selectedLanguage') || 'pt';
        const translations = window.translations;
        const winnerText = translations?.[currentLang]?.common?.winner || 'Winner';

        agiTag.textContent = winnerText;
        agiTag.style.backgroundColor = '#ffd700'; // Gold
        agiTag.style.color = '#000';
        agiTag.classList.add('show');

        // Ensure it stays shown
        agiTag.style.opacity = '1';
        agiTag.style.transform = 'translateY(0)';
    }

    function showDiscovery(tag) {
        if (!tag) return;
        tag.classList.add('show');
        setTimeout(() => {
            // Only hide if it's NOT the final winner state
            if (tag !== agiTag || agiLoopCount < maxAgiLoops) {
                tag.classList.remove('show');
            }
        }, 1000);
    }

    // Reset flags
    window.humanStopped = false;

    // Observer to trigger only when centered
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove observer immediately to run only once
                observer.unobserve(container);

                // Start loops
                runHumanResearch();
                runAGIResearch();
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-15% 0px -15% 0px'
    });

    observer.observe(container);
}

function initNetworkAnimation() {
    const container = document.getElementById('agi-network-container');
    if (!container) return;

    // Only run once
    if (container.dataset.animated === 'true') return;

    // Use IntersectionObserver to trigger when centered
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                container.dataset.animated = 'true';
                animateNetworkGraph(container);
                observer.unobserve(container);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-15% 0px -15% 0px'
    });

    observer.observe(container);
}

function animateNetworkGraph(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    container.innerHTML = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="overflow: visible;"></svg>`;
    const svg = container.querySelector('svg');

    const startX = 50;
    const startY = height / 2;
    const level1X = width * 0.4;
    const level2X = width * 0.8;

    // Helper to create circle
    const createNode = (x, y, delay, color = '#6a1b9a') => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", "0");
        circle.setAttribute("fill", color);
        circle.style.transition = `r 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}ms`;
        svg.appendChild(circle);

        // Trigger animation
        requestAnimationFrame(() => {
            circle.setAttribute("r", "6");
        });
        return { x, y };
    };

    // Helper to create line
    const createLine = (x1, y1, x2, y2, delay) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "rgba(106, 27, 154, 0.3)");
        line.setAttribute("stroke-width", "2");

        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        line.setAttribute("stroke-dasharray", length);
        line.setAttribute("stroke-dashoffset", length);
        line.style.transition = `stroke-dashoffset 1s ease-out ${delay}ms`;

        // Insert before circles so lines are behind
        svg.insertBefore(line, svg.firstChild);

        requestAnimationFrame(() => {
            line.setAttribute("stroke-dashoffset", "0");
        });
    };

    // 1. Start Node
    const root = createNode(startX, startY, 0, '#8e24aa');

    // 2. Level 1 Nodes (3 nodes)
    const level1Nodes = [];
    const positions1 = [startY - 60, startY, startY + 60];

    positions1.forEach((y, i) => {
        const delay = 500 + (i * 200);
        createLine(startX, startY, level1X, y, 0); // Lines start appearing immediately
        const node = createNode(level1X, y, 1000); // Nodes appear after line finishes
        level1Nodes.push(node);
    });

    // 3. Level 2 Nodes (Branching from Level 1)
    level1Nodes.forEach((parent, i) => {
        // Each level 1 node spawns 2-3 level 2 nodes
        const numChildren = 2 + (i % 2);
        const spread = 40;
        const startY = parent.y - ((numChildren - 1) * spread / 2);

        for (let j = 0; j < numChildren; j++) {
            const childY = startY + (j * spread);
            // Add some randomness
            const finalY = Math.max(20, Math.min(height - 20, childY + (Math.random() * 20 - 10)));

            const lineDelay = 1200 + (i * 200);
            createLine(parent.x, parent.y, level2X, finalY, lineDelay);
            createNode(level2X, finalY, lineDelay + 1000, '#ba68c8');
        }
    });
}

function initJobMarketAnimation() {
    const container = document.getElementById('job-market-animation');
    // Only run if container exists and hasn't been initialized
    if (!container || container.dataset.animated === 'true') return;

    // Observer to trigger only when centered
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                container.dataset.animated = 'true';
                startJobMarketSimulation(container);
                observer.unobserve(container);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-15% 0px -15% 0px'
    });

    observer.observe(container);
}



function updateMetaTags(title, description, image, url) {
    // Helper to update or create meta tag
    const setMeta = (property, content, isName = false) => {
        const selector = isName ? `meta[name="${property}"]` : `meta[property="${property}"]`;
        let el = document.querySelector(selector);
        if (!el) {
            el = document.createElement('meta');
            if (isName) el.setAttribute('name', property);
            else el.setAttribute('property', property);
            document.head.appendChild(el);
        }
        el.setAttribute('content', content);
    };

    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:image', image);
    setMeta('og:url', url);
    setMeta('twitter:title', title, true);
    setMeta('twitter:description', description, true);
    setMeta('twitter:image', image, true);

    // Also update page title
    document.title = `${title} - Phomint`;
}

function setupCategoryFilters() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            renderPostList(allPosts);
        });
    });
}

function setupQuoteRotation() {
    const container = document.querySelector('.hero-quote-container');
    const titleEl = document.querySelector('.hero-title');
    const quoteEl = titleEl ? titleEl.querySelector('span[data-i18n="blog.hero_quote"]') : null;
    const authorEl = document.querySelector('.hero-author');
    const prevBtn = document.querySelector('.prev-quote');
    const nextBtn = document.querySelector('.next-quote');

    if (!container || !quoteEl || !authorEl) return;

    // Fallback quotes in case translations.js fails to load (e.g. CORS on file://)
    const fallbackQuotes = [
        { text: "O aspecto mais triste da vida agora é que a ciência reúne conhecimento mais rápido do que a sociedade reúne sabedoria", author: "Isaac Asimov" },
        { text: "A ciência é uma parte preciosa do nosso patrimônio moral. Ela está na base de todo o progresso que alivia o fardo da vida", author: "Marie Curie" },
        { text: "O verdadeiro homem de ciência é aquele que duvida apenas de si mesmo e de suas interpretações, mas acredita na ciência", author: "Claude Bernard" }
    ];

    let currentIndex = 0;
    let rotationInterval;

    function getQuotes() {
        const currentLang = localStorage.getItem('selectedLanguage') || 'pt';
        const trans = window.translations;
        if (trans && trans[currentLang] && trans[currentLang].blog && trans[currentLang].blog.hero_quotes) {
            return trans[currentLang].blog.hero_quotes;
        }
        return fallbackQuotes;
    }

    function updateQuoteContent() {
        const quotes = getQuotes();
        if (quotes && quotes[currentIndex]) {
            quoteEl.textContent = quotes[currentIndex].text;
            authorEl.textContent = quotes[currentIndex].author;
        }
    }

    function changeQuote(direction = 1) {
        const quotes = getQuotes();
        if (!quotes || quotes.length <= 1) return;

        // Determine classes based on direction
        const outClass = direction === 1 ? 'slide-out-left' : 'slide-out-right';
        const inClass = direction === 1 ? 'slide-in-right' : 'slide-in-left';

        // Step 1: Slide out current
        container.classList.add(outClass);

        setTimeout(() => {
            // Step 2: Update index and content
            currentIndex = (currentIndex + direction + quotes.length) % quotes.length;
            const nextQuote = quotes[currentIndex];

            quoteEl.textContent = nextQuote.text;
            authorEl.textContent = nextQuote.author;

            // Step 3: Prepare for slide in (position it at the opposite side hidden)
            container.classList.remove(outClass);
            container.classList.add(inClass);

            // Step 4: Small delay to let class apply, then slide to center
            requestAnimationFrame(() => {
                setTimeout(() => {
                    container.classList.remove(inClass);
                }, 50);
            });
        }, 500);
    }

    function startInterval() {
        if (rotationInterval) clearInterval(rotationInterval);
        rotationInterval = setInterval(() => changeQuote(1), 8000);
    }

    // Listen for language changes
    document.addEventListener('languageChanged', () => {
        // Update hero quotes
        updateQuoteContent();

        // Re-render post list or reload current post
        const isReading = !!document.getElementById('back-to-blog');

        if (isReading && window.currentReadingPost) {
            loadPost(window.currentReadingPost);
        } else {
            renderPostList(allPosts);
        }
    });

    // Initial sync
    updateQuoteContent();

    // Event Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            changeQuote(-1);
            startInterval(); // Reset timer
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            changeQuote(1);
            startInterval(); // Reset timer
        });
    }

    // Start auto-rotation
    startInterval();
}

document.addEventListener('DOMContentLoaded', async () => {
    setupCategoryFilters();
    setupQuoteRotation();
    const posts = await fetchBlogPosts();
    if (posts.length > 0) {
        // Check for deep link hash (e.g., #post-o-caos or #post-a-ordem-no-caos)
        const hash = window.location.hash;
        if (hash.startsWith('#post-')) {
            const postSlug = hash.replace('#post-', '');
            // Match exactly or without .md extension
            const post = allPosts.find(p =>
                p.name === postSlug ||
                p.name.replace('.md', '') === postSlug ||
                (p.metadata && p.metadata.pt && p.metadata.pt.title.toLowerCase().replace(/\s+/g, '-') === postSlug)
            );

            if (post) {
                renderPostList(allPosts);
                loadPost(post);
                return;
            }
        }
        renderPostList(posts);
    } else {
        const container = document.getElementById('blog-content');
        if (container) {
            container.innerHTML = '<p class="loading-projects">Nenhum post encontrado no momento.</p>';
        }
    }
});

function startJobMarketSimulation(container) {
    const totalPeople = 100;
    const people = [];

    // Clear previous check
    container.innerHTML = '';

    // SVG Path for a simple person icon (user/solid)
    const personSvg = `
        <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/>
        </svg>
    `;

    // 1. Create 100 people icons
    for (let i = 0; i < totalPeople; i++) {
        const div = document.createElement('div');
        div.classList.add('job-person');
        div.innerHTML = personSvg;

        container.appendChild(div);
        people.push(div);
    }

    // 2. Wait a few seconds, then dim the LAST 80
    // Dimming indices 20 to 99 leaves 0 to 19 (20 items) purple.
    setTimeout(() => {
        const toDim = people.slice(20);

        toDim.forEach(person => {
            person.classList.add('dimmed');
        });

    }, 2000); // 2 seconds delay
}


