import { FC, useEffect, useRef, useState } from 'react';
import { SpaceHD } from './assets/indes';
import { IBullet, IEnemy, IGameProps, TCursor } from './GameInterfaces';
import classes from './Game.module.scss';
import {
  drawStartGame,
  handleMouseDownStartShooting,
  handleMouseMoveShip,
  handleMouseUpStopShooting,
  shootBullet,
  spawnEnemy,
  gameLoop,
} from './models';
import { GameOverModal } from './GameOverModal';

export const Game: FC<IGameProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ship = useRef({ x: width / 2, y: height / 2, size: 20 });
  const bullets = useRef<Array<IBullet>>([]);
  const enemies = useRef<Array<IEnemy>>([]);
  const [gameOver, setGameOver] = useState(false);
  const shootingInterval = useRef<NodeJS.Timeout | null>(null);
  const backgroundImage = useRef(new Image());
  const backgroundX = useRef(0);

  const [gameStarted, setGameStarted] = useState(false);
  const [cursor, setCursor] = useState<TCursor>('inherit');
  const [score, setScore] = useState(0);
  const [enemySpeed] = useState(2);
  const handleGameOver = (): void => {
    setTimeout(() => window.location.reload(), 100);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    if (!gameStarted) {
      drawStartGame(canvas, ctx, width, height, setGameStarted, setCursor);
      return;
    }

    backgroundImage.current.src = SpaceHD; // Загрузка фона
    backgroundImage.current.onload = (): void => {
      // Запуск игры после отрисовки фона
      requestAnimationFrame(() =>
        gameLoop({
          ctx,
          gameOver,
          backgroundX,
          backgroundImage,
          width,
          height,
          ship,
          bullets,
          enemies,
          setScore,
          setGameOver,
        })
      );
    };

    document.addEventListener('mousemove', (event) => handleMouseMoveShip(event, canvas, ship));
    document.addEventListener('mousedown', () =>
      handleMouseDownStartShooting(() => shootBullet(bullets, ship), shootingInterval)
    );
    document.addEventListener('mouseup', () => handleMouseUpStopShooting(shootingInterval));
    setInterval(() => spawnEnemy(enemies, width, height, enemySpeed), 500);

    return () => {
      document.addEventListener('mousemove', (event) => handleMouseMoveShip(event, canvas, ship));
      document.removeEventListener('mousedown', () =>
        handleMouseDownStartShooting(() => shootBullet(bullets, ship), shootingInterval)
      );
      document.removeEventListener('mouseup', () => handleMouseUpStopShooting(shootingInterval));
      if (shootingInterval.current) {
        clearInterval(shootingInterval.current);
      }
    };
  }, [width, height, gameStarted]);
  if (gameOver) return <GameOverModal score={score} onClose={handleGameOver} />;
  return (
    <section className={classes.game}>
      <h2>{score}</h2>
      <canvas
        className={classes.canvas}
        style={{ cursor: cursor }}
        ref={canvasRef}
        width={width}
        height={height}
      />
    </section>
  );
};
