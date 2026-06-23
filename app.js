/* ─── JAVASCRIPT: LUMEN DESIGN SYSTEM v2 ─── */

// ═══════════ SIDEBAR ═══════════

const Sidebar = {
  init() {
    this.el = document.getElementById('sidebar');
    this.toggleBtn = document.querySelector('.sidebar-toggle');
    this.toggleBtn?.addEventListener('click', () => this.toggle());
    
    // Load collapsed state
    const saved = localStorage.getItem('lumen-sidebar-collapsed');
    if (saved === 'true') this.el?.classList.add('collapsed');
  },
  
  toggle() {
    this.el.classList.toggle('collapsed');
    localStorage.setItem('lumen-sidebar-collapsed', this.el.classList.contains('collapsed'));
  }
};

// ═══════════ MODAL ═══════════

const Modal = {
  open(id) {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = 'flex';
      document.addEventListener('keydown', this._onEscape);
    }
  },
  
  close(id) {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = 'none';
      document.removeEventListener('keydown', this._onEscape);
    }
  },
  
  _onEscape(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay[style*="flex"]').forEach(m => {
        m.style.display = 'none';
      });
    }
  }
};

// ═══════════ TOAST ═══════════

const Toast = {
  show(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => toast.classList.add('visible'));
    
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

// ═══════════ SEARCH (Debounced) ═══════════

const Search = {
  init(inputSelector, onSearch) {
    const input = document.querySelector(inputSelector);
    if (!input) return;
    
    let timer;
    input.addEventListener('input', (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => onSearch(e.target.value), 300);
    });
  }
};

// ═══════════ API CLIENT ═══════════

const api = {
  async fetch(url, options = {}) {
    const token = localStorage.getItem('lumen-token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: "Bearer " + token } : {}),
      ...options.headers
    };
    
    const res = await fetch(`https://dev-lumen-api.zenmail.my.id${url}`, {
      ...options,
      headers
    });
    
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || err.message || 'Request failed');
    }
    
    return res.json();
  },
  
  setToken(token) {
    localStorage.setItem('lumen-token', token);
  },
  
  clearToken() {
    localStorage.removeItem('lumen-token');
  }
};

// ═══════════ INIT ═══════════

document.addEventListener('DOMContentLoaded', () => {
  Sidebar.init();
  
  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.style.display = 'none';
    });
  });
});
