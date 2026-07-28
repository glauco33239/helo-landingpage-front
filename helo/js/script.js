/* 
==========================================================================
HÉLO — Script principal
========================================================================== 
*/

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initAOS();
  initHeaderScroll();
  initMobileMenu();
  initSmoothNavClose();
  initContactForm();
  initNewsletterForm();
});

/* ---- Ícones Lucide ---- */
function initIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

/* ---- AOS (Animate On Scroll) ---- */
function initAOS() {
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }
}

/* ---- Header muda de fundo ao rolar a página ---- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const toggleHeaderState = () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  toggleHeaderState();
  window.addEventListener('scroll', toggleHeaderState, { passive: true });
}

/* ---- Menu hamburguer responsivo ---- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    body.style.overflow = isOpen ? 'hidden' : '';
  });
}

/* ---- Fecha o menu mobile ao clicar em um link ---- */
function initSmoothNavClose() {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  if (!navMenu || !hamburger) return;

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Formulário de contato ---- */
function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const successMsg = form.querySelector(".form-success");

  // Inicializa o EmailJS
  emailjs.init({
    publicKey: "KeMeQmQ_nERIkysJP",
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    emailjs.sendForm(
      "service_lcfkxtx", //service ID
      "template_60hmc88", //template ID
      form
    )
    .then(() => {
      console.log("Mensagem enviada!");

      if (successMsg) {
        successMsg.classList.add("is-visible");

        setTimeout(() => {
          successMsg.classList.remove("is-visible");
        }, 5000);
      }

      form.reset();
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Não foi possível enviar a mensagem.");
    });
  });
}

/* ---- Newsletter no rodapé ---- */
function initNewsletterForm() {
  const form = document.querySelector('#newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && input.value) {
      input.value = '';
      input.placeholder = 'Inscrito com sucesso! 💜';
      setTimeout(() => {
        input.placeholder = 'Seu e-mail';
      }, 4000);
    }
  });
}


