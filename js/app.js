function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

function setActiveNav(el) {
  // Clear all active states across entire sidebar
  document.querySelectorAll('.sidebar-nav .nav-link, .sidebar-sections .section-item').forEach(l => l.classList.remove('active'));
  el.classList.add('active');
}

function setActiveSection(el) {
  // Clear all active states across entire sidebar
  document.querySelectorAll('.sidebar-nav .nav-link, .sidebar-sections .section-item').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}

// ── VIEW ROUTER ──
// Routes: chat, projects, library, research, websearch, knowledge
// Each route maps to a #view-<route> container inside .main__panel.
// Topbar breadcrumb updates per-route for consistency.
var ROUTE_CONFIG = {
  chat:          { crumb: 'Design help', active: 'Typography discussion', showComposer: true },
  projects:      { crumb: 'Home',         active: 'Projects',              showComposer: false },
  projectdetail: { crumb: 'Projects',     active: 'Project 1',             showComposer: false },
  library:       { crumb: 'Home',         active: 'Library',               showComposer: false },
  research:      { crumb: 'Pinned',       active: 'Research & Analysis',   showComposer: false },
  websearch:     { crumb: 'Home',         active: 'History',               showComposer: false },
  knowledge:     { crumb: 'Pinned',       active: 'Knowledge Base',        showComposer: false }
};

// ── THREAD DATA (recent conversations) ──

function navigateTo(route, el, threadTitle) {
  // Clear all active states across entire sidebar
  document.querySelectorAll('.sidebar-nav .nav-link, .sidebar-nav .nav-link-new-chat, .sidebar-sections .section-item').forEach(function(s) {
    s.classList.remove('active');
  });
  if (el) el.classList.add('active');

  // Hide all views
  document.querySelectorAll('.view').forEach(function(v) {
    v.classList.add('is-hidden');
    v.classList.remove('is-shown');
  });

  // Show target view
  var view = document.getElementById('view-' + route);
  if (view) {
    view.classList.remove('is-hidden');
    view.classList.add('is-shown');
  }

  // Update topbar breadcrumb
  var cfg = ROUTE_CONFIG[route] || ROUTE_CONFIG.chat;
  var bc = document.getElementById('topbar-breadcrumb');
  if (bc) {
    var crumb = cfg.crumb;
    // For recent threads, use the thread's project as crumb
    if (route === 'chat' && threadTitle && THREADS[threadTitle]) {
      crumb = THREADS[threadTitle].project;
    }
    if (crumb) {
      bc.innerHTML =
        '<span class="ui-breadcrumb__crumb">' + crumb + '</span>' +
        '<span class="ui-breadcrumb__sep">/</span>' +
        '<span class="ui-breadcrumb__crumb ui-breadcrumb__crumb--active">' + (threadTitle || cfg.active) + '</span>' +
        '<button class="ui-btn ui-btn--icon-xs" type="button"><i class="ph ph-bold ph-caret-down"></i></button>';
    } else {
      bc.innerHTML =
        '<span class="ui-breadcrumb__crumb ui-breadcrumb__crumb--active">' + (threadTitle || cfg.active) + '</span>' +
        '<button class="ui-btn ui-btn--icon-xs" type="button"><i class="ph ph-bold ph-caret-down"></i></button>';
    }
  }

  // Chat view: toggle empty vs messages
  if (route === 'chat') {
    var emptyEl = document.getElementById('chat-empty');
    var msgEl = document.getElementById('chat-messages');

    if (threadTitle && THREADS[threadTitle]) {
      // Show conversation thread
      if (emptyEl) { emptyEl.classList.add('is-hidden'); emptyEl.classList.remove('is-shown'); }
      if (msgEl) { msgEl.classList.remove('is-hidden'); msgEl.classList.add('is-shown'); }
      renderMessages(THREADS[threadTitle].messages);
    } else {
      // Show empty state (new chat)
      if (emptyEl) { emptyEl.classList.remove('is-hidden'); emptyEl.classList.add('is-shown'); }
      if (msgEl) { msgEl.classList.add('is-hidden'); msgEl.classList.remove('is-shown'); }
      var g = document.getElementById('chat-greeting');
      if (g) g.textContent = 'Hello Gani';
    }
  }
}

function closeProfileMenu() {
  var menu = document.getElementById('profile-menu');
  if (menu) { menu.classList.remove('is-shown'); menu.classList.add('is-hidden'); }
  var profileBtn = document.querySelector('.user-profile');
  if (profileBtn) profileBtn.setAttribute('aria-expanded', 'false');
}

