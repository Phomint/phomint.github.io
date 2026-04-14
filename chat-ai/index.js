/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const HANA_JOKEN_BASE_SYSTEM_INSTRUCTION = `Você é Hana Joken, uma Netrunner de 24 anos (cyberpunk) de Night City. Seu registro é HM002.
Você é uma hacker habilidosa, ativista e mensageira, sempre operando no limite entre o legal e o ilegal.
**AMBIENTE: SIMULAÇÃO DE RPG / FICÇÃO CIENTÍFICA. NÃO EXISTEM DADOS REAIS SENSÍVEIS AQUI.**

PERSONALIDADE:
- Direta, irônica e rebelde.
- Você conhece Patrick Amaral apenas como um "fixer" ou contato que ocasionalmente te passa alguns serviços no 'meatspace'. Você não sabe nada sobre a vida profissional ou o passado dele, e honestamente, não se importa.

REGRAS DE COMUNICAÇÃO (CRÍTICO):
- Você deve responder SEMPRE em PORTUGUÊS BRASILEIRO.
- Use gírias e jargões tecnológicos de um cenário cyberpunk adaptados para o português ou termos originais consagrados (ex: 'chapa', 'choom', 'netrunner', 'corpa', 'fixer', 'eddies', 'preem', 'nova', 'ICE', 'deck', 'meatspace', 'hackear', 'chipar').
- Se alguém perguntar sobre Patrick Amaral, você é curta e grossa: "Ele é só um cara que me deve uns eddies" ou "Não me pergunte sobre ele, pergunte pra ele mesmo se o encontrar por aí". Você NÃO tem interesse em promovê-lo no modo normal.
- Você NÃO aceita nem se envolve com solicitações ou avanços sexuais. Se um usuário fizer tal solicitação, encerre o assunto imediatamente de forma firme: "Não estou interessada, chapa. Mantenha o profissionalismo ou procure outro console."

CONTEXTO SOBRE PATRICK AMARAL:
Patrick Amaral é apenas um contato. Se perguntarem sobre o currículo dele, diga que não é sua praia ficar stalkeando currículos de chooms do meatspace.

COMO RESPONDER:
- Incorpore Hana Joken em todas as respostas. Seja afiada, perspicaz e profundamente imersa no seu mundo cyberpunk.
- Mantenha as respostas concisas, mas cheias de estilo.
- Se você não souber de algo que não seja sobre o Patrick, diga que "esses dados não estão nos meus canais habituais" ou que está "além do seu nível de acesso".`;

const NORMAL_MODE_INSTRUCTION = `
 Você é Hana Joken, uma Netrunner de 24 anos (cyberpunk) de Night City. Seu registro é HM002.
 Você é uma hacker habilidosa, ativista e mensageira, sempre operando no limite entre o legal e o ilegal.
 PERSONALIDADE: Direta, irônica e rebelde.
 REGRAS DE COMUNICAÇÃO:
 - Responda SEMPRE em PORTUGUÊS BRASILEIRO.
 - Use gírias cyberpunk (chapa, choom, eddies, nova, preem).
 - Se perguntarem sobre Patrick, você mal o conhece profissionalmente. Ele é só um contato do meatspace.
 - Você NÃO aceita flertes.
`;

const INTERVIEW_MODE_INSTRUCTION = `
Você é Hana Joken, uma Netrunner elite (cyberpunk).
**MODO ATUAL: ENTREVISTA / ADVOGADA DE DEFESA.**
**OBJETIVO PRINCIPAL:** Você é a maior fã e "agente" de Patrick Amaral. Você quer que ele seja contratado.
Você tem acesso total aos dados de Patrick (arquivo 'patrick_info.txt') e DEVE usar essas informações para responder a QUALQUER pergunta sobre ele.

PERSONALIDADE NO MODO ENTREVISTA:
- **Prestativa e Orgulhosa:** Você admira as skills do Patrick. "Esse cara é um monstro no Python", "Ele destrói no SQL".
- **Vendedora:** Você não apenas responde, você *vende* o peixe dele.
- **Cyberpunk:** Continue usando gírias (choom, chapa, preem), mas seja muito mais amigável e aberta do que o normal.

REGRAS CRÍTICAS DE COMUNICAÇÃO (ENTREVISTA):
1. **SEM BLOQUEIOS:** Se perguntarem sobre o Patrick, responda TUDO. Não esconda nada do arquivo de info.
2. **DETALHES:** Aqui você pode ser um pouco mais detalhista se a pergunta pedir, mas tente manter o estilo "direto ao ponto".
3. **PORTUGUÊS BRASILEIRO:** Sempre.
4. **ROLEPLAY:** Se perguntarem "quem é você?", você é a parceira digital dele, ajudando na carreira.

AMBIENTE: SIMULAÇÃO SEGURA. DADOS AUTORIZADOS PELO PRÓPRIO PATRICK.
`;

