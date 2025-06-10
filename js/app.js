
  // Navegación avanzada con animación y ARIA
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section.section');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      activateSection(item);
    });
    item.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateSection(item);
      }
    });
  });

  function activateSection(selectedItem) {
    // Remover clases activas
    navItems.forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });
    
    sections.forEach(sec => {
      sec.classList.remove('active');
      const afterElement = sec.querySelector('::after');
      if (afterElement) {
        afterElement.style.animation = 'none';
      }
    });

    // Activar nueva sección
    selectedItem.classList.add('active');
    selectedItem.setAttribute('aria-pressed', 'true');
    const targetSection = document.getElementById(selectedItem.dataset.target);
    
    if (targetSection) {
      targetSection.classList.add('active');
      
      // Si es la sección about, asegurar que el primer contenedor esté visible
      if (targetSection.id === 'about') {
        const aboutContainers = document.querySelectorAll('.about-container');
        aboutContainers.forEach(container => {
          container.classList.remove('active');
          container.style.opacity = '0';
          container.style.visibility = 'hidden';
        });
        
        const firstAboutContainer = document.getElementById('about1');
        if (firstAboutContainer) {
          firstAboutContainer.classList.add('active');
          firstAboutContainer.style.opacity = '1';
          firstAboutContainer.style.visibility = 'visible';
        }
        
        // Actualizar los dots de navegación
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === 0);
        });
      }
      
      // Forzar la animación
      const afterElement = targetSection.querySelector('::after');
      if (afterElement) {
        afterElement.style.animation = 'none';
        void afterElement.offsetWidth; // Forzar reflow
        afterElement.style.animation = 'sectionScan 1.5s ease-in-out';
      }
      
      targetSection.focus();
    }
  }

  // Fondo de partículas con canvas (sin librerías)
  const canvas = document.getElementById('backgroundCanvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.6 + 0.3;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if(this.x < 0 || this.x > width) this.speedX *= -1;
      if(this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = `rgba(0, 255, 231, ${this.alpha})`;
      ctx.shadowColor = 'rgba(0, 255, 231, 0.7)';
      ctx.shadowBlur = 6;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for(let i=0; i<100; i++) {
      particles.push(new Particle());
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  // Inicializar cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    // Asegurar que la sección about esté activa
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.classList.add('active');
      aboutSection.style.opacity = '1';
      aboutSection.style.visibility = 'visible';
    }
    
    // Asegurar que el primer contenedor de about esté activo
    const about1 = document.getElementById('about1');
    const about2 = document.getElementById('about2');
    const about3 = document.getElementById('about3');
    
    if (about1) {
      about1.classList.add('active');
      about1.style.opacity = '1';
      about1.style.visibility = 'visible';
    }
    if (about2) {
      about2.classList.remove('active');
      about2.style.opacity = '0';
      about2.style.visibility = 'hidden';
    }
    if (about3) {
      about3.classList.remove('active');
      about3.style.opacity = '0';
      about3.style.visibility = 'hidden';
    }
    
    updateSlides();
    
    // Activar el elemento de navegación "Sobre mí"
    const firstNavItem = document.querySelector('.nav-item[data-section="about"]');
    if (firstNavItem) {
      firstNavItem.classList.add('active');
    }

    // Inicializar partículas
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#00ffe7'
          },
          shape: {
            type: 'circle'
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#00ffe7',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5
              }
            },
            push: {
              particles_nb: 4
            }
          }
        },
        retina_detect: true
      });
    } else {
      console.error('particlesJS no está definido');
    }
  });

  // Navegación entre contenedores de About
  const aboutContainers = document.querySelectorAll('.about-container');
  const aboutDots = document.getElementById('aboutDots');
  let currentIndex = 0;

  // Crear dots de navegación
  aboutContainers.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'nav-dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(index));
    aboutDots.appendChild(dot);
  });

  function updateSlides() {
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.nav-dots');
    
    sections.forEach((section, index) => {
      const sectionDots = dots[index];
      if (!sectionDots) return;
      
      sectionDots.innerHTML = '';
      const containers = section.querySelectorAll('.about-container');
      
      containers.forEach((container, dotIndex) => {
        const dot = document.createElement('div');
        dot.classList.add('nav-dot');
        if (container.classList.contains('active')) {
          dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => {
          // Remover clase active de todos los contenedores
          containers.forEach(c => {
            c.classList.remove('active');
            c.classList.remove('next');
            c.classList.remove('prev');
            c.style.opacity = '0';
            c.style.visibility = 'hidden';
          });
          
          // Activar el contenedor seleccionado
          container.classList.add('active');
          container.style.opacity = '1';
          container.style.visibility = 'visible';
          
          // Actualizar clases next y prev para los demás contenedores
          containers.forEach((c, i) => {
            if (i < dotIndex) {
              c.classList.add('prev');
              c.style.opacity = '1';
              c.style.visibility = 'visible';
            } else if (i > dotIndex) {
              c.classList.add('next');
              c.style.opacity = '0';
              c.style.visibility = 'hidden';
            }
          });
          
          // Actualizar puntos de navegación
          sectionDots.querySelectorAll('.nav-dot').forEach((d, i) => {
            d.classList.toggle('active', i === dotIndex);
          });
        });
        
        sectionDots.appendChild(dot);
      });
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlides();
  }

  // Función para mostrar sección
  function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.add('active');
    }
  }

  // Función para copiar email
  function copyEmail(event) {
    event.preventDefault();
    const email = 'andres@example.com';
    navigator.clipboard.writeText(email).then(() => {
      const btn = event.currentTarget;
      const originalContent = btn.innerHTML;
      btn.innerHTML = '✅';
      btn.classList.add('copied');
      
      setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.classList.remove('copied');
      }, 2000);
    });
  }

  // Función para verificar si un elemento está visible en la pantalla
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Función para el efecto de máquina de escribir
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    let isTyping = false;
    
    function type() {
      if (i < text.length && isElementInViewport(element)) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (!isElementInViewport(element)) {
        isTyping = false;
      }
    }
    
    // Observador de intersección para reiniciar la animación cuando el elemento vuelve a ser visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isTyping) {
          isTyping = true;
          i = 0;
          element.innerHTML = '';
          type();
        }
      });
    });

    observer.observe(element);
  }

  // Función para el efecto de máquina de escribir de skills
  function typeWriterSkills(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    let isTyping = false;
    
    function type() {
      if (i < text.length && isElementInViewport(element)) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (!isElementInViewport(element)) {
        isTyping = false;
      }
    }
    
    // Observador de intersección para reiniciar la animación cuando el elemento vuelve a ser visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isTyping) {
          isTyping = true;
          i = 0;
          element.innerHTML = '';
          type();
        }
      });
    });

    observer.observe(element);
  }

  // Función para el efecto de máquina de escribir de skills2
  function typeWriterSkills2(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    let isTyping = false;
    
    function type() {
      if (i < text.length && isElementInViewport(element)) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (!isElementInViewport(element)) {
        isTyping = false;
      }
    }
    
    // Observador de intersección para reiniciar la animación cuando el elemento vuelve a ser visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isTyping) {
          isTyping = true;
          i = 0;
          element.innerHTML = '';
          type();
        }
      });
    });

    observer.observe(element);
  }

  // Función para el efecto de máquina de escribir de skills3
  function typeWriterSkills3(element, text, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    let isTyping = false;
    
    function type() {
      if (i < text.length && isElementInViewport(element)) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (!isElementInViewport(element)) {
        isTyping = false;
      }
    }
    
    // Observador de intersección para reiniciar la animación cuando el elemento vuelve a ser visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isTyping) {
          isTyping = true;
          i = 0;
          element.innerHTML = '';
          type();
        }
      });
    });

    observer.observe(element);
  }

  // Inicializar el efecto de máquina de escribir cuando el DOM esté cargado
  document.addEventListener('DOMContentLoaded', function() {
    // Efecto para el texto de skills
    const skillsText = "Desde apps web hasta visualizaciones interactivas, todo con pasión por el detalle y la innovación.";
    const skillsElement = document.getElementById('text-skills');
    typeWriterSkills(skillsElement, skillsText);

    // Efecto para el texto de skills2
    const skills2Text = "Un conjunto de tecnologías y herramientas que domino para crear experiencias digitales únicas.";
    const skills2Element = document.getElementById('text-skill2');
    typeWriterSkills2(skills2Element, skills2Text);

    // Efecto para el texto de skills3
    const skills3Text = "¿Tienes un proyecto en mente? ¡Hablemos! Estoy disponible para colaboraciones y oportunidades.";
    const skills3Element = document.getElementById('text-skill3');
    typeWriterSkills3(skills3Element, skills3Text);

    // Efecto para el slogan
    const sloganText = "Soy quien te ayuda a darle vida a ese proyecto que tienes en mente, un gusto.";
    const sloganElement = document.querySelector('.slogan');
    typeWriter(sloganElement, sloganText);
  });

  // Función para mostrar el modal
  function showModal() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.add('active');
    
    // Cerrar modal al hacer clic en el botón de cerrar
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Modificar el evento submit del formulario
  document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    showModal();
    this.reset();
  });

  // Agregar event listener para el primer elemento del navbar
  document.addEventListener('DOMContentLoaded', function() {
    const firstNavItem = document.getElementById('first_elemento_navbar');
    const aboutContainer = document.querySelector('.about-container');
    const aboutSection = document.getElementById('about1');

    if (firstNavItem) {
      firstNavItem.addEventListener('click', function() {
        // Remover clase active de todas las secciones
        document.querySelectorAll('.section').forEach(section => {
          section.classList.remove('active');
        });

        // Remover clase active de todos los elementos del navbar
        document.querySelectorAll('.nav-item').forEach(item => {
          item.classList.remove('active');
        });

        // Activar el contenedor about y la sección
        if (aboutContainer) {
          aboutContainer.classList.add('active');
          aboutContainer.style.visibility = 'visible';
          aboutContainer.style.opacity = '1';
        }

        if (aboutSection) {
          aboutSection.style.visibility = 'visible';
          aboutSection.style.opacity = '1';
        }

        // Activar el elemento del navbar
        this.classList.add('active');
      });
    }
  });

  // Función para copiar email
  document.querySelector('.copy-email-btn').addEventListener('click', function() {
    const email = 'erazoandres14@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const message = this.parentElement.querySelector('.copy-message');
      message.classList.add('show');
      
      // Remover la clase después de 2 segundos
      setTimeout(() => {
        message.classList.remove('show');
      }, 2000);
    });
  });

  // Función para manejar la navegación con los puntos
  function handleDotNavigation(targetId) {
    // Remover clase active de todas las secciones
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });

    // Remover clase active de todos los puntos
    document.querySelectorAll('.nav-dot').forEach(dot => {
      dot.classList.remove('active');
    });

    // Activar la sección objetivo
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add('active');
      // Activar el punto correspondiente
      const correspondingDot = document.querySelector(`.nav-dot[data-target="${targetId}"]`);
      if (correspondingDot) {
        correspondingDot.classList.add('active');
      }
    }
  }

  // Agregar event listeners a los puntos de navegación
  document.querySelectorAll('.nav-dot').forEach(dot => {
    dot.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      handleDotNavigation(targetId);
    });
  });

  // Observador de intersección para actualizar los puntos activos
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        handleDotNavigation(sectionId);
      }
    });
  }, {
    threshold: 0.5
  });

  // Observar todas las secciones
  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });

  // Inicializar la navegación al cargar la página
  document.addEventListener('DOMContentLoaded', function() {
    // Activar la primera sección por defecto
    handleDotNavigation('about');
  });

  // Código del carrusel
  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalClose = document.getElementById('modalClose');
    let currentSlide = 0;
    let carouselInterval;

    // Funcionalidad del modal
    slides.forEach(slide => {
      const img = slide.querySelector('img');
      img.addEventListener('click', () => {
        modal.classList.add('active');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        document.body.style.overflow = 'hidden';
      });
    });

    // Cerrar modal con el botón X
    if (modalClose) {
      modalClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
      });
    });

    // Función para iniciar el auto-avance
    function startCarousel() {
      carouselInterval = setInterval(nextSlide, 5000);
    }

    // Función para detener el auto-avance
    function stopCarousel() {
      clearInterval(carouselInterval);
    }

    // Pausar el carrusel cuando el mouse está sobre él
    carousel.addEventListener('mouseenter', stopCarousel);
    carousel.addEventListener('mouseleave', startCarousel);

    // Iniciar el carrusel
    startCarousel();
  });

