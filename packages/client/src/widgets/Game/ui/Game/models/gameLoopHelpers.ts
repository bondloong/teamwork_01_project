import { IBullet, IEnemy, IShip } from '../GameInterfaces';
import { StarshipImage, BoulderImage } from '../assets/index';

// Загрузка изображений только в браузере
let shipImage: HTMLImageElement;
let boulderImage: HTMLImageElement;
if (typeof window !== 'undefined') {
  shipImage = new Image();
  shipImage.src = StarshipImage;

  boulderImage = new Image();
  boulderImage.src = BoulderImage;
}

// Отрисовка фона с учётом сдвига
export const moveBG = (
  backgroundX: React.MutableRefObject<number>,
  backgroundImage: React.MutableRefObject<HTMLImageElement>,
  width: number,
  height: number,
  ctx: CanvasRenderingContext2D
): void => {
  // Сдвиг фона
  backgroundX.current -= 1; // Скорость сдвига фона
  if (backgroundX.current <= -backgroundImage.current.width) {
    backgroundX.current += backgroundImage.current.width;
  }

  for (let x = backgroundX.current; x < width; x += backgroundImage.current.width) {
    for (let y = 0; y < height; y += backgroundImage.current.height) {
      ctx.drawImage(backgroundImage.current, x, y);
    }
  }
};

export const drawShip = (
  ctx: CanvasRenderingContext2D,
  ship: React.MutableRefObject<IShip>
): void => {
  ctx.drawImage(shipImage, ship.current.x, ship.current.y, ship.current.size, ship.current.size);
};

export const drawBullets = (
  bullets: React.MutableRefObject<IBullet[]>,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void => {
  bullets.current.forEach((bullet, index) => {
    bullet.x += bullet.moveX;
    bullet.y += bullet.moveY;
    ctx.fillStyle = 'red';
    ctx.fillRect(bullet.x, bullet.y, 5, 5);

    if (bullet.x < 0 || bullet.y < 0 || bullet.x > width || bullet.y > height) {
      bullets.current.splice(index, 1);
    }
  });
};

export const enemiesCheckCollision = (
  enemies: React.MutableRefObject<IEnemy[]>,
  bullets: React.MutableRefObject<IBullet[]>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  blasterAudio: HTMLAudioElement | null
): void => {
  const checkCollision = (bullet: IBullet, enemy: IEnemy): boolean => {
    return Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < enemy.size;
  };

  enemies.current = enemies.current.filter((enemy) => {
    const someBulletsCheck = (bullet: IBullet, bulletIndex: number): boolean => {
      const hit = checkCollision(bullet, enemy);
      if (hit) {
        bullets.current.splice(bulletIndex, 1);
        setScore((prev) => prev + 100);
        if (blasterAudio) {
          blasterAudio.currentTime = 0;
          blasterAudio.play();
        }
      }
      return hit;
    };

    return !bullets.current.some(someBulletsCheck);
  });
};

export const drawEnemies = (
  enemies: React.MutableRefObject<IEnemy[]>,
  ctx: CanvasRenderingContext2D,
  ship: React.MutableRefObject<IShip>,
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  enemies.current.forEach((enemy) => {
    enemy.x += enemy.moveX;
    ctx.drawImage(boulderImage, enemy.x, enemy.y, enemy.size, enemy.size);

    if (
      Math.hypot(enemy.x - ship.current.x, enemy.y - ship.current.y) <
      (enemy.size + ship.current.size) / 2
    ) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      setGameOver(true);
      //   console.log('Конец игры! Столкновение c противником');

      return;
    }

    if (enemy.x + enemy.size < 0) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      setGameOver(true);
      //   console.log('Конец игры! Противник вас обошел');

      return;
    }
  });
};