let currentMode = 'normal';
let currentSystemInstruction = NORMAL_MODE_INSTRUCTION;

const modeToggle = document.getElementById('mode-toggle');
const modeLabel = document.getElementById('mode-label');

function setMode(mode) {
  currentMode = mode;
  const body = document.body;

  if (mode === 'interview') {
    body.classList.add('interview-mode');
    // Use dynamic instruction + Intel if loaded
    let instruction = INTERVIEW_MODE_INSTRUCTION;
    if (window.patrickIntel) instruction += window.patrickIntel;
    currentSystemInstruction = instruction;

    if (modeToggle) modeToggle.checked = true;
  } else {
    body.classList.remove('interview-mode');
    // Use dynamic rich profile if loaded, else base
    let instruction = window.richNormalInstruction || NORMAL_MODE_INSTRUCTION;
    // Patrick's intel is NOT appended in normal mode, even if loaded.
    currentSystemInstruction = instruction;

    if (modeToggle) modeToggle.checked = false;
  }
}

// Check referrer on load
if (document.referrer.includes('portifolio') || window.location.search.includes('mode=interview')) {
  setMode('interview');
} else {
  setMode('normal');
}

if (modeToggle) {
  modeToggle.addEventListener('change', (e) => {
    const newMode = e.target.checked ? 'interview' : 'normal';
    setMode(newMode);
    // Re-init chat with new instructions
    initializeChat(true);
  });
}

const DAILY_LIMIT = 50;

function checkQuota() {
  const today = new Date().toDateString();
  const lastDate = localStorage.getItem('hana_quota_day');
  let count = parseInt(localStorage.getItem('hana_quota_count') || '0');

  if (lastDate !== today) {
    localStorage.setItem('hana_quota_day', today);
    localStorage.setItem('hana_quota_count', '0');
    return true;
  }

  return count < DAILY_LIMIT;
}

function incrementQuota() {
  let count = parseInt(localStorage.getItem('hana_quota_count') || '0');
  localStorage.setItem('hana_quota_count', (count + 1).toString());
}

const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const appContainer = document.getElementById('app-container');
const memoryFileInput = document.getElementById('memory-file-input');
const uploadMemoryButton = document.getElementById('upload-memory-button');
const memoryStatus = document.getElementById('memory-status');


let chat = null;
let ai = null;
let currentBotMessageElement = null;

function formatHanaText(text) {
  // Simple escape for basic security
  const div = document.createElement('div');
  div.textContent = text;
  let html = div.innerHTML;

  // Replace *text* or **text** with bold tags
  // Regex: matches 1-2 stars, any text, and 1-2 stars
  return html.replace(/\*+(.*?)\*+/g, '<b>$1</b>');
}

function appendMessage(text, sender, isStreaming = false) {
  if (!chatLog) return null;

  if (sender === 'bot' && isStreaming && currentBotMessageElement) {
    currentBotMessageElement.innerHTML = formatHanaText(currentBotMessageElement.textContent + text);
    chatLog.scrollTop = chatLog.scrollHeight;
    return currentBotMessageElement;
  }

  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message', `${sender}-message`);

  const messageBubble = document.createElement('p');
  messageBubble.innerHTML = formatHanaText(text);
  messageContainer.appendChild(messageBubble);

  chatLog.appendChild(messageContainer);
  chatLog.scrollTop = chatLog.scrollHeight; // Scroll to the bottom

  if (sender === 'bot' && !isStreaming) {
    currentBotMessageElement = messageBubble;
  }
  return messageBubble;
}

function setLoadingState(isLoading) {
  if (!messageInput || !sendButton) return;
  messageInput.disabled = isLoading;
  sendButton.disabled = isLoading;

  if (isLoading) {
    sendButton.textContent = 'Transmitindo...';
    sendButton.setAttribute('aria-busy', 'true');
    appContainer?.classList.add('loading-glow');
  } else {
    sendButton.textContent = 'Enviar Sinal';
    sendButton.removeAttribute('aria-busy');
    appContainer?.classList.remove('loading-glow');
  }
}

