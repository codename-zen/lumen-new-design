var THREADS = {
  'User research analysis': {
    project: 'Design help',
    messages: [
      { type: 'user', text: 'Can you summarize the user research findings from our latest study?' },
      { type: 'ai', thinking: 'The user is asking for a summary of user research findings. I should check the knowledge base for relevant documents and provide a structured summary of key findings.', text: 'Here are the key findings from the latest user research study:\n\n- **Navigation friction** — 68% of users struggled to find the settings panel\n- **Onboarding drop-off** — 42% abandoned during step 3 of onboarding\n- **Feature discovery** — Most users never found the export feature\n\nWould you like me to elaborate on any of these points?' },
      { type: 'user', text: 'What recommendations do you have for the navigation issue?' },
      { type: 'ai', thinking: 'Based on the navigation friction findings, I should recommend specific UX improvements that address the root cause of users not finding settings.', text: 'Based on the findings, I recommend:\n\n- Move settings to a more prominent location (e.g., top bar)\n- Add a contextual help tooltip on first visit\n- Simplify the IA by grouping related settings together\n\nThis should reduce navigation friction by an estimated 40-50%.' },
      { type: 'user', file: 'user-research-report.pdf', fileType: 'PDF' }
    ]
  },
  'Competitive analysis': {
    project: 'Design help',
    messages: [
      { type: 'user', text: 'Who are our top 3 competitors in the AI knowledge base space?' },
      { type: 'ai', thinking: 'Analyzing the AI knowledge base market to identify top competitors based on market share, feature set, and enterprise adoption.', text: 'Based on market analysis, your top 3 competitors are:\n\n- **Notion AI** — Strong in document-centric workflows\n- **Glean** — Enterprise search focus with deep integrations\n- **Mem.ai** — Knowledge graph approach for personal notes\n\nEach has different strengths. Would you like a detailed feature comparison?' },
      { type: 'user', text: 'Yes, please create a comparison table.' },
      { type: 'ai', thinking: 'Creating a comparison table across key features: SSO, Knowledge Base, Web Search, API Access.', text: 'Here is a feature comparison:\n\n| Feature | Lumen | Notion AI | Glean | Mem.ai |\n|---------|-------|-----------|-------|--------|\n| Enterprise SSO | Yes | Yes | Yes | No |\n| Knowledge Base | Yes | Yes | Yes | Yes |\n| Web Search | Yes | No | No | No |\n| API Access | Yes | Yes | Yes | No |\n\nLumen has a unique advantage with built-in web search combined with knowledge base.' }
    ]
  },
  'Meeting notes': {
    project: 'Design help',
    messages: [
      { type: 'user', text: 'Summarize the key action items from yesterday\'s design review meeting.' },
      { type: 'ai', thinking: 'Retrieving meeting notes from the knowledge base and extracting action items with owners and deadlines.', text: 'Here are the key action items from the design review meeting:\n\n- **Update sidebar navigation** — Remove chevron icons from active states (Owner: Design team, Due: This week)\n- **Settings modal polish** — Align spacing in the 10-tab layout (Owner: Gani, Due: Friday)\n- **Chat composer refinement** — Remove focus ring per design spec (Owner: Frontend, Due: Next sprint)\n- **Token enforcement audit** — Run hex color + icon audit across all components (Owner: Design ops, Due: End of month)\n\nWould you like me to assign these to specific people in the project management tool?' },
      { type: 'user', text: 'Which of these is the highest priority?' },
      { type: 'ai', thinking: 'Prioritizing based on impact and effort. Sidebar navigation is quick win, token audit prevents future issues.', text: 'The **sidebar navigation update** is highest priority — it\'s a quick win that improves visual consistency immediately. The **token enforcement audit** is second, as it prevents future inconsistencies from compounding.' }
    ]
  },
  'Typography discussion': {
    project: 'Design help',
    messages: [
      { type: 'user', text: 'Get a detailed project workflow' },
      { type: 'ai', thinking: 'The user wants a detailed project workflow based on the onboarding demo. I should analyze the demo content and structure it into key phases with actionable steps.', status: [{ type: 'viewed', label: 'Onboarding Demo' }, { type: 'generating', label: 'Generating project workflow...' }], text: '### Shaping the AI Chat Experience\n\n- During the session, the team presented the overall product vision focused on building a modern AI chat experience that feels intuitive and easy to use for end users.\n- Key emphasis was placed on clarity of interaction, reducing cognitive load, and ensuring responses feel helpful, contextual, and trustworthy.\n\n### Key Takeaways\n\n1. The experience should scale from onboarding demos to advanced workflows without increasing complexity for the user.\n2. The AI chat should serve as a primary interface for user interaction, prioritizing simplicity and clear intent recognition.', sources: [{ type: 'document', title: 'Customer Feedback: Aggregated Insights and Key Pain Points' }, { type: 'document', title: 'Sales Performance: Pipeline Health and Conversion Metrics' }, { type: 'video', title: 'Product Overview Session' }] },
      { type: 'user', text: 'Hey Spectrum, I have a question for you.' },
      { type: 'ai', thinking: 'The user is greeting me and wants to ask a question. I should respond warmly and invite them to share their question.', text: 'Of course, I\'m listening, how can I help you?' },
      { type: 'user', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop' },
      { type: 'user', text: 'What\'s the difference between serif and sans-serif fonts?' },
      { type: 'ai', thinking: 'The user is asking about typography differences. I should provide a clear comparison with examples.', text: 'Serif fonts have strokes (Times New Roman); sans-serif are clean (Arial). Serif feels traditional for print, sans-serif modern for screens.' },
      { type: 'user', file: 'license-agreement.pdf', fileType: 'PDF' },
      { type: 'user', file: 'brand-guidelines.docx', fileType: 'DOCX' },
      { type: 'user', file: 'quarterly-report.pptx', fileType: 'PPTX' },
      { type: 'ai', thinking: 'The user uploaded 3 files. I should review each one and provide a summary of what I found, highlighting any relevant typography recommendations.', text: 'I\'ve reviewed the uploaded files. Here\'s what I found:\n\n- **license-agreement.pdf** — Standard license agreement with terms for software usage\n- **brand-guidelines.docx** — Brand guidelines document with typography specs\n- **quarterly-report.pptx** — Q3 quarterly presentation with revenue data\n\nThe brand guidelines recommend using sans-serif for digital interfaces, which aligns with your current Lumen design system.' }
    ]
  }
};

function renderMarkdown(text) {
  var html = escapeHtml(text);
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, function(m, code) { return '\n<pre><code>' + code.trim() + '</code></pre>\n'; });
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Headings (### )
  html = html.replace(/^### (.+)$/gm, '\n<h3>$1</h3>\n');
  // Unordered lists — group consecutive lines starting with - or •
  html = html.replace(/(?:^[\u2022\u25CF\u25C6\-] (.+)$\n?)+/gm, function(match) {
    var items = match.trim().split('\n').map(function(line) {
      var content = line.replace(/^[\u2022\u25CF\u25C6\-] /, '');
      return '<li>' + content + '</li>';
    });
    return '\n<ul>' + items.join('') + '</ul>\n';
  });
  // Ordered lists — group consecutive lines starting with number.
  html = html.replace(/(?:^\d+\. (.+)$\n?)+/gm, function(match) {
    var items = match.trim().split('\n').map(function(line) {
      var content = line.replace(/^\d+\. /, '');
      return '<li>' + content + '</li>';
    });
    return '\n<ol>' + items.join('') + '</ol>\n';
  });
  // Line breaks (double = paragraph break)
  html = html.replace(/\n\n+/g, '</p><p>');
  html = html.replace(/\n/g, ' ');
  // Wrap in paragraphs
  html = '<p>' + html + '</p>';
  // Clean up: don't wrap block elements in p
  html = html.replace(/<p>\s*(<h3>)/g, '$1');
  html = html.replace(/(<\/h3>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<ol>)/g, '$1');
  html = html.replace(/(<\/ol>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<pre>)/g, '$1');
  html = html.replace(/(<\/pre>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/\s+<\/p>/g, '</p>');
  html = html.replace(/<p>\s+/g, '<p>');
  return html;
}

function toggleThought(btn) {
  btn.closest('.msg__thought').classList.toggle('msg__thought--open');
  var isOpen = btn.closest('.msg__thought').classList.contains('msg__thought--open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function renderMessages(messages) {
  var container = document.getElementById('messages-container');
  if (!container) return;
  container.innerHTML = '';

  var fileTypeIcons = {
    'PDF': 'ph-file-pdf',
    'DOCX': 'ph-file-doc',
    'PPTX': 'ph-file-powerpoint',
    'XLSX': 'ph-file-xls',
    'MD': 'ph-file-text',
    'PNG': 'ph-file-image',
    'JPG': 'ph-file-image'
  };

  messages.forEach(function(msg, idx) {
    var msgEl = document.createElement('div');
    msgEl.className = 'msg msg--' + msg.type;

    if (msg.type === 'user') {
      if (msg.image) {
        msgEl.innerHTML = '<div class="msg__img"><img src="' + msg.image + '" alt="Uploaded image"></div>';
      } else if (msg.file) {
        var iconClass = fileTypeIcons[msg.fileType] || 'ph-paperclip';
        msgEl.innerHTML =
          '<div class="msg__file">' +
            '<div class="msg__file-icon"><i class="ph ph-bold ' + iconClass + '"></i></div>' +
            '<div>' +
              '<div class="msg__file-name">' + msg.file + '</div>' +
              '<div class="msg__file-type">' + (msg.fileType || 'FILE') + '</div>' +
            '</div>' +
          '</div>';
      } else {
        msgEl.innerHTML = '<div class="msg__bubble">' + escapeHtml(msg.text) + '</div>';
      }
    } else if (msg.type === 'ai') {
      // Build thought expander
      var thoughtHtml = '';
      if (msg.thinking) {
        thoughtHtml =
          '<div class="msg__thought">' +
            '<button class="msg__thought-header" type="button" onclick="toggleThought(this)" aria-expanded="false">' +
              '<i class="ph ph-bold ph-lightbulb"></i>' +
              '<span class="msg__thought-label">Thought</span>' +
              '<span class="msg__thought-chevron"><i class="ph ph-bold ph-caret-right"></i></span>' +
            '</button>' +
            '<div class="msg__thought-body">' + escapeHtml(msg.thinking) + '</div>' +
          '</div>';
      }

      // Build status items
      var statusHtml = '';
      if (msg.status && msg.status.length) {
        statusHtml = msg.status.map(function(s) {
          if (s.type === 'viewed') {
            return '<div class="msg__status"><i class="ph ph-eye"></i> Viewed <span class="msg__status-tag"><i class="ph ph-video-camera"></i>' + s.label + '</span></div>';
          } else if (s.type === 'generating') {
            return '<div class="msg__status"><div class="msg__status-spinner"></div> ' + s.label + '</div>';
          }
          return '';
        }).join('');
      }

      // Build sources
      var sourcesHtml = '';
      if (msg.sources && msg.sources.length) {
        sourcesHtml = '<div class="msg__sources"><div class="msg__sources-header">' + msg.sources.length + ' results</div>';
        sourcesHtml += msg.sources.map(function(src) {
          var icon = src.type === 'video' ? 'ph-play-circle' : 'ph-file-text';
          return '<div class="msg__source"><div class="msg__source-icon"><i class="ph ' + icon + '"></i></div><div class="msg__source-title">' + escapeHtml(src.title) + '</div><div class="msg__source-action"><i class="ph ph-arrow-down"></i></div></div>';
        }).join('');
        sourcesHtml += '</div>';
      }

      // Build markdown content
      var mdHtml = '<div class="msg__md">' + renderMarkdown(msg.text) + '</div>';

      // Assemble
      msgEl.innerHTML =
        '<div class="msg__ai">' +
          thoughtHtml +
          statusHtml +
          mdHtml +
          sourcesHtml +
          '<div class="msg__actions">' +
            '<button class="ui-btn ui-btn--icon-xs" type="button" title="Copy"><i class="ph ph-bold ph-copy"></i></button>' +
            '<button class="ui-btn ui-btn--icon-xs" type="button" title="Good response"><i class="ph ph-bold ph-thumbs-up"></i></button>' +
            '<button class="ui-btn ui-btn--icon-xs" type="button" title="Bad response"><i class="ph ph-bold ph-thumbs-down"></i></button>' +
            '<button class="ui-btn ui-btn--icon-xs" type="button" title="Regenerate"><i class="ph ph-bold ph-arrows-clockwise"></i></button>' +
          '</div>' +
        '</div>';
    }

    container.appendChild(msgEl);
  });

  // Scroll to bottom
  var msgArea = document.getElementById('chat-messages');
  if (msgArea) msgArea.scrollTop = msgArea.scrollHeight;
}

function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
