// Переключение экранов
const welcome = document.getElementById('welcome-screen');
const profile = document.getElementById('profile-screen');
const enterText = document.querySelector('.enter-text');

function showProfile() {
  welcome.classList.add('fade-out');
  setTimeout(() => {
    welcome.classList.add('hidden');
    profile.classList.add('visible');
    profile.classList.remove('hidden');
    // Запуск анимации звёзд
    resizeCanvas();
    createStars();
    animate();
    // Воспроизведение аудио
    const audio = document.getElementById('profile-audio');
    if (audio) {
      audio.currentTime = 12;
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  }, 700); // Время совпадает с transition в CSS
}

welcome.addEventListener('click', showProfile);
if (enterText) enterText.addEventListener('click', showProfile);

// Анимация звёзд
const canvas = document.getElementById('stars-bg');
const ctx = canvas.getContext('2d');
let stars = [];
const STAR_COUNT = 40;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 1,
      alpha: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.2 + 0.05
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const star of stars) {
    ctx.save();
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
    // Движение звёзд
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
}

function animate() {
  drawStars();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createStars();
});

// Инициализация только при показе профиля
profile.addEventListener('transitionend', () => {
  if (!profile.classList.contains('hidden')) {
    resizeCanvas();
    createStars();
    animate();
  }
});
// Для мгновенного показа (без анимации перехода)
profile.addEventListener('DOMSubtreeModified', () => {
  if (!profile.classList.contains('hidden')) {
    resizeCanvas();
    createStars();
    animate();
  }
});

// --- Управление громкостью ---
window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('profile-audio');
  const slider = document.getElementById('volume-slider');
  const icon = document.getElementById('volume-icon');
  if (!audio || !slider || !icon) return;

  // Начальное состояние
  audio.volume = 0.3;
  slider.value = 0.3;
  updateIcon();

  slider.addEventListener('input', () => {
    audio.volume = slider.value;
    if (audio.volume === 0) {
      audio.muted = true;
    } else {
      audio.muted = false;
    }
    updateIcon();
  });

  icon.addEventListener('click', () => {
    audio.muted = !audio.muted;
    updateIcon();
    if (audio.muted) {
      slider.value = 0;
    } else {
      slider.value = audio.volume || 0.7;
    }
  });

  function updateIcon() {
    if (audio.muted || audio.volume == 0) {
      icon.classList.add('muted');
    } else {
      icon.classList.remove('muted');
    }
  }
});

// --- Счётчик посещений через countapi.xyz ---
window.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.countapi.xyz/hit/dnkz9-bio/visits')
    .then(res => res.json())
    .then(data => {
      const countElem = document.querySelector('.views .count');
      if (countElem) {
        if (data.value < 436) {
          fetch('https://api.countapi.xyz/set/dnkz9-bio/visits?value=436')
            .then(res2 => res2.json())
            .then(data2 => {
              countElem.textContent = data2.value;
            });
        } else {
          countElem.textContent = data.value;
        }
      }
    });
});

// --- Копирование ника Discord по клику ---
window.addEventListener('DOMContentLoaded', () => {
  const discord = document.getElementById('discord-nick');
  if (discord) {
    discord.addEventListener('click', () => {
      navigator.clipboard.writeText('www.leetcheats.ru');
      discord.title = 'Скопировано!';
      setTimeout(() => {
        discord.title = 'Discord: www.leetcheats.ru';
      }, 1200);
    });
  }
}); 