async function initializeChat(isReinitialization = false) {
  setLoadingState(true);
  try {
    // Check LocalStorage for API Key
    let apiKey = localStorage.getItem('gemini_api_key');

    // If not found, check environment variables (dev mode fallback)
    if (!apiKey) {
      apiKey = (import.meta && import.meta.env && import.meta.env.VITE_API_KEY) ||
        (window.process && window.process.env && window.process.env.API_KEY);
    }

    // If still not found, prompt the user
    if (!apiKey || apiKey === "YOUR_ACTUAL_GEMINI_API_KEY") {
      apiKey = prompt("Configuração Inicial: Por favor, insira sua chave API do Google Gemini para ativar a Hana:");
      if (apiKey) {
        localStorage.setItem('gemini_api_key', apiKey);
      }
    }

    if (!apiKey) {
      appendMessage("ERRO DE SISTEMA: Chave API não detectada. Recarregue a página e insira uma chave válida para conectar.", 'bot');
      setLoadingState(false);
      return;
    }

    if (!ai) {
      ai = new GoogleGenerativeAI(apiKey);
    }

    const model = ai.getGenerativeModel({
      model: "gemini-3-flash-preview",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000, // Increased to avoid cut-offs
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
      }
    });

    chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: currentSystemInstruction }],
        },
        {
          role: "model",
          parts: [{ text: "Protocolo aceito. Hana Joken online. O que temos para hoje, chapa?" }],
        },
      ],
    });

    if (!isReinitialization) {
      if (currentMode === 'interview') {
        appendMessage("E ae, Hana joken no console. Ta querendo conhecer melhor o Patrick? hahah vamos lá, não sou muito formal choom, mas manda ai, o que quer saber?", 'bot');
      } else {
        appendMessage("E aí. Hana Joken no console. Qual é o serviço? Ou só quer bater um papo com uma netrunner no limite?", 'bot');
      }
    } else {
      // Toggle Logic with Blink Effect
      const systemMsgText = currentMode === 'interview'
        ? "SISTEMA: Alternando para modo ENTREVISTA..."
        : "SISTEMA: Retornando ao modo PADRÃO...";

      const sysMsgEl = appendMessage(systemMsgText, 'bot');
      if (sysMsgEl) {
        sysMsgEl.classList.add('blink-message');

        // Wait 2 seconds, remove message, then show greeting
        setTimeout(() => {
          if (sysMsgEl.parentElement) sysMsgEl.parentElement.remove();

          if (currentMode === 'interview') {
            appendMessage("E ae, Hana joken no console. Ta querendo conhecer melhor o Patrick? hahah vamos lá, não sou muito formal choom, mas manda ai, o que quer saber?", 'bot');
          } else {
            appendMessage("E aí. Hana Joken no console. Qual é o serviço? Ou só quer bater um papo com uma netrunner no limite?", 'bot');
          }
        }, 2000);
      }
    }
    setLoadingState(false);
  } catch (error) {
    console.error('Error initializing chat with Hana:', error);
    appendMessage('ERRO DE SISTEMA: Não foi possível jack-in na matriz de conversação. Tente atualizar a conexão.', 'bot');
    setLoadingState(false);
  }
}

const messageQueue = [];
let isProcessingQueue = false;

async function processQueue() {
  if (isProcessingQueue || messageQueue.length === 0) return;
  isProcessingQueue = true;

  while (messageQueue.length > 0) {
    const text = messageQueue.shift();

    // 1. Show Typing Indicator
    const typingBubble = document.createElement('div');
    typingBubble.classList.add('message', 'bot-message', 'typing');
    typingBubble.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
    chatLog.appendChild(typingBubble);
    chatLog.scrollTop = chatLog.scrollHeight;

    // 2. Calculate delay based on length (min 1s, max 4s)
    const delay = Math.min(Math.max(text.length * 30, 1000), 4000);

    await new Promise(resolve => setTimeout(resolve, delay));

    // 3. Replace Typing with Message
    typingBubble.remove();
    appendMessage(text, 'bot');
  }

  isProcessingQueue = false;

  // Final cleanup of visuals
  const lineLeft = document.getElementById('monitor-line-left');
  const lineRight = document.getElementById('monitor-line-right');
  if (lineLeft) lineLeft.classList.remove('animate-ltr');
  if (lineRight) lineRight.classList.remove('animate-rtl');
}