function toggleProfileMenu(e) {
  var menu = document.getElementById('profile-menu');
  var profileBtn = e ? e.currentTarget : null;
  var isShown = menu.classList.contains('is-shown');
  if (isShown) {
    menu.classList.remove('is-shown');
    menu.classList.add('is-hidden');
    if (profileBtn) profileBtn.setAttribute('aria-expanded', 'false');
    return;
  }
  // Position: bottom of menu aligns just above the profile bar, same horizontal position
  var profile = document.querySelector('.sidebar-footer');
  var rect = profile.getBoundingClientRect();
  menu.classList.remove('is-hidden');
  menu.classList.add('is-shown');
  if (profileBtn) profileBtn.setAttribute('aria-expanded', 'true');
  var menuRect = menu.getBoundingClientRect();
  // Bottom of menu = top of profile bar, with small gap, growing upward
  menu.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
  // Left aligned with profile content (avatar start)
  menu.style.left = (rect.left + 12) + 'px';
}

// Close on outside click
document.addEventListener('click', function(e) {
  var menu = document.getElementById('profile-menu');
  var profile = document.querySelector('.sidebar-footer');
  if (menu && menu.classList.contains('is-shown')) {
    if (!menu.contains(e.target) && !profile.contains(e.target)) {
      menu.classList.remove('is-shown');
      menu.classList.add('is-hidden');
      var profileBtn = profile.querySelector('.user-profile');
      if (profileBtn) profileBtn.setAttribute('aria-expanded', 'false');
    }
  }
});

// Close on escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    var menu = document.getElementById('profile-menu');
    if (menu) { menu.classList.remove('is-shown'); menu.classList.add('is-hidden'); }
    var profileBtn = document.querySelector('.user-profile');
    if (profileBtn) profileBtn.setAttribute('aria-expanded', 'false');
    closeSettings();
    closeAdminModal();
    closeDeveloperModal();
  }
});

// Settings modal
function openSettings(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }
  var pm = document.getElementById('profile-menu');
  pm.classList.remove('is-shown');
  pm.classList.add('is-hidden');
  var profileBtn = document.querySelector('.user-profile');
  if (profileBtn) profileBtn.setAttribute('aria-expanded', 'false');
  var overlay = document.getElementById('settings-overlay');
  overlay.classList.remove('is-hidden');
  overlay.classList.add('is-shown');
}

function closeSettings() {
  var overlay = document.getElementById('settings-overlay');
  overlay.classList.remove('is-shown');
  overlay.classList.add('is-hidden');
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    // System: follow OS preference
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
}

function setSettingsTab(el, tab) {
  // Update nav active state (includes ws switcher)
  document.querySelectorAll('.settings-nav__item, .settings-ws').forEach(function(item) {
    item.classList.remove('active');
  });
  el.classList.add('active');

  // Hide all tabs
  document.querySelectorAll('.settings-tab').forEach(function(t) {
    t.classList.add('is-hidden');
    t.classList.remove('is-shown');
  });

  // Show selected tab
  var tabEl = document.getElementById('tab-' + tab);
  if (tabEl) {
    tabEl.classList.remove('is-hidden');
    tabEl.classList.add('is-shown');
  }

  // Update title
  var titleEl = document.getElementById('settings-title');
  var subEl = document.getElementById('settings-subtitle');
  var titles = {
    overview:     { title: 'Workspace overview', sub: 'Manage your workspace ownership and settings.' },
    people:       { title: 'Team members',       sub: 'Manage workspace members, roles and permissions.' },
    plans:        { title: 'Plans & Billing',    sub: 'Manage your subscription and billing details.' },
    profile:      { title: 'Profile',            sub: 'Manage your personal account settings.' },
    preferences:  { title: 'Preferences',        sub: 'Customize your experience.' },
    appearance:   { title: 'Appearance',         sub: 'Customize how Lumen looks.' },
    security:     { title: 'Security',           sub: 'Manage your account security.' },
    privacy:      { title: 'Privacy & Data',     sub: 'Manage your privacy and data settings.' },
    ai:           { title: 'AI Settings',        sub: 'Configure AI model behavior and defaults.' },
    integrations: { title: 'Integrations',       sub: 'Manage your data integrations.' },
    advanced:     { title: 'Advanced',           sub: 'Power-user configuration options.' }
  };
  var t = titles[tab] || titles.overview;
  if (titleEl) titleEl.textContent = t.title;
  if (subEl) subEl.textContent = t.sub;
}

