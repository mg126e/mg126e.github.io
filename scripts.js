// scripts.js - minimal interactivity for portfolio
(function(){
  'use strict';
  const root = document.documentElement;

  // Mobile nav toggle
  function initNavToggle(){
    const btn = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    if(!btn || !nav) return;
    btn.addEventListener('click',()=>{
      const shown = nav.style.display === 'flex';
      nav.style.display = shown ? '' : 'flex';
    });
  }

  // Project modal
  function initModals(){
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <button class="close" aria-label="Close">✕</button>
        <div class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    const body = overlay.querySelector('.modal-body');
    const closeBtn = overlay.querySelector('.close');

    function open(data){
      body.innerHTML = `
        <h3>${escapeHtml(data.title)}</h3>
        <p style="color:var(--muted)">${escapeHtml(data.description||'')}</p>
        ${data.screenshot? `<img src="${escapeAttr(data.screenshot)}" alt="${escapeAttr(data.title)}" style="width:100%;border-radius:8px;margin-top:0.8rem">` : ''}
        <p style="margin-top:0.8rem"><a href="${escapeAttr(data.link||'#')}" target="_blank" class="btn">View Project</a></p>
      `;
      overlay.classList.add('open');
      overlay.querySelector('.modal').focus?.();
    }

    function close(){
      overlay.classList.remove('open');
    }

    overlay.addEventListener('click',(e)=>{ if(e.target===overlay) close(); });
    closeBtn.addEventListener('click',close);
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') close(); });

    // wire up cards
    document.addEventListener('click',(e)=>{
      const card = e.target.closest('.card[data-project]');
      if(!card) return;
      const data = {
        title: card.dataset.title || 'Project',
        description: card.dataset.description || '',
        link: card.dataset.link || '#',
        screenshot: card.dataset.screenshot || ''
      };
      open(data);
    });
  }

  // Simple contact form validation
  function initFormValidation(){
    const form = document.querySelector('form[data-contact]');
    if(!form) return;
    form.addEventListener('submit',(e)=>{
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');
      let ok = true;
      [name,email,message].forEach(inp=>{
        if(!inp) return;
        inp.style.outline = '';
        if(!inp.value.trim()){
          inp.style.outline = '2px solid rgba(255,0,0,0.12)';
          ok = false;
        }
      });
      if(!ok){ e.preventDefault(); alert('Please fill in all fields.'); }
    });
  }

  // Utility: escape HTML to avoid injection when injecting content
  function escapeHtml(str){
    if(!str) return '';
    return String(str).replace(/[&<>"']/g, function(ch){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[ch];
    });
  }
  function escapeAttr(s){ return encodeURI(String(s||'')); }

  // Smooth scroll for anchor links
  function initSmoothScroll(){
    document.addEventListener('click',(e)=>{
      const a = e.target.closest('a[href^="#"]');
      if(!a) return;
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  }

  // Init all
  document.addEventListener('DOMContentLoaded',()=>{
    initNavToggle();
    initModals();
    initFormValidation();
    initSmoothScroll();
  });
})();
