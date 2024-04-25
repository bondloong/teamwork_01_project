import { FC, useEffect, useRef, useState } from 'react';
import { SpaceHD } from './assets/indes';
import { checkCollision } from './Models/collisionUtils';
import { IBullet, IEnemy, IGameProps } from './GameInterfaces';
import classes from './Game.module.scss';

export const Game: FC<IGameProps>  = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const player = useRef({ x: width / 2, y: height / 2, size: 20 });
  const bullets = useRef<Array<IBullet>>([]);
  const enemies = useRef<Array<IEnemy>>([]);
  const gameOver = useRef(false);
  const shootingInterval = useRef<NodeJS.Timeout | null>(null);
  const backgroundImage = useRef(new Image());
  const backgroundX = useRef(0);

  const [gameStarted, setGameStarted] = useState(false);
  const [cursor, setCursor] = useState<'inherit' | 'none'>('inherit');
  const [score, setScore] = useState(0);
  const [enemySpeed] = useState(5)

  // Пуля
  const shootBullet = (): void => {
    const speed = 15;
    bullets.current.push({
      x: player.current.x + player.current.size / 2,
      y: player.current.y + player.current.size / 2,
      moveX: speed,
      moveY: 0,
    });
  };

  // Выстрел
  const handleMouseDownStartShooting = (): void => {
    shootBullet();
    shootingInterval.current = setInterval(shootBullet, 200); // Повторение выстрела каждые 0.2 секунды
  };

  // Прекращение стрельбы
  const handleMouseUpStopShooting = (): void => {
    if (shootingInterval.current) {
      clearInterval(shootingInterval.current);
      shootingInterval.current = null;
    }
  };

  // Спавн врага
  const spawnEnemy = (): void => {/* Ускорять по мере набора очков */
    enemies.current.push({
      x: width,
      y: Math.random() * (height - 30),
      size: 30,
      moveX: -enemySpeed,
      moveY: 0,
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Отрисовка кнопки начала игры
    const handleStartGameClick = (event: MouseEvent): void => {
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
        canvas.removeEventListener('click', handleStartGameClick); // Удаление обработчика событий после начала игры
      }
    };

    if (!gameStarted) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = '20px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('Начать игру', width / 2, height / 2);
      canvas.addEventListener('click', handleStartGameClick); // ← Обработчик клика для начала игры
      return;
    }

    backgroundImage.current.src = SpaceHD;  // Загрузка фона
    backgroundImage.current.onload = (): void => {
      requestAnimationFrame(gameLoop);
    };

    // Отрисовка корабля на мышке
    const handleMouseMovePlayer = (event: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      player.current.x = event.clientX - rect.left - player.current.size / 2;
      player.current.y = event.clientY - rect.top - player.current.size / 2;
    };

    const gameLoop = (): void => {
      if (!ctx || gameOver.current) return;

      // Сдвиг фона
      backgroundX.current -= 1; // Скорость сдвига фона
      if (backgroundX.current <= -backgroundImage.current.width) {
        backgroundX.current += backgroundImage.current.width;
      }

      // Отрисовка фона с учётом сдвига
      for (let x = backgroundX.current; x < width; x += backgroundImage.current.width) {
        for (let y = 0; y < height; y += backgroundImage.current.height) {
          ctx.drawImage(backgroundImage.current, x, y);
        }
      }

      // Отрисовка корабля
      ctx.fillStyle = 'blue';
      ctx.fillRect(player.current.x, player.current.y, player.current.size, player.current.size);

      // Отрисовка выстрелов
      bullets.current.forEach((bullet, index) => {
        bullet.x += bullet.moveX;
        bullet.y += bullet.moveY;
        ctx.fillStyle = 'red';
        ctx.fillRect(bullet.x, bullet.y, 5, 5);

        if (bullet.x < 0 || bullet.y < 0 || bullet.x > width || bullet.y > height) {
          bullets.current.splice(index, 1);
        }
      });

      // Отрисовка врагов
      enemies.current.forEach((enemy) => {
        enemy.x += enemy.moveX;
        ctx.fillStyle = 'green';
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

        if (
          Math.hypot(enemy.x - player.current.x, enemy.y - player.current.y) <
          (enemy.size + player.current.size) / 2
        ) {
          gameOver.current = true;
          alert('Конец игры! Столкновение c противником');
          setTimeout(() => window.location.reload(), 100); // Даем время для визуализации перед перезагрузкой
          return;
        }

        if (enemy.x + enemy.size < 0) {
          gameOver.current = true;
          alert('Конец игры! Противник вас обошел');
          setTimeout(() => window.location.reload(), 100); // Даем время для визуализации перед перезагрузкой
          return;
        }
      });

      // Проверка столкновений пуль с врагами
      enemies.current = enemies.current.filter((enemy) => {
        return !bullets.current.some((bullet, bulletIndex) => {
          const hit = checkCollision(bullet, enemy);
          if (hit) {
            bullets.current.splice(bulletIndex, 1);
            setScore((prev) => prev + 100);
          }
          return hit;
        });
      });

      requestAnimationFrame(gameLoop);
    };

    document.addEventListener('mousemove', handleMouseMovePlayer);
    document.addEventListener('mousedown', handleMouseDownStartShooting);
    document.addEventListener('mouseup', handleMouseUpStopShooting);
    setInterval(spawnEnemy, 500);
    

    return () => {
      document.addEventListener('mousemove', handleMouseMovePlayer);
      document.removeEventListener('mousedown', handleMouseDownStartShooting);
      document.removeEventListener('mouseup', handleMouseUpStopShooting);
      if (shootingInterval.current) {
        clearInterval(shootingInterval.current);
      }
    };
  }, [width, height, gameStarted]);

  return (
    <section className={classes.game}>
      <h2>{score}</h2>
      <canvas
        className={classes.canvas}
        style={{cursor: cursor }}
        ref={canvasRef}
        width={width}
        height={height}
      />
    </section>
  );
};