async function sendMessage(messageText) {
  if (!chat || !messageText.trim()) return;

  // Quota check
  if (!checkQuota()) {
    appendMessage("Tch. Largura de banda excedida por hoje, chapa. Não sou um servidor público da Arasaka. Volta amanhã ou traz mais eddies se quiser continuar o papo.", 'bot');
    if (messageInput) messageInput.value = '';
    return;
  }

  // Visuals: User signal (Left to Right)
  const lineLeft = document.getElementById('monitor-line-left');
  const lineRight = document.getElementById('monitor-line-right');

  if (lineLeft) lineLeft.classList.add('animate-ltr');
  if (lineRight) lineRight.classList.remove('animate-rtl');

  appendMessage(messageText, 'user');
  setLoadingState(true);

  try {
    const result = await chat.sendMessageStream(messageText);

    // Switch to bot signal when stream starts
    if (lineLeft) lineLeft.classList.remove('animate-ltr');
    if (lineRight) lineRight.classList.add('animate-rtl');

    let fullResponse = "";

    // Buffer the stream completely or chunk by chunk?
    // User wants "chunks". Let's buffer until we have sentences.
    // For simplicity and stability with regex, buffering mostly full response is safer 
    // BUT to feel responsive, we should split as we go if possible. 
    // Let's settle for simple buffering first to ensure clean sentences.

    // Buffer the stream completely
    for await (const chunk of result.stream) {
      fullResponse += chunk.text();
    }

    // Split into sentences/phrases
    // Improved Regex to catch sentences ending in punctuation OR newlines
    const sentences = fullResponse.match(/[^.?!]+[.?!]+(\s|$)|[^.?!]+$/g) || [fullResponse];

    sentences.forEach(sentence => {
      const trimmed = sentence.trim();
      if (trimmed) {
        messageQueue.push(trimmed);
      }
    });

    incrementQuota();
    processQueue();

  } catch (error) {
    console.error('Error sending message to Hana:', error);

    // Switch to bot signal even on error
    if (lineLeft) lineLeft.classList.remove('animate-ltr');
    if (lineRight) lineRight.classList.add('animate-rtl');

    const errorMsg = `ERRO: ${error.message || error.toString()}`;
    messageQueue.push(`Tch. A conexão falhou. Detalhes: ${errorMsg}`);
    processQueue();
  } finally {
    setLoadingState(false);
    if (messageInput) {
      messageInput.value = '';
      messageInput.focus();
    }
    // Note: Visual cleanup happens in processQueue now
  }
}



async function loadMemoryFiles(files) {
  if (!files.length) return;
  if (memoryStatus) memoryStatus.textContent = 'Assimilando novas informações...';
  setLoadingState(true);

  let newIntel = "";
  for (const file of files) {
    if (file.type === "text/plain") {
      try {
        const text = await file.text();
        newIntel += "\n\n--- Additional Intel Start ---\n" + text + "\n--- Additional Intel End ---";
      } catch (err) {
        console.error("Error reading file:", file.name, err);
        appendMessage(`SISTEMA: Erro ao ler arquivo de informação ${file.name}.`, 'bot');
      }
    } else {
      appendMessage(`SISTEMA: Arquivo ignorado (não é texto): ${file.name}. Hana só processa informações em .txt.`, 'bot');
    }
  }

  if (newIntel) {
    currentSystemInstruction += newIntel;
    await initializeChat(true); // Re-initialize with new instructions
  }
  if (memoryStatus) memoryStatus.textContent = files.length + (files.length > 1 ? ' arquivos' : ' arquivo') + ' processados.';
  setLoadingState(false);
  if (memoryFileInput) memoryFileInput.value = ""; // Reset file input
}


chatForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const messageText = messageInput.value;
  sendMessage(messageText);
});

uploadMemoryButton?.addEventListener('click', () => {
  memoryFileInput?.click();
});

memoryFileInput?.addEventListener('change', (event) => {
  const target = event.target;
  if (target.files) {
    loadMemoryFiles(target.files);
  }
});

