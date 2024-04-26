import { FC, useEffect, useRef, useState } from 'react';
import { SpaceHD } from './assets/indes';
import { IBullet, IEnemy, IGameProps, TCursor } from './GameInterfaces';
import classes from './Game.module.scss';
import { drawStartGame, handleMouseDownStartShooting, handleMouseMovePlayer, handleMouseUpStopShooting, shootBullet, spawnEnemy } from './models/helpers';
import { gameLoop } from './models/gameLoop';


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
  const [cursor, setCursor] = useState<TCursor>('inherit');
  const [score, setScore] = useState(0);
  const [enemySpeed] = useState(5)
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    if (!gameStarted) {
      drawStartGame(canvas, ctx, width, height, setGameStarted, setCursor)
      return;
    }

    backgroundImage.current.src = SpaceHD;  // Загрузка фона
    backgroundImage.current.onload = (): void => {
      requestAnimationFrame(() => gameLoop({ ctx, gameOver, backgroundX, backgroundImage, width, height, player, bullets, enemies, setScore }));
    };

    document.addEventListener('mousemove', (event) => handleMouseMovePlayer(event, canvas, player));
    document.addEventListener('mousedown', () => handleMouseDownStartShooting(() =>shootBullet(bullets, player), shootingInterval));
    document.addEventListener('mouseup', () => handleMouseUpStopShooting(shootingInterval));
    setInterval(() => spawnEnemy(enemies, width, height, enemySpeed), 500);
    

    return () => {
      document.addEventListener('mousemove', (event) => handleMouseMovePlayer(event, canvas, player));
      document.removeEventListener('mousedown', () => handleMouseDownStartShooting(() =>shootBullet(bullets, player), shootingInterval));
      document.removeEventListener('mouseup', () => handleMouseUpStopShooting(shootingInterval));
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
