// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Visualizer bars — random rhythm
document.querySelectorAll('.visualizer span').forEach(bar => {
  bar.style.animationDuration = (0.6 + Math.random() * 0.9).toFixed(2) + 's';
  bar.style.animationDelay = (-Math.random()).toFixed(2) + 's';
});

const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// Real audio playback
const audio = new Audio();
let currentBtn = null;
document.querySelectorAll('.play').forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.dataset.src;
    if (currentBtn === btn && !audio.paused) {
      audio.pause();
      btn.textContent = '▶';
      btn.classList.remove('playing');
      return;
    }
    if (currentBtn && currentBtn !== btn) {
      currentBtn.textContent = '▶';
      currentBtn.classList.remove('playing');
    }
    if (audio.src.indexOf(encodeURIComponent(src)) === -1 && !audio.src.endsWith(src)) {
      audio.src = src;
    }
    audio.play().then(() => {
      currentBtn = btn;
      btn.textContent = '❚❚';
      btn.classList.add('playing');
    }).catch(() => showToast('Нажми ещё раз для воспроизведения'));
  });
});
audio.addEventListener('ended', () => {
  if (currentBtn) { currentBtn.textContent = '▶'; currentBtn.classList.remove('playing'); }
});

// Download feedback
document.getElementById('dl').addEventListener('click', () => showToast('Скачивание началось ✓'));

// Parallax blobs on mouse move
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - .5) * 24;
  const y = (e.clientY / window.innerHeight - .5) * 24;
  document.querySelector('.blob-1').style.marginLeft = x + 'px';
  document.querySelector('.blob-1').style.marginTop = y + 'px';
  document.querySelector('.blob-2').style.marginLeft = -x + 'px';
  document.querySelector('.blob-2').style.marginTop = -y + 'px';
});