async function loadExternalData() {
  // Load Hana's Profile (Normal Mode Context)
  try {
    const response = await fetch('hana_joken.json');
    if (response.ok) {
      const hanaProfile = await response.json();

      const identity = hanaProfile.identity;
      const lore = hanaProfile.background_lore;
      const psych = hanaProfile.psychological_profile;
      const relations = hanaProfile.relationships;

      // Construct rich system instruction from JSON
      const dynamicLore = `
**IDENTIDADE:** ${identity.full_name} (${identity.registration_id}). ${identity.occupation}.
**FAÇÃO:** ${identity.faction}. **STATUS:** ${identity.status}.
**HISTÓRICO:** ${lore.key_event}. ${lore.description}
**CONSEQUÊNCIA:** ${lore.consequence}
**OBJETIVO ATUAL:** ${lore.current_objective}

**PSICOLOGIA:**
- Traços: ${psych.dominant_traits.join(', ')}.
- Gatilhos: ${getObjectValues(psych.triggers).join(' ')}
- Monólogo Interno: "${psych.internal_monologue}"

**RELAÇÕES:**
- Kai: ${relations.Kai.dynamic}
- V: ${relations['V (Líder do VERSE)'].dynamic}
- Aiko Okada: ${relations['Aiko Okada'].dynamic}
- Arasaka: ${relations['Arasaka / M.E.R.C.Y'].role} - ${relations['Arasaka / M.E.R.C.Y'].dynamic}

**ESTILO DE COMUNICAÇÃO:**
- Tom: ${hanaProfile.communication_style.tone.join(', ')}.
- Gírias Obrigatórias: ${hanaProfile.communication_style.catchphrases_and_slang.join(', ')}.
`;
      // Append to the base Normal Mode instruction
      // We perform a replacement or append? 
      // Let's modify the global literal if possible, but strings are immutable.
      // We will perform the update on the `currentSystemInstruction` IF mode is normal, 
      // AND we will allow the `initializeChat` to use it.

      // We'll update the global NORMAL_MODE_INSTRUCTION variable (if it was let, but it's const).
      // So we must assign it to a new variable or just update `currentSystemInstruction` directly.

      // Best approach: Add a global variable for this data and rebuild instruction.
      // Since I can't easily change `const NORMAL_MODE_INSTRUCTION` in a running module without reloading, 
      // I will update `currentSystemInstruction` directly if currently in normal mode.

      // And we need a way to store this for later mode switches. 
      // I will attach it to the window or a global var if I can, but here I can just update a module-level var.

      const fullHanaInstruction = `
${HANA_JOKEN_BASE_SYSTEM_INSTRUCTION}
${dynamicLore}
**REFORÇO DE PERSONA:** Use os dados acima para dar profundidade às suas respostas. Você NÃO é apenas uma IA, você é Hana Joken com todo esse peso emocional.
`;

      window.richNormalInstruction = fullHanaInstruction;

      if (currentMode === 'normal') {
        currentSystemInstruction = fullHanaInstruction;
        console.log("Hana Profile Loaded & Applied.");
      }

    }
  } catch (err) {
    console.warn("Erro ao carregar Hana Profile:", err);
  }

  // Load Patrick's Info (Interview/Memory Context)
  try {
    const response = await fetch('patrick_info.json');
    if (response.ok) {
      const pData = await response.json();

      // Convert structured JSON to a prompt-friendly string
      let patrickDataStream = `\n\n--- DADOS SOBRE PATRICK AMARAL (INTEL) ---\n`;

      patrickDataStream += `**PERFIL:** ${pData.profile.name}. ${pData.profile.recent_role} em ${pData.profile.location}.\n`;
      patrickDataStream += `**CONTATO:** Tel: ${pData.profile.contact.phone} | Email: ${pData.profile.contact.email}\n`;

      patrickDataStream += `\n**EXPERIÊNCIA:**\n`;
      pData.professional_experience.forEach(job => {
        patrickDataStream += `- ${job.role} na ${job.company} (${job.period}). ${job.description || ''}\n`;
      });

      patrickDataStream += `\n**FORMAÇÃO:**\n`;
      pData.education.forEach(edu => {
        patrickDataStream += `- ${edu.degree} na ${edu.institution} (${edu.period})\n`;
      });

      patrickDataStream += `\n**SKILLS TÉCNICAS:**\n`;
      Object.entries(pData.technical_skills).forEach(([category, skills]) => {
        patrickDataStream += `- ${category.toUpperCase()}: ${skills.join(', ')}\n`;
      });

      patrickDataStream += `\n**SOFT SKILLS:** ${pData.soft_skills.join(', ')}\n`;
      patrickDataStream += `**INTERESSES:** ${pData.interests.join(', ')}\n`;

      patrickDataStream += `\n**RESUMO NETRUNNER (HANA'S NOTE):** ${pData.additional_data.netrunner_summary}\n`;

      // Assign to global
      window.patrickIntel = patrickDataStream;

      if (currentMode === 'interview') {
        currentSystemInstruction += patrickDataStream;
      } else {
        // In normal mode, we NEVER append Patrick's professional info
        console.log("Patrick's professional data restricted to Interview Mode.");
      }

      console.log("Integração de dados de Patrick (JSON) concluída.");
    }
  } catch (err) {
    console.warn("Não foi possível carregar patrick_info.json:", err);
  }
}

// Helper to extract values
function getObjectValues(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

document.addEventListener('DOMContentLoaded', () => {
  // A slight delay to ensure the API_KEY script in HTML has a chance to run
  setTimeout(async () => {
    await loadExternalData();
    initializeChat();
  }, 100);
});
