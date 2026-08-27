(() => {
  const PROJECTS = {
    freelance: {
      label: 'фриланс',
      title: 'Freelance',
      role: 'Motion Design',
      period: '2018 — н.в.',
      desc: 'Motion Design полного цикла — от сценария до финального монтажа, саунд-дизайна и цветокора. Анимация типографики, иконок, иллюстраций и UI-элементов. Performance-креативы для Tier-1 рынков (США, Европа, Азия) — Instagram, TikTok, Facebook, Google.',
      mediaCount: 3,
    },
    glam: {
      label: 'ai-дизайн',
      title: 'Glam app',
      role: 'Lead Motion Designer / AI Artist',
      period: '2023 — 2024',
      desc: 'Руководил командой контента (5 моушн/графических дизайнеров + 5–7 аутсорс). Выстроил производственную структуру — 50+ креативов в неделю. Вместе с командой привели в приложение более 1 млн пользователей.',
      media: ['glam_1.mp4', 'glam_2.mp4'],
    },
    prequel: {
      label: 'реклама',
      title: 'Prequel app',
      role: 'Marketing Motion Designer',
      period: '2021 — 2023',
      desc: 'Рекламные креативы для Instagram, TikTok, Facebook и Google Ads. Разработал более 30 креативов, масштабированных с бюджетом от $10k за видео. Стабильно выпускал 3–6 рекламных паков в неделю без потери качества.',
      mediaCount: 3,
    },
    other: {
      label: 'проект',
      title: 'Other',
      role: '—',
      period: '—',
      desc: 'Заглушка — замените на название, роль и описание ещё одного проекта.',
      media: ['Other_1.mp4', 'Other_2.mp4', 'Other_3.mp4', 'Other_4.mp4', 'Other_5.mp4'],
    },
    denim: {
      label: 'проект',
      title: '495 Denim',
      role: '—',
      period: '—',
      desc: 'Заглушка — замените на роль, период и описание проекта 495 Denim.',
      media: ['495_01.mp4', '495_02.mp4', '495_03.mp4', '495_04.mp4', '495_05.mp4', '495_06.mp4', '495_07.mp4', '495_08.mp4'],
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
    document.documentElement.classList.add('has-custom-cursor');
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

  /* ---------- Hover-to-play shape animations ----------
     Each source video packs two stacked frames per shape: plain RGB
     color on top, a grayscale alpha mask on the bottom (baked in with
     ffmpeg, since no single video codec reliably decodes real alpha
     everywhere). On every video frame we redraw both halves onto a
     canvas and copy the mask's luminance into the color frame's alpha
     channel, giving true per-pixel transparency independent of the
     page background. */
  document.querySelectorAll('.proj-item').forEach((card) => {
    const canvas = card.querySelector('.shape-vid');
    const video = card.querySelector('.shape-src');
    if (!canvas || !video) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    let scheduled = null;

    const scheduleNext = () => {
      if (video.requestVideoFrameCallback) {
        scheduled = video.requestVideoFrameCallback(drawFrame);
      } else {
        scheduled = requestAnimationFrame(drawFrame);
      }
    };

    function drawFrame() {
      if (video.paused || video.ended) return;
      ctx.drawImage(video, 0, 0, w, h, 0, 0, w, h);
      const frame = ctx.getImageData(0, 0, w, h);
      ctx.drawImage(video, 0, h, w, h, 0, 0, w, h);
      const mask = ctx.getImageData(0, 0, w, h).data;
      const data = frame.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i + 3] = mask[i];
      }
      ctx.putImageData(frame, 0, 0);
      scheduleNext();
    }

    const play = () => {
      video.currentTime = 0;
      video.play().then(scheduleNext).catch(() => {});
    };
    const stop = () => {
      video.pause();
      video.currentTime = 0;
      if (scheduled) {
        if (video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(scheduled);
        else cancelAnimationFrame(scheduled);
        scheduled = null;
      }
      ctx.clearRect(0, 0, w, h);
    };
    card.addEventListener('mouseenter', play);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('focus', play);
    card.addEventListener('blur', stop);
  });

  /* ---------- Project modal ---------- */
  const page = document.querySelector('.page');
  const overlay = document.getElementById('modalOverlay');
  const modal = overlay.querySelector('.modal');
  const modalScroll = document.getElementById('modalScroll');
  const modalClose = document.getElementById('modalClose');
  const modalLabel = document.getElementById('modalLabel');
  const modalTitle = document.getElementById('modalTitle');
  const modalRole = document.getElementById('modalRole');
  const modalPeriod = document.getElementById('modalPeriod');
  const modalDesc = document.getElementById('modalDesc');
  const modalMedia = document.getElementById('modalMedia');

  let lastFocused = null;

  const updateScrollHint = () => {
    const hasMore = modalScroll.scrollHeight - modalScroll.scrollTop - modalScroll.clientHeight > 4;
    modal.classList.toggle('modal--scrollable', hasMore);
  };
  modalScroll.addEventListener('scroll', updateScrollHint);
  window.addEventListener('resize', () => {
    if (overlay.classList.contains('is-open')) updateScrollHint();
  });

  const getFocusable = () =>
    Array.from(modal.querySelectorAll('button, a[href], video, [tabindex]:not([tabindex="-1"])'))
      .filter((el) => !el.disabled && el.offsetParent !== null);

  const trapFocus = (e) => {
    if (e.key !== 'Tab' || !overlay.classList.contains('is-open')) return;
    const focusable = getFocusable();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const openModal = (key) => {
    const p = PROJECTS[key];
    if (!p) return;
    modalLabel.textContent = p.label;
    modalTitle.textContent = p.title;
    modalRole.textContent = p.role;
    modalPeriod.textContent = p.period;
    modalDesc.textContent = p.desc;
    modalMedia.innerHTML = '';
    const media = p.media || [];
    const count = media.length || p.mediaCount || 3;
    for (let i = 0; i < count; i += 1) {
      const file = media[i];
      const slot = document.createElement('div');
      if (file) {
        slot.className = 'media-slot media-slot--video';
        const video = document.createElement('video');
        video.src = `assets/vids/${file}`;
        video.poster = `assets/vids/posters/${file.replace(/\.mp4$/, '.jpg')}`;
        video.controls = true;
        video.preload = 'metadata';
        video.playsInline = true;
        slot.appendChild(video);
      } else {
        slot.className = 'media-slot';
        const label = document.createElement('span');
        label.textContent = `Видео ${i + 1}`;
        slot.appendChild(label);
      }
      modalMedia.appendChild(slot);
    }
    modalScroll.scrollTop = 0;
    lastFocused = document.activeElement;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    page.inert = true;
    modalClose.focus();
    updateScrollHint();
  };

  const closeModal = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    page.inert = false;
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll('.proj-item').forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.project));
  });
  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
    trapFocus(e);
  });
})();