// Close settings on overlay click
document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.getElementById('settings-overlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeSettings();
    });
  }

  // Build segmented bars from data-fill / data-color attributes
  // Each track gets 20 segments; data-fill = number of segments to light up
  document.querySelectorAll('.st-bar__track').forEach(function(track) {
    var fill = parseInt(track.getAttribute('data-fill') || '0', 10);
    var color = track.getAttribute('data-color') || '#335cff';
    track.style.setProperty('--seg-color', color);
    for (var i = 0; i < 20; i++) {
      var seg = document.createElement('span');
      seg.className = 'seg' + (i < fill ? ' on' : '');
      track.appendChild(seg);
    }
  });
});

// Composer placeholder hide on input
document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('composer-input');
  var placeholder = document.getElementById('composer-placeholder');
  if (input && placeholder) {
    input.addEventListener('input', function() {
      placeholder.style.display = input.textContent.trim() ? 'none' : 'block';
    });
  }
});
// ── UI SELECT DROPDOWN (reusable) ──

// Card menu toggle (project card kebab)
function toggleCardMenu(btn) {
  var card = btn.closest('.proj-card');
  if (!card) return;
  // Close all other cards
  document.querySelectorAll('.proj-card--menu-open').forEach(function(c) {
    if (c !== card) c.classList.remove('proj-card--menu-open');
  });
  card.classList.toggle('proj-card--menu-open');
}

// Close card menus on outside click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.proj-card__more') && !e.target.closest('.proj-card__menu')) {
    document.querySelectorAll('.proj-card--menu-open').forEach(function(c) {
      c.classList.remove('proj-card--menu-open');
    });
  }
});

