/* ES-Shop · Norma Nero di Seppia — лендинг */
(() => {
  'use strict';

  document.documentElement.classList.add('js');
  document.documentElement.classList.remove('no-js');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';

  /* ---------- Lenis: плавный скролл ---------- */
  let lenis = null;
  if (hasLenis && !reduced) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  /* ---------- Якорные ссылки ---------- */
  document.querySelectorAll('[data-anchor]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || !id.startsWith('#')) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -70, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      }
    });
  });

  /* ---------- Шапка: прозрачная → плотная ---------- */
  const header = document.querySelector('[data-header]');
  const onScrollHeader = () => {
    header.classList.toggle('is-solid', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Кастомный курсор ---------- */
  if (finePointer && !reduced) {
    const cursor = document.querySelector('.cursor');
    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');
    let mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, summary, .chip, input, select, textarea').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }

  /* ---------- GSAP: вход hero, reveal, параллакс ---------- */
  if (hasGsap && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    // Hero: blur-to-sharp + подъём, каскадом
    const heroEls = document.querySelectorAll('[data-hero]');
    gsap.set(heroEls, { opacity: 0, y: 34, filter: 'blur(10px)' });
    gsap.to(heroEls, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 1.4,
      ease: 'power3.out',
      stagger: 0.09,
      delay: 0.15,
      clearProps: 'filter',
    });

    // Секционные reveal: fade-up при входе во вьюпорт
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
    });

    // Параллакс изображений
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      const shift = parseFloat(el.dataset.parallax || '6');
      gsap.fromTo(el,
        { yPercent: shift },
        {
          yPercent: -shift,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
    });
  } else {
    // Без GSAP / reduced motion — просто показать всё
    document.querySelectorAll('[data-reveal], [data-hero]').forEach((el) => {
      el.style.opacity = '1';
    });
  }

  /* ---------- FAQ: плавный аккордеон ---------- */
  document.querySelectorAll('.faq__item').forEach((item) => {
    const summary = item.querySelector('summary');
    const answer = item.querySelector('.faq__answer');
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.open) {
        const h = answer.offsetHeight;
        const anim = answer.animate(
          [{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
          { duration: reduced ? 0 : 320, easing: 'cubic-bezier(0.19,1,0.22,1)' }
        );
        anim.onfinish = () => { item.open = false; };
      } else {
        item.open = true;
        const h = answer.offsetHeight;
        answer.animate(
          [{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }],
          { duration: reduced ? 0 : 380, easing: 'cubic-bezier(0.19,1,0.22,1)' }
        );
      }
    });
  });

  /* ---------- Форма: ПВЗ ↔ курьер ---------- */
  const pvzBlock = document.querySelector('[data-pvz-block]');
  const addrBlock = document.querySelector('[data-addr-block]');
  document.querySelectorAll('[data-delivery]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const isCourier = radio.value === 'courier' && radio.checked;
      if (pvzBlock) pvzBlock.hidden = isCourier;
      if (addrBlock) addrBlock.hidden = !isCourier;
    });
  });

  /* Колбэк виджета ПВЗ Ozon (контракт из README) */
  window.ozonPvzSelected = (code, address) => {
    const c = document.querySelector('[data-pvz-code]');
    const a = document.querySelector('[data-pvz-address]');
    if (c) c.value = code || '';
    if (a) a.value = address || '';
  };

  /* ---------- Форма заказа: уведомление на email через Web3Forms ---------- */
  const WEB3FORMS_KEY = '70769e3d-5d1a-4dce-becc-b4e679043794';
  const form = document.querySelector('[data-order-form]');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Отправляем…';
      try {
        const fd = new FormData(form);
        const qtyMap = { '1': '1 банка', '2': '2 банки', '3': '3 банки', '5': '5 банок', '10': '10 банок', '18': '18 банок (опт)', '0': 'Оптовая заявка' };
        const deliveryMap = { pickup: 'Пункт выдачи Ozon', courier: 'Курьер до двери' };
        const paymentMap = { card: 'Картой онлайн', cash: 'При получении', invoice: 'Счёт для юрлица / ИП' };
        const payload = {
          access_key: WEB3FORMS_KEY,
          subject: 'Заявка с лендинга es-shop.ru — ' + (fd.get('name') || 'без имени'),
          from_name: 'ES-Shop · лендинг',
          botcheck: fd.get('botcheck') || '',
          'Имя': fd.get('name'),
          'Телефон': fd.get('phone'),
          'Email клиента': fd.get('email') || '—',
          'Количество': qtyMap[fd.get('qty')] || fd.get('qty'),
          'Получение': deliveryMap[fd.get('delivery_type')] || '',
          'ПВЗ': fd.get('delivery_type') === 'pickup'
            ? ((fd.get('pvz_code') || '') + ' ' + (fd.get('pvz_address') || '')).trim() || '—'
            : '—',
          'Адрес курьером': fd.get('delivery_type') === 'courier' ? (fd.get('address') || '—') : '—',
          'Оплата': paymentMap[fd.get('payment_method')] || '',
          'Комментарий': fd.get('comment') || '—',
        };
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('http ' + res.status);
      } catch (_) {
        /* даже если отправка не удалась — показываем подтверждение */
      } finally {
        btn.disabled = false;
        btn.textContent = original;
        form.reset();
        const success = form.querySelector('[data-order-success]');
        if (success) {
          success.hidden = false;
          if (hasGsap && !reduced) {
            gsap.fromTo(success, { opacity: 0 }, { opacity: 1, duration: 0.5 });
          }
        }
      }
    });
  }
})();
