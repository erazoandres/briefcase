// Selección de elementos
const navItems = document.querySelectorAll('.sidebar ul li');
const sections = document.querySelectorAll('.section');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    // Quitar clase active en navItems
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    const sectionId = item.getAttribute('data-section');

    // Mostrar la sección correspondiente y ocultar las demás
    sections.forEach(sec => {
      if (sec.id === sectionId) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });
  });
});
