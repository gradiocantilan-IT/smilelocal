// Optional smooth swipe "inertia"
const wrapper = document.querySelector('.icon-wrapper');

let startX = 0;
let scrollLeft = 0;
let isDown = false;

wrapper.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
});
wrapper.addEventListener('mouseleave', () => { isDown = false; });
wrapper.addEventListener('mouseup', () => { isDown = false; });
wrapper.addEventListener('mousemove', e => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 2; // scroll speed
  wrapper.scrollLeft = scrollLeft - walk;
});

// Mobile touch gestures
let touchStartX = 0;
wrapper.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
});
wrapper.addEventListener('touchend', e => {
  let touchEndX = e.changedTouches[0].clientX;
  if (touchEndX - touchStartX > 50) {
    wrapper.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
  } else if (touchStartX - touchEndX > 50) {
    wrapper.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
  }
});
