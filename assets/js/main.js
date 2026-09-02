document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('mobile-open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('mobile-open');
        toggle.classList.remove('open');
      });
    });
  }

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10 ? '0 10px 30px -18px rgba(0,0,0,0.5)' : 'none';
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Contact form -> WhatsApp handoff
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var propertyType = form.querySelector('#property-type');
      var city = form.querySelector('#city');
      var message = form.querySelector('#message').value.trim();

      var lines = ['السلام عليكم، معي طلب خدمة جديد من موقع قصر الإنجاز:'];
      if (name) lines.push('الاسم: ' + name);
      if (phone) lines.push('الجوال: ' + phone);
      if (propertyType && propertyType.value) lines.push('نوع العقار: ' + propertyType.options[propertyType.selectedIndex].text);
      if (city && city.value) lines.push('المدينة: ' + city.value);
      if (message) lines.push('التفاصيل: ' + message);

      var text = encodeURIComponent(lines.join('\n'));
      window.open('https://wa.me/966581113322?text=' + text, '_blank');
    });
  }
});
