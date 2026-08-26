(() => {
  const PROJECTS = {
    freelance: {
      label: 'фриланс',
      title: 'Freelance',
      role: 'Motion Design',
      period: '2018 — н.в.',
      desc: 'Motion Design полного цикла — от сценария до финального монтажа, саунд-дизайна и цветокора. Анимация типографики, иконок, иллюстраций и UI-элементов. Performance-креативы для Tier-1 рынков (США, Европа, Азия) — Instagram, TikTok, Facebook, Google.',
    },
    glam: {
      label: 'ai-дизайн',
      title: 'Glam app',
      role: 'Lead Motion Designer / AI Artist',
      period: '2023 — 2024',
      desc: 'Руководил командой контента (5 моушн/графических дизайнеров + 5–7 аутсорс). Выстроил производственную структуру — 50+ креативов в неделю. Вместе с командой привели в приложение более 1 млн пользователей.',
    },
    prequel: {
      label: 'реклама',
      title: 'Prequel app',
      role: 'Marketing Motion Designer',
      period: '2021 — 2023',
      desc: 'Рекламные креативы для Instagram, TikTok, Facebook и Google Ads. Разработал более 30 креативов, масштабированных с бюджетом от $10k за видео. Стабильно выпускал 3–6 рекламных паков в неделю без потери качества.',
    },
    bbk: {
      label: 'broadcast',
      title: 'BBK Group',
      role: 'Broadcast Designer',
      period: '2020 — 2021',
      desc: 'Оперативная графика для ТВ.',
    },
  };

  /* ---------- Fade-in on load ---------- */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.fade-in').forEach((el) => el.classList.add('is-visible'));
    });
  });

  /* ---------- Custom cursor (pointer devices only) ---------- */
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cursorDot = document.getElementById('cursorDot');

  if (isFinePointer && cursorDot) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      cursorDot.classList.add('is-active');
    });
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('is-hover'));
    });
    document.addEventListener('mouseleave', () => cursorDot.classList.remove('is-active'));
  }

  /* ---------- Project modal ---------- */
  const overlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalLabel = document.getElementById('modalLabel');
  const modalTitle = document.getElementById('modalTitle');
  const modalRole = document.getElementById('modalRole');
  const modalPeriod = document.getElementById('modalPeriod');
  const modalDesc = document.getElementById('modalDesc');
  const modalMedia = document.getElementById('modalMedia');

  let lastFocused = null;

  const openModal = (key) => {
    const p = PROJECTS[key];
    if (!p) return;
    modalLabel.textContent = p.label;
    modalTitle.textContent = p.title;
    modalRole.textContent = p.role;
    modalPeriod.textContent = p.period;
    modalDesc.textContent = p.desc;
    modalMedia.innerHTML = '';
    for (let i = 0; i < 3; i += 1) {
      const slot = document.createElement('div');
      slot.className = 'media-slot';
      slot.textContent = 'Пример работы';
      modalMedia.appendChild(slot);
    }
    lastFocused = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    modalClose.focus();
  };

  const closeModal = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll('.proj-card').forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.project));
  });
  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  });
})();
