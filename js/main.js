(() => {
  const PROJECTS = {
    freelance: {
      label: 'freelance',
      title: 'Freelance',
      role: 'Motion Design',
      period: '2018 — Present',
      desc: [
        'Full-cycle motion design — script to final edit, sound design, color grade',
        'Typography, icon, illustration & UI animation',
        'Performance creatives for Tier-1 markets (US, Europe, Asia) — Instagram, TikTok, Facebook, Google',
      ],
      media: ['freelance_1.mp4', 'freelance_4.mp4', 'freelance_5.mp4'],
      mediaCount: 9,
      mediaColumns: 3,
    },
    glam: {
      label: 'ai design',
      title: 'Glam app',
      role: 'Lead Motion Designer / AI Artist',
      period: '2023 — 2024',
      desc: [
        'Led a content team of 5 designers + 5–7 outsource creators',
        'Built a production pipeline delivering 50+ creatives a week',
        'Tested new AI tools and helped integrate them into the product',
        'Helped grow the app to 1M+ users',
      ],
      media: ['glam_1.mp4', 'glam_2.mp4'],
      mediaCount: 9,
      mediaColumns: 3,
    },
    prequel: {
      label: 'advertising',
      title: 'Prequel app',
      role: 'Marketing Motion Designer',
      period: '2021 — 2023',
      desc: [
        'Ad creatives for Instagram, TikTok, Facebook & Google Ads',
        'Trend research and new creative concepts from scratch',
        'Close collaboration with product & analytics teams, A/B testing',
        '30+ creatives shipped, scaled with budgets from $10k/video',
        'Steady output of 3–6 ad packs a week, zero missed deadlines',
      ],
      media: ['prequel_01.mp4', 'prequel_02.mp4', 'prequel_03.mp4', 'prequel_04.mp4', 'prequel_05.mp4', 'prequel_06.mp4'],
      mediaCount: 9,
      mediaPlaceholder: 'NDA',
      mediaColumns: 3,
    },
    other: {
      label: 'showcase',
      title: 'AI Generations',
      role: 'Generative AI',
      period: 'Various projects',
      desc: [
        'A curated set of AI-generated visuals and clips',
        'Pulled from several client projects — names withheld under NDA',
        'Made with Midjourney, Kling, Seedance, Nano Banana & other AI tools',
      ],
      media: [
        'Other_1.mp4', 'Other_2.mp4', 'Other_3.mp4',
        'ai_01.mp4', 'ai_02.mp4', 'ai_03.mp4', 'ai_04.mp4', 'ai_05.mp4',
      ],
      mediaCount: 9,
      mediaColumns: 3,
    },
    denim: {
      label: 'content',
      title: '495 Denim',
      role: 'Content Creator',
      period: '',
      desc: [
        'Motion & graphic design — ad creatives and content for IG, TikTok, FB, Google Ads',
        'Print/apparel visuals and packaging concepts',
        'Seasonal concept planning and photo retouching',
        'Audience, competitor & trend analysis with monthly reporting',
        'Sourced UGC creators, wrote briefs and reviewed delivery',
      ],
      media: ['495_01.mp4', '495_02.mp4', '495_03.mp4', '495_04.mp4', '495_05.mp4', '495_06.mp4', '495_07.mp4', '495_08.mp4', '495_09.mp4'],
      mediaCount: 9,
      mediaColumns: 3,
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

  /* ---------- Live local-time clock (top nav) ---------- */
  const clockEl = document.getElementById('clock');
  if (clockEl) {
    const tzAbbr = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
      .formatToParts(new Date())
      .find((p) => p.type === 'timeZoneName')?.value || '';
    const tick = () => {
      const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      clockEl.textContent = tzAbbr ? `${tzAbbr} ${time}` : time;
    };
    tick();
    setInterval(tick, 15000);
  }

  /* ---------- Project list -> center preview (fine pointers only) ----------
     Hovering/focusing a row in the left-hand project list swaps the shared
     preview <video>/<img> pair to that project's first real clip and plays
     it muted+looping; the row stays "active" (bold, meta updated) after the
     pointer leaves rather than reverting, so the panel always reflects the
     last-viewed project. Touch devices skip this entirely - each row shows
     its own static thumbnail instead (see .proj-row-thumb, CSS mobile
     breakpoint), consistent with how hover-only motion is already handled
     elsewhere on this site. */
  const projRows = Array.from(document.querySelectorAll('.proj-row'));
  const previewFrame = document.getElementById('previewFrame');
  const previewPoster = document.getElementById('previewPoster');
  const previewVideo = document.getElementById('previewVideo');
  const previewRole = document.getElementById('previewRole');
  const previewMeta = document.getElementById('previewMeta');
  const footerCount = document.getElementById('footerCount');
  const rowKeys = projRows.map((row) => row.dataset.project);

  const setActive = (key) => {
    const p = PROJECTS[key];
    if (!p) return;
    const firstMedia = (p.media && p.media[0]) || null;
    projRows.forEach((row) => row.classList.toggle('is-active', row.dataset.project === key));
    if (previewRole) previewRole.textContent = p.role;
    if (previewMeta) previewMeta.textContent = p.period || p.label;
    if (footerCount) {
      const idx = rowKeys.indexOf(key) + 1;
      footerCount.textContent = `${String(idx).padStart(2, '0')} / ${String(rowKeys.length).padStart(2, '0')}`;
    }
    if (firstMedia && previewPoster) {
      previewPoster.src = `assets/vids/posters/${firstMedia.replace(/\.mp4$/, '.jpg')}`;
    }
    if (firstMedia && previewVideo && previewVideo.dataset.src !== firstMedia) {
      previewVideo.pause();
      previewFrame.classList.remove('is-playing');
      previewVideo.dataset.src = firstMedia;
      previewVideo.src = `assets/vids/${firstMedia}`;
      previewVideo.load();
    }
  };

  if (isFinePointer && projRows.length) {
    const playPreview = (key) => {
      setActive(key);
      previewVideo.currentTime = 0;
      previewVideo.play().then(() => previewFrame.classList.add('is-playing')).catch(() => {});
    };
    const stopPreview = () => {
      previewVideo.pause();
      previewFrame.classList.remove('is-playing');
    };
    projRows.forEach((row) => {
      const key = row.dataset.project;
      row.addEventListener('mouseenter', () => playPreview(key));
      row.addEventListener('mouseleave', stopPreview);
      row.addEventListener('focus', () => playPreview(key));
      row.addEventListener('blur', stopPreview);
    });
    setActive(rowKeys[0]);
  } else if (projRows.length) {
    setActive(rowKeys[0]);
  }

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
    modalPeriod.textContent = p.period || '';
    modalPeriod.style.display = p.period ? '' : 'none';
    modalDesc.innerHTML = '';
    const descList = document.createElement('ul');
    descList.className = 'modal-desc-list';
    (Array.isArray(p.desc) ? p.desc : [p.desc]).forEach((line) => {
      const li = document.createElement('li');
      li.textContent = line;
      descList.appendChild(li);
    });
    modalDesc.appendChild(descList);
    modalMedia.innerHTML = '';
    modalMedia.classList.toggle('modal-media--fixed3', p.mediaColumns === 3);
    const media = p.media || [];
    const count = Math.max(media.length, p.mediaCount || 0) || 3;
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
        label.textContent = p.mediaPlaceholder || `Video ${i + 1}`;
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

  projRows.forEach((row) => {
    row.addEventListener('click', () => openModal(row.dataset.project));
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
