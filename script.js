// ============================================================
//  SITE THIAGO PEIXOTO — interações do mockup (visual)
// ============================================================
(function () {
  'use strict';

  // ---- Menu mobile ----
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Fecha o menu ao clicar em um link (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Formulário de contato (mockup: sem backend) ----
  var form = document.getElementById('contatoForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = (document.getElementById('nome') || {}).value || '';
      nome = nome.trim();
      var primeiro = nome ? nome.split(' ')[0] : '';
      alert(
        (primeiro ? primeiro + ', s' : 'S') +
        'ua mensagem foi enviada com sucesso!\n\n(Demonstração — este formulário é apenas visual.)'
      );
      form.reset();
    });
  }
})();
