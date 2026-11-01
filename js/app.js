import { renderProjectVisualHTML } from './procedural_visuals.js';

const UI_TEXT = {
  en: {
    navPublications: 'Publications & Thesis',
    navProjects: 'Projects & Research',
    navExperience: 'Academic & Timeline',
    techTitle: 'Core Stack & Methods',
    publicationsTitle: 'Publications & Licenciatura Thesis',
    projectsTitle: 'Projects & Research Bento',
    experienceTitle: 'Education & Research Timeline',
    searchPlaceholder: 'Filter by title, method, or tag...',
    ongoingBadge: 'Ongoing',
    publicationBadge: 'Publication / Thesis',
    authorsPrefix: 'Authors:',
    copyBibtex: 'Copy BibTeX',
    copiedBibtex: 'BibTeX Copied!',
    closeLightbox: 'Close (Esc)',
    emptyResults: 'No projects match the current filter.',
    showingCount: (shown, total) => `Showing ${shown} of ${total}`,
  },
  es: {
    navPublications: 'Publicaciones y Tesis',
    navProjects: 'Proyectos e Investigación',
    navExperience: 'Trayectoria Académica',
    techTitle: 'Stack y Métodos Principales',
    publicationsTitle: 'Publicaciones y Tesis de Licenciatura',
    projectsTitle: 'Proyectos e Investigación',
    experienceTitle: 'Educación e Investigación',
    searchPlaceholder: 'Filtrar por título, método o tag...',
    ongoingBadge: 'En Curso',
    publicationBadge: 'Publicación / Tesis',
    authorsPrefix: 'Autores:',
    copyBibtex: 'Copiar BibTeX',
    copiedBibtex: '¡BibTeX Copiado!',
    closeLightbox: 'Cerrar (Esc)',
    emptyResults: 'Ningún proyecto coincide con el filtro actual.',
    showingCount: (shown, total) => `Mostrando ${shown} de ${total}`,
  },
};

const SOCIAL_ICONS = {
  linkedin: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  github: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  orcid: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 9v7"/><circle cx="9" cy="6.5" r="0.8"/><path d="M12 9h2.5a2.5 2.5 0 0 1 0 5v2H12V9z"/></svg>`,
  email: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
};

const LINK_ICONS = {
  code: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  report: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  paper: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  doi: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  notebook: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  poster: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  doc: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
};

const state = {
  lang: localStorage.getItem('portfolio_lang') || 'en',
  theme: localStorage.getItem('portfolio_theme') || 'dark',
  category: 'all',
  search: '',
  profile: null,
  projects: [],
};

function t(obj) {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[state.lang] || obj.en || '';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString(state.lang === 'es' ? 'es-AR' : 'en-US', {
    year: 'numeric',
    month: 'short',
  });
}

function getCategoryLabel(catId) {
  if (!state.profile || !state.profile.categories) return catId;
  const match = state.profile.categories.find((c) => c.id === catId);
  return match ? t(match) : catId;
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.innerHTML =
      state.theme === 'dark'
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg><span>Light</span>`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg><span>Dark</span>`;
  }
}

function renderSidebar() {
  const p = state.profile;
  const ui = UI_TEXT[state.lang];

  document.getElementById('status-text').textContent = t(p.statusBadge);
  document.getElementById('lang-toggle-label').textContent = state.lang.toUpperCase();
  document.getElementById('profile-name').textContent = p.name;
  document.getElementById('profile-headline').textContent = t(p.headline);
  document.getElementById('profile-subheadline').textContent = t(p.subheadline);
  document.getElementById('profile-bio').textContent = t(p.bio);

  // Nav labels
  document.getElementById('nav-publications-label').textContent = ui.navPublications;
  document.getElementById('nav-projects-label').textContent = ui.navProjects;
  document.getElementById('nav-experience-label').textContent = ui.navExperience;

  // Tech Bento
  document.getElementById('tech-bento-title').textContent = ui.techTitle;
  const groupsContainer = document.getElementById('tech-bento-groups');
  groupsContainer.innerHTML = p.techBento
    .map(
      (g) => `
      <div>
        <div class="tech-bento__group-label">${t(g.group)}</div>
        <div class="tech-bento__pills">
          ${g.skills.map((s) => `<span class="tech-chip">${s}</span>`).join('')}
        </div>
      </div>`
    )
    .join('');

  // Socials
  const socialsContainer = document.getElementById('social-links');
  socialsContainer.innerHTML = p.socials
    .map(
      (s) => `
      <a href="${s.url}" class="social-pill" target="${s.id === 'email' ? '_self' : '_blank'}" rel="noopener noreferrer">
        ${SOCIAL_ICONS[s.id] || ''}
        <span>${s.label}</span>
      </a>`
    )
    .join('');
}

