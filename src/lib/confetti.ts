// Utilitário para celebrações com confetti
import confetti from 'canvas-confetti';

// Confetti básico para atividades completadas
export const celebrateActivity = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'],
  });
};

// Celebração épica para subir de nível
export const celebrateLevelUp = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 0,
    colors: ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#FFD700', '#FFA500'],
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: NodeJS.Timeout = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Desde a esquerda
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    
    // Desde a direita
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
};

// Celebração para recompensas desbloqueadas
export const celebrateReward = (category: 'bronze' | 'silver' | 'gold' | 'platinum') => {
  const colors = {
    bronze: ['#CD7F32', '#8B4513', '#D2691E'],
    silver: ['#C0C0C0', '#A8A9AD', '#D3D3D3'],
    gold: ['#FFD700', '#FFA500', '#FFED4E'],
    platinum: ['#E5E4E2', '#B9F2FF', '#FFFFFF'],
  };

  // Explosão de estrelas
  confetti({
    particleCount: 150,
    spread: 180,
    origin: { y: 0.5 },
    colors: colors[category],
    shapes: ['star'],
    scalar: 1.2,
  });

  // Confetti adicional após um delay
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: colors[category],
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: colors[category],
    });
  }, 200);
};

// Celebração para missões completadas
export const celebrateMission = () => {
  // Fogos de artifício
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['hsl(var(--primary))', 'hsl(var(--accent))', '#FFD700'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

// Streak de fogo - chuva de confetti
export const celebrateStreak = () => {
  const duration = 2000;
  const animationEnd = Date.now() + duration;
  const colors = ['#FF4500', '#FF6347', '#FFD700', '#FFA500'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  }());
};

// Escola de confetti - efeito escolar
export const celebrateSchool = () => {
  confetti({
    particleCount: 100,
    spread: 160,
    origin: { y: 0.6 },
    colors: ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'],
    shapes: ['circle', 'square'],
    gravity: 1.2,
    drift: 0,
    ticks: 200,
  });
};
