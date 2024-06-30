import { MutableRefObject } from 'react';
import { IBullet, IEnemy, IShip, TCursor } from '../GameInterfaces';

interface shootingInterval extends React.MutableRefObject<NodeJS.Timeout | null> {}

// Отрисовка корабля на мышке
export const handleMouseMoveShip = (
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  ship: MutableRefObject<IShip>
): void => {
  const rect = canvas.getBoundingClientRect();
  ship.current.x = event.clientX - rect.left - ship.current.size / 2;
  ship.current.y = event.clientY - rect.top - ship.current.size / 2;
};

// Выстрел
export const handleMouseDownStartShooting = (
  shootBullet: () => void,
  shootingInterval: shootingInterval,
  blasterAudio: HTMLAudioElement | null
): void => {
  const playGunshotSound = (): void => {
    if (blasterAudio) {
      blasterAudio.volume = 0.4;
      blasterAudio.currentTime = 0;
      blasterAudio.play();
    }
  };

  const shootAndPlaySound = (): void => {
    shootBullet();
    playGunshotSound();
  };

  shootAndPlaySound();
  shootingInterval.current = setInterval(shootAndPlaySound, 200); // Повторение выстрела каждые 0.2 секунды
};

// Прекращение стрельбы
export const handleMouseUpStopShooting = (shootingInterval: shootingInterval): void => {
  if (shootingInterval.current) {
    clearInterval(shootingInterval.current);
    shootingInterval.current = null;
  }
};

// Спавн врага
export const spawnEnemy = (
  enemies: React.MutableRefObject<IEnemy[]>,
  width: number,
  height: number,
  enemySpeed: number
): void => {
  /* Ускорять по мере набора очков */
  enemies.current.push({
    x: width,
    y: Math.random() * (height - 30),
    size: 30,
    moveX: -enemySpeed,
    moveY: 0,
  });
};

// Пуля
export const shootBullet = (
  bullets: React.MutableRefObject<IBullet[]>,
  ship: MutableRefObject<IShip>
): void => {
  const speed = 15;
  bullets.current.push({
    x: ship.current.x + ship.current.size / 2,
    y: ship.current.y + ship.current.size / 2,
    moveX: speed,
    moveY: 0,
  });
};

// Отрисовка кнопки начала игры
export const handleStartGameClick = (
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>,
  setCursor: React.Dispatch<React.SetStateAction<TCursor>>
): void => {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  // Проверяем, был ли клик внутри "кнопки"
  if (
    clickX >= width / 2 - 50 &&
    clickX <= width / 2 + 50 &&
    clickY >= height / 2 - 15 &&
    clickY <= height / 2 + 15
  ) {
    setGameStarted(true);
    setCursor('none');
  }
};

// отрисовка обработчика начала игры

export const drawStartGame = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>,
  setCursor: React.Dispatch<React.SetStateAction<TCursor>>,
  handleStartGame: (event: MouseEvent) => void
): void => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, width, height);
  ctx.font = '20px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText('Начать игру', width / 2, height / 2);
  canvas.addEventListener('click', handleStartGame); // ← Обработчик клика для начала игры
};