function renderCardHTML(project, forceFeatured = false) {
  const ui = UI_TEXT[state.lang];
  const isFeatured = forceFeatured || project.featured || project.status === 'ongoing';
  const visualHTML = renderProjectVisualHTML(project, state.lang);

  const statusBadgeHTML =
    project.status === 'ongoing'
      ? `<span class="badge badge--ongoing"><span class="status-dot"></span>${ui.ongoingBadge}</span>`
      : '';

  const pubBadgeHTML = project.isPublication
    ? `<span class="badge badge--publication">${ui.publicationBadge}</span>`
    : '';

  const authorsHTML =
    project.authors && project.authors.length > 0
      ? `<div class="card-authors"><strong>${ui.authorsPrefix}</strong> ${project.authors.join(', ')}</div>`
      : '';

  const techHTML = (project.techStack || [])
    .map((tag) => `<span class="tech-pill">${tag}</span>`)
    .join('');

  const linksHTML = (project.links || [])
    .map((l) => {
      const icon = LINK_ICONS[l.type] || LINK_ICONS.doc;
      return `
        <a href="${l.url}" class="action-link" target="_blank" rel="noopener noreferrer">
          ${icon}
          <span>${t(l.label)}</span>
        </a>`;
    })
    .join('');

  const bibtexBtnHTML = project.bibtex
    ? `<button type="button" class="action-link btn-bibtex" data-bibtex="${encodeURIComponent(project.bibtex)}">
         ${LINK_ICONS.paper}
         <span>${ui.copyBibtex}</span>
       </button>`
    : '';

  return `
    <article class="bento-card ${isFeatured ? 'bento-card--featured' : ''}" data-project-id="${project.id}">
      ${visualHTML}
      <div class="card-body">
        <div class="card-meta">
          <div class="card-badges">
            <span class="badge badge--category">${getCategoryLabel(project.category)}</span>
            ${statusBadgeHTML}
            ${pubBadgeHTML}
          </div>
          <time class="card-date">${formatDate(project.date)}</time>
        </div>
        <h3 class="card-title">${t(project.title)}</h3>
        <p class="card-desc">${t(project.description)}</p>
        ${authorsHTML}
        <div class="card-tech">${techHTML}</div>
        <div class="card-links">
          ${linksHTML}
          ${bibtexBtnHTML}
        </div>
      </div>
    </article>`;
}

function sortProjects(list) {
  return [...list].sort((a, b) => {
    if (a.status === 'ongoing' && b.status !== 'ongoing') return -1;
    if (b.status === 'ongoing' && a.status !== 'ongoing') return 1;
    return (b.date || '').localeCompare(a.date || '');
  });
}

function renderPublicationsSection() {
  const ui = UI_TEXT[state.lang];
  const pubSection = document.getElementById('publications');
  const navPubItem = document.getElementById('nav-publications-item');
  const pubs = sortProjects(state.projects.filter((p) => p.isPublication));

  if (pubs.length === 0) {
    pubSection.style.display = 'none';
    if (navPubItem) navPubItem.style.display = 'none';
    return;
  }

  pubSection.style.display = 'block';
  if (navPubItem) navPubItem.style.display = 'inline-flex';
  document.getElementById('publications-title').textContent = ui.publicationsTitle;
  document.getElementById('publications-count').textContent = `${pubs.length}`;
  document.getElementById('publications-grid').innerHTML = pubs
    .map((p) => renderCardHTML(p, true))
    .join('');
}

function renderFilterBar() {
  const ui = UI_TEXT[state.lang];
  const catsContainer = document.getElementById('category-pills');
  const searchInput = document.getElementById('project-search');
  searchInput.placeholder = ui.searchPlaceholder;

  catsContainer.innerHTML = (state.profile.categories || [])
    .map(
      (cat) => `
      <button type="button" class="cat-btn ${state.category === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        ${t(cat)}
      </button>`
    )
    .join('');

  catsContainer.querySelectorAll('.cat-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.category = btn.getAttribute('data-cat');
      renderFilterBar();
      renderProjectsGrid();
    });
  });
}