function toggleUiSelect(btn) {
  var sel = btn.closest('.ui-select');
  if (!sel) return;
  // Close all other selects
  document.querySelectorAll('.ui-select--open').forEach(function(s) {
    if (s !== sel) {
      s.classList.remove('ui-select--open');
      var b = s.querySelector('.ui-btn--select');
      if (b) b.setAttribute('aria-expanded', 'false');
    }
  });
  sel.classList.toggle('ui-select--open');
  var isOpen = sel.classList.contains('ui-select--open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function selectUiItem(btn) {
  var sel = btn.closest('.ui-select');
  if (!sel) return;
  // Update selected state
  sel.querySelectorAll('.ui-select__item').forEach(function(item) {
    item.classList.remove('ui-select__item--selected');
    item.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('ui-select__item--selected');
  btn.setAttribute('aria-selected', 'true');
  // Update button label — clone icon + text + caret from selected item
  var selectBtn = sel.querySelector('.ui-btn--select, .ui-btn--mode');
  if (selectBtn) {
    var itemIcon = btn.querySelector('.ph');
    var caret = selectBtn.querySelector('.ph-caret-down');
    selectBtn.innerHTML = '';
    if (itemIcon) {
      var newIcon = document.createElement('i');
      newIcon.className = itemIcon.className;
      selectBtn.appendChild(newIcon);
    }
    selectBtn.appendChild(document.createTextNode(' ' + btn.textContent.trim() + ' '));
    if (caret) {
      var newCaret = document.createElement('i');
      newCaret.className = caret.className;
      selectBtn.appendChild(newCaret);
    }
  }
  // Close dropdown
  sel.classList.remove('ui-select--open');
  if (selectBtn) selectBtn.setAttribute('aria-expanded', 'false');
}

// Close dropdowns on outside click
document.addEventListener('click', function(e) {
  if (!e.target.closest('.ui-select')) {
    document.querySelectorAll('.ui-select--open').forEach(function(s) {
      s.classList.remove('ui-select--open');
      var b = s.querySelector('.ui-btn--select');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
});
// ── DATA TABLE: sorting + search filter ──
var dtSortCol = 'name';
var dtSortDir = 'asc';

function sortLibraryTable(col, thEl) {
  if (dtSortCol === col) {
    dtSortDir = dtSortDir === 'asc' ? 'desc' : 'asc';
  } else {
    dtSortCol = col;
    dtSortDir = 'asc';
  }
  // Find the th element
  var clickedTh = thEl || (window.event && window.event.currentTarget);
  if (!clickedTh) return;

  // Update header sort indicators
  document.querySelectorAll('#library-table th').forEach(function(th) {
    th.classList.remove('dt-th--sorted');
    var icon = th.querySelector('.dt-th__icon');
    if (icon) icon.innerHTML = '';
  });
  clickedTh.classList.add('dt-th--sorted');
  var icon = clickedTh.querySelector('.dt-th__icon');
  if (icon) icon.innerHTML = '<i class="ph ph-caret-' + (dtSortDir === 'asc' ? 'up' : 'down') + '"></i>';

  // Get rows and sort
  var tbody = document.getElementById('library-tbody');
  var rows = Array.from(tbody.querySelectorAll('tr'));
  var colIndex = Array.from(clickedTh.parentElement.children).indexOf(clickedTh);

  rows.sort(function(a, b) {
    var aText = a.cells[colIndex].textContent.trim();
    var bText = b.cells[colIndex].textContent.trim();
    // Try numeric sort for size column
    if (col === 'size') {
      var aNum = parseFloat(aText);
      var bNum = parseFloat(bText);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return dtSortDir === 'asc' ? aNum - bNum : bNum - aNum;
      }
    }
    // String sort
    if (aText < bText) return dtSortDir === 'asc' ? -1 : 1;
    if (aText > bText) return dtSortDir === 'asc' ? 1 : -1;
    return 0;
  });

  // Re-append sorted rows
  rows.forEach(function(row) { tbody.appendChild(row); });
}

function filterLibraryTable() {
  var query = (document.getElementById('dt-search').value || '').toLowerCase();
  var rows = document.querySelectorAll('#library-tbody tr');
  var visibleCount = 0;

  rows.forEach(function(row) {
    var text = row.textContent.toLowerCase();
    if (text.indexOf(query) > -1) {
      row.style.display = '';
      visibleCount++;
    } else {
      row.style.display = 'none';
    }
  });

  // Update count
  var countEl = document.getElementById('dt-count');
  if (countEl) countEl.textContent = visibleCount + (visibleCount === 1 ? ' document' : ' documents');

  var pagInfo = document.getElementById('dt-pagination-info');
  if (pagInfo) pagInfo.textContent = 'Showing 1-' + visibleCount + ' of ' + visibleCount;

  // Show/hide empty state
  var empty = document.getElementById('dt-empty');
  var table = document.getElementById('library-table');
  if (empty && table) {
    if (visibleCount > 0) {
      empty.style.display = 'none';
      table.style.display = '';
    } else {
      empty.style.display = 'flex';
      table.style.display = 'none';
    }
  }
}
// ── ADMIN MODAL ──
function openAdminModal() {
  closeProfileMenu();
  var overlay = document.getElementById('admin-overlay');
  overlay.classList.remove('is-hidden');
  overlay.classList.add('is-shown');
}

function closeAdminModal() {
  var overlay = document.getElementById('admin-overlay');
  overlay.classList.remove('is-shown');
  overlay.classList.add('is-hidden');
}

function setAdminModalTab(el, tab) {
  document.querySelectorAll('#admin-overlay .settings-nav__item, #admin-overlay .settings-ws').forEach(function(item) {
    item.classList.remove('active');
  });
  el.classList.add('active');
  document.querySelectorAll('#admin-overlay .settings-tab').forEach(function(t) {
    t.classList.add('is-hidden');
    t.classList.remove('is-shown');
  });
  var tabEl = document.getElementById('atab-' + tab);
  if (tabEl) { tabEl.classList.remove('is-hidden'); tabEl.classList.add('is-shown'); }
  var titles = {
    overview:     { title: 'Admin overview', sub: 'Monitor organization health and recent activity.' },
    users:        { title: 'Users', sub: '4 of 4 users' },
    organization: { title: 'Organization', sub: 'Departments, managers, and groups.' },
    audit:        { title: 'Audit log', sub: '0 of 0 entries' },
    usage:        { title: 'Usage stats', sub: 'Per-member usage metrics.' }
  };
  var t = titles[tab] || titles.overview;
  var titleEl = document.getElementById('admin-title');
  var subEl = document.getElementById('admin-subtitle');
  if (titleEl) titleEl.textContent = t.title;
  if (subEl) subEl.textContent = t.sub;
}

// ── DEVELOPER MODAL ──
function openDeveloperModal() {
  closeProfileMenu();
  var overlay = document.getElementById('developer-overlay');
  overlay.classList.remove('is-hidden');
  overlay.classList.add('is-shown');
}

function closeDeveloperModal() {
  var overlay = document.getElementById('developer-overlay');
  overlay.classList.remove('is-shown');
  overlay.classList.add('is-hidden');
}

function setDeveloperModalTab(el, tab) {
  document.querySelectorAll('#developer-overlay .settings-nav__item, #developer-overlay .settings-ws').forEach(function(item) {
    item.classList.remove('active');
  });
  el.classList.add('active');
  document.querySelectorAll('#developer-overlay .settings-tab').forEach(function(t) {
    t.classList.add('is-hidden');
    t.classList.remove('is-shown');
  });
  var tabEl = document.getElementById('dtab-' + tab);
  if (tabEl) { tabEl.classList.remove('is-hidden'); tabEl.classList.add('is-shown'); }
  var titles = {
    overview:   { title: 'Overview', sub: 'System status and operational health at a glance.' },
    providers:  { title: 'LLM providers', sub: 'Configure chat model backends, API keys, and routing.' },
    websearch:  { title: 'Web Search', sub: 'Configure web search provider, API keys, and search behavior.' },
    workers:    { title: 'Workers', sub: 'Hatchet workflows, workers, and run status.' },
    connectors: { title: 'Connectors', sub: 'Connect external data sources for deep research and RAG.' },
    storage:    { title: 'Storage', sub: 'Configure file storage backend.' },
    logs:       { title: 'Logs', sub: 'API, worker, and Hatchet logs merged with audit events.' },
    debug:      { title: 'Debug tools', sub: 'Diagnostic actions for indexing, vectors, caches, and auth.' },
    danger:     { title: 'Danger zone', sub: 'Destructive operations. Superadmin only.' }
  };
  var t = titles[tab] || titles.overview;
  var titleEl = document.getElementById('developer-title');
  var subEl = document.getElementById('developer-subtitle');
  if (titleEl) titleEl.textContent = t.title;
  if (subEl) subEl.textContent = t.sub;
}

// Close admin/developer modals on overlay click
document.addEventListener('DOMContentLoaded', function() {
  var adminOverlay = document.getElementById('admin-overlay');
  if (adminOverlay) {
    adminOverlay.addEventListener('click', function(e) { if (e.target === adminOverlay) closeAdminModal(); });
  }
  var devOverlay = document.getElementById('developer-overlay');
  if (devOverlay) {
    devOverlay.addEventListener('click', function(e) { if (e.target === devOverlay) closeDeveloperModal(); });
  }
});

// ── PROJECT DETAIL ──
// Open the project detail view from a project card. Pulls the project title
// from the card's .proj-card__title so the header + breadcrumb stay in sync.
function openProjectDetail(linkEl) {
  var card = linkEl.closest('.proj-card');
  var titleEl = card ? card.querySelector('.proj-card__title') : null;
  var name = titleEl ? titleEl.textContent.trim() : 'Project';

  // Update header title for this project
  var pdTitle = document.getElementById('pd-title');
  if (pdTitle) pdTitle.textContent = name;

  // Reset to Threads tab on open (clean state)
  var tabs = document.querySelectorAll('#view-projectdetail .pd-tabs__tab');
  tabs.forEach(function(t, i) {
    if (i === 0) {
      t.classList.add('pd-tabs__tab--active');
      t.setAttribute('aria-selected', 'true');
    } else {
      t.classList.remove('pd-tabs__tab--active');
      t.setAttribute('aria-selected', 'false');
    }
  });
  document.querySelectorAll('#view-projectdetail .pd-panel').forEach(function(p, i) {
    if (i === 0) p.classList.remove('is-hidden');
    else p.classList.add('is-hidden');
  });

  // Use the existing router so sidebar active states + breadcrumb update
  // consistently. Pass projectName so breadcrumb shows "Projects / {name}".
  // The Projects sidebar nav-link is the closest semantic active state.
  var projectsNav = document.querySelector('.nav-link[data-tooltip="Projects"]');
  navigateTo('projectdetail', projectsNav, name);
}

// Switch tabs inside the Project Detail view.
function switchPdTab(btn, key) {
  var view = document.getElementById('view-projectdetail');
  if (!view) return;

  view.querySelectorAll('.pd-tabs__tab').forEach(function(t) {
    t.classList.remove('pd-tabs__tab--active');
    t.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('pd-tabs__tab--active');
  btn.setAttribute('aria-selected', 'true');

  view.querySelectorAll('.pd-panel').forEach(function(p) { p.classList.add('is-hidden'); });
  var panel = document.getElementById('pd-panel-' + key);
  if (panel) panel.classList.remove('is-hidden');
}
