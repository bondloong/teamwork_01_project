import React, { useEffect, useRef, useState } from 'react';
import SpaceHD from './templates/space_hd.webp'


interface Props {
  width: number;
  height: number;
}

interface Bullet {
  x: number;
  y: number;
  dx: number;
  dy: number;
}
interface Enemy {
  x: number;
  y: number;
  size: number;
  dx: number;
  dy: number;
}

const Game: React.FC<Props> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const player = useRef({ x: width / 2, y: height / 2, size: 20 });
  const bullets = useRef<Array<Bullet>>([]);
  const enemies = useRef<Array<Enemy>>([]);
  const shootingInterval = useRef<NodeJS.Timeout | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const gameOver = useRef(false);
  const [cursor, setCursor] = useState<'inherit' | 'none'>('inherit');
  const [score, setScore] = useState(0);
  const backgroundImage = useRef(new Image()); 
  const backgroundX = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    backgroundImage.current.src = SpaceHD;  // Загрузка фона
    backgroundImage.current.onload = (): void => {
      requestAnimationFrame(gameLoop);
    };

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

    // Отрисовка корабля на мышке
    const handleMouseMove = (event: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      player.current.x = event.clientX - rect.left - player.current.size / 2;
      player.current.y = event.clientY - rect.top - player.current.size / 2;
    };

    // Пуля
    const shootBullet = (): void => {
      const speed = 15;
      bullets.current.push({
        x: player.current.x + player.current.size / 2,
        y: player.current.y + player.current.size / 2,
        dx: speed,
        dy: 0,
      });
    };

    // Выстрел
    const handleMouseDown = (): void => {
      shootBullet();
      shootingInterval.current = setInterval(shootBullet, 200); // Повторение выстрела каждые 0.2 секунды
    };

    // Прекращение стрельбы
    const handleMouseUp = (): void => {
      if (shootingInterval.current) {
        clearInterval(shootingInterval.current);
        shootingInterval.current = null;
      }
    };

    // Спавн врага
    const spawnEnemy = (): void => {
      const speed = 5; /* Ускорять по мере набора очков */
      enemies.current.push({
        x: width,
        y: Math.random() * (height - 30),
        size: 30,
        dx: -speed,
        dy: 0,
      });
    };

    const gameLoop = (): void => {
      if (!ctx || gameOver.current) return;

      // Сдвиг фона
      backgroundX.current -= 1; // Скорость сдвига фона
      if (backgroundX.current <= -backgroundImage.current.width) {
        backgroundX.current += backgroundImage.current.width;
      }

      // Очистка канваса
      ctx.clearRect(0, 0, width, height);

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
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;
        ctx.fillStyle = 'red';
        ctx.fillRect(bullet.x, bullet.y, 5, 5);

        if (bullet.x < 0 || bullet.y < 0 || bullet.x > width || bullet.y > height) {
          bullets.current.splice(index, 1);
        }
      });

      // Отрисовка врагов
      enemies.current.forEach((enemy) => {
        enemy.x += enemy.dx;
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
          const hit = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < enemy.size;
          if (hit) {
            bullets.current.splice(bulletIndex, 1);
            setScore((prev) => prev + 100);
          }
          return hit;
        });
      });

      requestAnimationFrame(gameLoop);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    setInterval(spawnEnemy, 500);

    requestAnimationFrame(gameLoop);

    return () => {
      document.addEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (shootingInterval.current) {
        clearInterval(shootingInterval.current);
      }
    };
  }, [width, height, gameStarted]);

  return (
    <>
      <h2>{score}</h2>
      <canvas
        style={{ border: '1px solid black', cursor: cursor }}
        ref={canvasRef}
        width={width}
        height={height}
      />
      ;
    </>
  );
};

export default Game;