function renderProjectsGrid() {
  const ui = UI_TEXT[state.lang];
  document.getElementById('projects-title').textContent = ui.projectsTitle;

  const query = state.search.trim().toLowerCase();
  const sorted = sortProjects(state.projects);
  const filtered = sorted.filter((proj) => {
    const catMatch = state.category === 'all' || proj.category === state.category;
    if (!catMatch) return false;
    if (!query) return true;
    const haystack = [
      t(proj.title),
      t(proj.description),
      ...(proj.techStack || []),
      ...(proj.authors || []),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(query);
  });

  document.getElementById('projects-count').textContent = ui.showingCount(
    filtered.length,
    state.projects.length
  );

  const grid = document.getElementById('projects-grid');
  if (filtered.length === 0) {
    grid.innerHTML = `<p style="grid-column: span 2; color: var(--text-muted); font-family: var(--font-mono); padding: 2rem 0;">${ui.emptyResults}</p>`;
    return;
  }

  grid.innerHTML = filtered.map((p) => renderCardHTML(p, false)).join('');
  bindCardInteractions();
}

function renderTimelineSection() {
  const ui = UI_TEXT[state.lang];
  document.getElementById('experience-title').textContent = ui.experienceTitle;
  const container = document.getElementById('timeline-list');
  container.innerHTML = (state.profile.timeline || [])
    .map(
      (item) => `
      <div class="timeline-card">
        <div class="timeline-period">${t(item.period)}</div>
        <div>
          <h3 class="timeline-role">${t(item.role)}</h3>
          <div class="timeline-org">${item.organization}</div>
          <p class="timeline-desc">${t(item.description)}</p>
          <div class="timeline-badges">
            ${(item.badges || []).map((b) => `<span class="tech-chip">${b}</span>`).join('')}
          </div>
        </div>
      </div>`
    )
    .join('');
}

function bindCardInteractions() {
  const ui = UI_TEXT[state.lang];

  // Lightbox image click
  document.querySelectorAll('.card-visual--image').forEach((el) => {
    const openModal = () => {
      const src = el.getAttribute('data-lightbox-src');
      const caption = el.getAttribute('data-lightbox-caption');
      if (!src) return;
      const modal = document.getElementById('lightbox-modal');
      document.getElementById('lightbox-img').src = src;
      document.getElementById('lightbox-caption').textContent = caption || '';
      document.getElementById('lightbox-close').textContent = ui.closeLightbox;
      modal.classList.add('open');
    };
    el.onclick = openModal;
    el.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    };
  });

  // BibTeX copy
  document.querySelectorAll('.btn-bibtex').forEach((btn) => {
    btn.onclick = async () => {
      const raw = decodeURIComponent(btn.getAttribute('data-bibtex') || '');
      if (!raw) return;
      try {
        await navigator.clipboard.writeText(raw);
        const span = btn.querySelector('span');
        const prev = span.textContent;
        span.textContent = ui.copiedBibtex;
        setTimeout(() => {
          span.textContent = prev;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy BibTeX:', err);
      }
    };
  });
}

function renderAll() {
  applyTheme();
  renderSidebar();
  renderPublicationsSection();
  renderFilterBar();
  renderProjectsGrid();
  renderTimelineSection();
  bindCardInteractions();
}

function setupGlobalEvents() {
  // Mouse spotlight
  window.addEventListener('pointermove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // Language toggle
  document.getElementById('lang-toggle').addEventListener('click', () => {
    state.lang = state.lang === 'en' ? 'es' : 'en';
    localStorage.setItem('portfolio_lang', state.lang);
    document.documentElement.lang = state.lang;
    renderAll();
  });

  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio_theme', state.theme);
    applyTheme();
  });

  // Search box
  document.getElementById('project-search').addEventListener('input', (e) => {
    state.search = e.target.value;
    renderProjectsGrid();
  });

  // Lightbox close
  const modal = document.getElementById('lightbox-modal');
  document.getElementById('lightbox-close').addEventListener('click', () => {
    modal.classList.remove('open');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('open');
  });

  // Section scroll-spy
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.section-nav__link');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.25 }
  );
  sections.forEach((s) => observer.observe(s));
}

async function init() {
  try {
    const [profileRes, projectsRes] = await Promise.all([
      fetch('./data/profile.json'),
      fetch('./data/projects.json'),
    ]);
    state.profile = await profileRes.json();
    state.projects = await projectsRes.json();
    renderAll();
    setupGlobalEvents();
  } catch (err) {
    console.error('Error initializing portfolio:', err);
  }
}

init();
