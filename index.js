document.addEventListener('DOMContentLoaded', () => {
    const CHAT_STORAGE_KEY = 'verba_chat_sessions';
    const CURRENT_CHAT_KEY = 'verba_current_chat_id';
    const LEGACY_HISTORY_KEY = 'verba_chat_history';
    const THEME_STORAGE_KEY = 'verba_theme';

    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const messagesContainer = document.getElementById('messages-container');
    const historyList = document.getElementById('history-list');
    const newChatBtn = document.getElementById('new-chat-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const clearBtn = document.getElementById('clear-btn');

    const deleteModal = document.getElementById('delete-modal');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const deleteModalText = document.getElementById('delete-modal-text');

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('app-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    let chatToDeleteIndex = null;
    let chatSessions = loadChatSessions();
    let currentChatId = localStorage.getItem(CURRENT_CHAT_KEY);

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('theme-dark', isDark);
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
            themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        }
        localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    }

    function initializeTheme() {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme === 'dark' || storedTheme === 'light') {
            applyTheme(storedTheme);
            return;
        }

        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function uid(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    }

    function formatClock(timestamp) {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function formatRelativeTime(timestamp) {
        const diffMs = Date.now() - timestamp;
        const diffMin = Math.max(0, Math.floor(diffMs / 60000));
        if (diffMin < 1) return 'just now';
        if (diffMin < 60) return `${diffMin}m ago`;
        const diffHr = Math.floor(diffMin / 60);
        if (diffHr < 24) return `${diffHr}h ago`;
        const diffDay = Math.floor(diffHr / 24);
        if (diffDay < 7) return `${diffDay}d ago`;
        return new Date(timestamp).toLocaleDateString();
    }

    function responseToPlainText(content) {
        const temp = document.createElement('div');
        let normalized = content
            .replace(/<pre><code class="vrb-code">([\s\S]*?)<\/code><\/pre>/g, (_, code) => `\n\n${code}\n\n`)
            .replace(/####\s+(.*?)(\n|$)/g, '\n$1\n')
            .replace(/###\s+(.*?)(\n|$)/g, '\n$1\n')
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/`(.*?)`/g, '$1')
            .replace(/<div class="followup-box">[\s\S]*?<\/div>\s*$/g, '');

        temp.innerHTML = normalized;
        return temp.textContent
            .replace(/\n{3,}/g, '\n\n')
            .replace(/[ \t]+\n/g, '\n')
            .trim();
    }

    function createWelcomeMarkup() {
        return `
            <div class="welcome-view">
                <div class="welcome-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="6" fill="#2563EB"/>
                        <path d="M7 17L12 7L17 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h1 class="welcome-title">How can I assist you today?</h1>
                <p class="welcome-subtitle">Ask me anything about Verba API, architecture, packages, or the language itself.</p>
                
                <div class="suggestions-grid">
                    <button class="suggestion-card">
                        <div class="suggestion-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h14a2 2 0 002-2V7.5L14.5 2H6a2 2 0 00-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/></svg></div>
                        <div class="suggestion-text">
                            <h4>Explain OOP classes</h4>
                            <p>Learn about inheritance and object creation in Verba</p>
                        </div>
                    </button>
                    <button class="suggestion-card">
                        <div class="suggestion-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg></div>
                        <div class="suggestion-text">
                            <h4>Async and Await</h4>
                            <p>Understand background tasks and awaiting results</p>
                        </div>
                    </button>
                    <button class="suggestion-card">
                        <div class="suggestion-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></div>
                        <div class="suggestion-text">
                            <h4>math_plus package</h4>
                            <p>See community package functions and usage</p>
                        </div>
                    </button>
                    <button class="suggestion-card">
                        <div class="suggestion-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
                        <div class="suggestion-text">
                            <h4>Standard Library</h4>
                            <p>Browse built-in modules and functions</p>
                        </div>
                    </button>
                </div>
            </div>
        `;
    }

    function attachSuggestionListeners() {
        document.querySelectorAll('.suggestion-card').forEach((card) => {
            card.addEventListener('click', () => {
                userInput.value = card.querySelector('h4').textContent;
                handleInput();
                handleChatSubmit();
            });
        });
    }

    function buildLegacySessions() {
        const legacy = JSON.parse(localStorage.getItem(LEGACY_HISTORY_KEY) || '[]');
        if (!Array.isArray(legacy) || legacy.length === 0) return [];

        return legacy.slice(0, 20).map((query) => {
            const now = Date.now();
            const response = typeof findBestMatch === 'function' && typeof formatResponse === 'function'
                ? formatResponse(findBestMatch(query), query)
                : 'Knowledge Base is currently loading or offline.';

            return {
                id: uid('chat'),
                title: query,
                createdAt: now,
                updatedAt: now,
                messages: [
                    { id: uid('msg'), role: 'user', content: query, createdAt: now },
                    { id: uid('msg'), role: 'bot', content: response, createdAt: now + 1 }
                ]
            };
        });
    }

    function normalizeMessage(message) {
        return {
            id: message.id || uid('msg'),
            role: message.role || 'bot',
            content: message.content || '',
            createdAt: Number(message.createdAt) || Date.now()
        };
    }

    function normalizeChatSession(chat) {
        const messages = Array.isArray(chat.messages) ? chat.messages.map(normalizeMessage) : [];
        const firstMessage = messages.length > 0 ? messages[0] : null;
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
        const createdAt = Number(chat.createdAt) || (firstMessage ? firstMessage.createdAt : 0) || Date.now();
        const updatedAt = Number(chat.updatedAt) || (lastMessage ? lastMessage.createdAt : 0) || createdAt;
        return {
            id: chat.id || uid('chat'),
            title: chat.title || deriveChatTitle(messages),
            createdAt,
            updatedAt,
            messages
        };
    }

    function loadChatSessions() {
        try {
            const stored = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || '[]');
            if (Array.isArray(stored) && stored.length > 0) return stored.map(normalizeChatSession);
        } catch (_) {}
        return buildLegacySessions();
    }

    function persistChats() {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatSessions));
        localStorage.setItem(CURRENT_CHAT_KEY, currentChatId || '');
    }

    function getCurrentChat() {
        return chatSessions.find((chat) => chat.id === currentChatId) || null;
    }

    function deriveChatTitle(messages) {
        const firstUserMessage = messages.find((message) => message.role === 'user');
        if (!firstUserMessage) return 'New Chat';
        const trimmed = firstUserMessage.content.trim();
        return trimmed.length > 42 ? `${trimmed.slice(0, 42)}...` : trimmed;
    }

    function createChat() {
        const now = Date.now();
        const chat = {
            id: uid('chat'),
            title: 'New Chat',
            createdAt: now,
            updatedAt: now,
            messages: []
        };
        chatSessions.unshift(chat);
        currentChatId = chat.id;
        persistChats();
        renderHistory();
        renderCurrentChat();
        return chat;
    }

    function ensureCurrentChat() {
        const existing = getCurrentChat();
        if (existing) return existing;
        if (chatSessions.length === 0) return createChat();
        currentChatId = chatSessions[0].id;
        persistChats();
        return chatSessions[0];
    }

    function closeSidebarOnMobile() {
        if (sidebar) sidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('open');
    }

    function renderHistory() {
        historyList.innerHTML = '';
        if (chatSessions.length === 0) {
            historyList.innerHTML = '<li style="color: var(--text-muted); padding: 8px 12px; font-size: 13px;">No recent chats.</li>';
            return;
        }

        chatSessions
            .slice()
            .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
            .forEach((chat) => {
                const li = document.createElement('li');
                li.className = 'history-item';
                if (chat.id === currentChatId) li.classList.add('active');

                const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                icon.setAttribute('width', '16');
                icon.setAttribute('height', '16');
                icon.setAttribute('viewBox', '0 0 24 24');
                icon.setAttribute('fill', 'none');
                icon.setAttribute('stroke', 'currentColor');
                icon.setAttribute('stroke-width', '2');
                icon.style.flexShrink = '0';
                icon.innerHTML = '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>';

                const textWrap = document.createElement('div');
                textWrap.className = 'history-item-text';

                const title = document.createElement('span');
                title.className = 'history-item-title';
                title.textContent = chat.title || 'New Chat';

                const meta = document.createElement('span');
                meta.className = 'history-item-meta';
                meta.textContent = `${chat.messages.length || 0} messages • ${formatRelativeTime(chat.updatedAt || chat.createdAt)}`;

                const button = document.createElement('button');
                button.className = 'delete-chat-btn';
                button.setAttribute('aria-label', 'Delete chat');
                button.setAttribute('title', 'Delete this chat');
                button.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6m4-11v6"/></svg>';

                textWrap.appendChild(title);
                textWrap.appendChild(meta);
                li.appendChild(icon);
                li.appendChild(textWrap);
                li.appendChild(button);

                li.onclick = (e) => {
                    if (e.target.closest('.delete-chat-btn')) {
                        chatToDeleteIndex = chatSessions.findIndex((item) => item.id === chat.id);
                        deleteModalText.textContent = `Are you sure you want to delete "${chat.title || 'New Chat'}"?`;
                        deleteModal.style.display = 'flex';
                        return;
                    }

                    currentChatId = chat.id;
                    persistChats();
                    renderHistory();
                    renderCurrentChat();
                    closeSidebarOnMobile();
                };

                historyList.appendChild(li);
            });
    }

    function enhanceAssistantMarkup(container) {
        container.querySelectorAll('.btn-copy[data-copy-code]').forEach((button) => {
            button.addEventListener('click', () => {
                const code = decodeURIComponent(button.getAttribute('data-copy-code') || '');
                navigator.clipboard.writeText(code);
            });
        });

        container.querySelectorAll('.followup-btn').forEach((button) => {
            button.addEventListener('click', () => {
                userInput.value = button.dataset.query || button.textContent || '';
                handleInput();
                userInput.focus();
            });
        });
    }

    function createMessageElement(message) {
        const row = document.createElement('div');
        row.className = 'message-row';

        const isUser = message.role === 'user';
        const avatarClass = isUser ? 'user-avatar' : 'bot-avatar';
        const authorName = isUser ? 'Developer' : 'Verba Assistant';
        const avatarContent = isUser
            ? 'U'
            : '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="transparent"/><path d="M7 17L12 7L17 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

        const body = document.createElement('div');
        body.className = 'msg-body';

        if (isUser) {
            body.innerHTML = `<p>${escapeHtml(message.content)}</p>`;
        } else {
            let formatted = message.content;
            const codeBlocks = [];
            formatted = formatted.replace(/<pre><code class="vrb-code">([\s\S]*?)<\/code><\/pre>/g, (match, rawCode) => {
                const id = `__CODE_BLOCK_${codeBlocks.length}__`;
                codeBlocks.push(rawCode);
                return id;
            });

            formatted = formatted
                .replace(/#### (.*?)\n/g, '<h4>$1</h4>')
                .replace(/### (.*?)\n/g, '<h3>$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/\n\n/g, '</p><p>')
                .replace(/\n-/g, '<br>•');

            if (!formatted.trim().startsWith('<')) {
                formatted = `<p>${formatted}</p>`;
            }

            codeBlocks.forEach((rawCode, index) => {
                const encodedCopyText = encodeURIComponent(rawCode);
                const codeContent = rawCode.replace(/(".*?")|(\/\-\*[\s\S]*?\*\-\/|\/\-.*)|\b(say|define|run|give|return|async|await|class|extends|new|if|else|otherwise|unless|while|repeat|for|in|from|to|step|stop|skip|match|when)\b|(\.)(?=\s|$)/gm, (match, str, cmt, kw, dot) => {
                    if (str) return `<span class="vrb-str">${str}</span>`;
                    if (cmt) return `<span class="vrb-comment">${cmt}</span>`;
                    if (kw) return `<span class="vrb-kw">${kw}</span>`;
                    if (dot) return '<span class="vrb-kw">.</span>';
                    return match;
                });

                const replacer = `
                    <div class="code-wrapper">
                        <div class="code-header">
                            <span class="code-lang">verba</span>
                            <button class="btn-copy" data-copy-code="${encodedCopyText}" aria-label="Copy to clipboard">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                                Copy
                            </button>
                        </div>
                        <pre><code>${codeContent}</code></pre>
                    </div>
                `;

                formatted = formatted.replace(`__CODE_BLOCK_${index}__`, `</p>${replacer}<p>`);
            });

            body.innerHTML = formatted.replace(/<p>\s*<\/p>/g, '');
            enhanceAssistantMarkup(body);
        }

        const rowAvatar = document.createElement('div');
        rowAvatar.className = `avatar-box ${avatarClass}`;
        rowAvatar.innerHTML = avatarContent;

        const msgContent = document.createElement('div');
        msgContent.className = 'msg-content';

        const header = document.createElement('div');
        header.className = 'msg-header';

        const meta = document.createElement('div');
        meta.className = 'msg-meta';

        const author = document.createElement('span');
        author.className = 'msg-author';
        author.textContent = authorName;

        const actions = document.createElement('div');
        actions.className = 'msg-actions';

        const time = document.createElement('span');
        time.className = 'msg-time';
        time.textContent = formatClock(message.createdAt);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'msg-action-btn';
        copyBtn.type = 'button';
        copyBtn.title = 'Copy message';
        copyBtn.setAttribute('aria-label', 'Copy message');
        copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
        copyBtn.addEventListener('click', () => {
            const text = isUser ? message.content : responseToPlainText(message.content);
            navigator.clipboard.writeText(text);
        });

        actions.appendChild(time);
        actions.appendChild(copyBtn);

        if (isUser) {
            const reuseBtn = document.createElement('button');
            reuseBtn.className = 'msg-action-btn';
            reuseBtn.type = 'button';
            reuseBtn.title = 'Ask again';
            reuseBtn.setAttribute('aria-label', 'Ask again');
            reuseBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.13-3.36L23 10M1 14l5.36 4.36A9 9 0 0020.49 15"/></svg>';
            reuseBtn.addEventListener('click', () => {
                userInput.value = message.content;
                handleInput();
                userInput.focus();
            });
            actions.appendChild(reuseBtn);
        }

        meta.appendChild(author);
        meta.appendChild(actions);
        header.appendChild(meta);
        msgContent.appendChild(header);
        msgContent.appendChild(body);
        row.appendChild(rowAvatar);
        row.appendChild(msgContent);
        return row;
    }

    function addMessage(message) {
        const welcomeView = document.querySelector('.welcome-view');
        if (welcomeView) welcomeView.remove();
        messagesContainer.appendChild(createMessageElement(message));
        scrollToBottom();
    }

    function renderCurrentChat() {
        const chat = ensureCurrentChat();
        messagesContainer.innerHTML = '';

        if (!chat.messages.length) {
            messagesContainer.innerHTML = createWelcomeMarkup();
            attachSuggestionListeners();
            scrollToBottom();
            return;
        }

        chat.messages.forEach((message) => {
            messagesContainer.appendChild(createMessageElement(message));
        });
        scrollToBottom();
    }

    function scrollToBottom() {
        setTimeout(() => {
            const chatBox = document.querySelector('.chat-container');
            if (chatBox) chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
        }, 50);
    }

    function handleInput() {
        userInput.style.height = 'auto';
        userInput.style.height = `${userInput.scrollHeight}px`;

        if (userInput.value.trim().length > 0) sendBtn.removeAttribute('disabled');
        else sendBtn.setAttribute('disabled', 'true');
    }

    function getContextualQuery(chat, query) {
        const normalizedQuery = query.trim().toLowerCase();
        if (/^[a-z0-9_.-]+$/.test(normalizedQuery)) return query;

        const fullHistory = chat.messages
            .filter((message) => message.role === 'user')
            .map((message) => message.content);

        return [...fullHistory, query].join(' ');
    }

    function buildAssistantResponse(chat, query) {
        if (typeof findBestMatch === 'function' && typeof formatResponse === 'function') {
            const contextualQuery = getContextualQuery(chat, query);
            const hits = findBestMatch(contextualQuery);
            return formatResponse(hits, query);
        }
        return 'Knowledge Base is currently loading or offline.';
    }

    function touchChat(chat) {
        chat.title = deriveChatTitle(chat.messages);
        chat.updatedAt = Date.now();
        chatSessions = chatSessions
            .filter((item) => item.id !== chat.id)
            .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
        chatSessions.unshift(chat);
        currentChatId = chat.id;
        persistChats();
        renderHistory();
    }

    function pushMessage(chat, role, content) {
        const message = {
            id: uid('msg'),
            role,
            content,
            createdAt: Date.now()
        };
        chat.messages.push(message);
        touchChat(chat);
        return message;
    }

    function handleChatSubmit(e) {
        if (e) e.preventDefault();
        const query = userInput.value.trim();
        if (!query) return;

        const chat = ensureCurrentChat();
        const userMessage = pushMessage(chat, 'user', query);
        addMessage(userMessage);

        userInput.value = '';
        handleInput();

        const typingRow = document.createElement('div');
        typingRow.className = 'message-row thinking';
        typingRow.innerHTML = `
            <div class="avatar-box bot-avatar">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="transparent"/><path d="M7 17L12 7L17 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="msg-content">
                <div class="msg-header"><div class="msg-meta"><span class="msg-author">Verba Assistant</span><div class="msg-actions"><span class="msg-time">thinking...</span></div></div></div>
                <div class="msg-body">
                    <div class="typing-dots">
                        <div class="dot"></div><div class="dot"></div><div class="dot"></div>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingRow);
        scrollToBottom();

        const latency = Math.random() * 450 + 250;
        setTimeout(() => {
            typingRow.remove();
            const responseText = buildAssistantResponse(chat, query);
            const botMessage = pushMessage(chat, 'bot', responseText);
            addMessage(botMessage);
        }, latency);
    }

    function startNewChat() {
        createChat();
        closeSidebarOnMobile();
        userInput.value = '';
        handleInput();
        userInput.focus();
    }

    userInput.addEventListener('input', handleInput);

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendBtn.hasAttribute('disabled')) handleChatSubmit();
        }
    });

    chatForm.addEventListener('submit', handleChatSubmit);
    newChatBtn.addEventListener('click', startNewChat);
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    }

    clearBtn.addEventListener('click', () => {
        chatToDeleteIndex = null;
        deleteModalText.textContent = 'Are you sure you want to clear the entire chat history?';
        deleteModal.style.display = 'flex';
    });

    modalCancelBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
        chatToDeleteIndex = null;
    });

    modalConfirmBtn.addEventListener('click', () => {
        if (chatToDeleteIndex !== null) {
            chatSessions.splice(chatToDeleteIndex, 1);
            if (!chatSessions.find((chat) => chat.id === currentChatId)) {
                currentChatId = chatSessions.length > 0 ? chatSessions[0].id : null;
            }
        } else {
            chatSessions = [];
            currentChatId = null;
        }

        persistChats();
        renderHistory();
        if (!currentChatId) createChat();
        else renderCurrentChat();

        deleteModal.style.display = 'none';
        chatToDeleteIndex = null;
    });

    if (mobileMenuBtn && sidebar && sidebarOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('open');
        });

        sidebarOverlay.addEventListener('click', closeSidebarOnMobile);
    }

    initializeTheme();

    if (!currentChatId && chatSessions.length > 0) currentChatId = chatSessions[0].id;

    if (chatSessions.length === 0) createChat();
    else {
        persistChats();
        renderHistory();
        renderCurrentChat();
    }

    attachSuggestionListeners();
    handleInput();
});
