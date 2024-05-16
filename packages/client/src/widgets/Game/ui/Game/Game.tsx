import { FC, useEffect, useRef, useState } from 'react';
import { SpaceHD } from './assets/index';
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

export const Game: FC<IGameProps> = ({ width, height, onFullscreenToggle }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(width);
  const [canvasHeight, setCanvasHeight] = useState(height);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const ship = useRef({ x: width / 2, y: height / 2, size: 20 });
  const bullets = useRef<Array<IBullet>>([]);
  const enemies = useRef<Array<IEnemy>>([]);
  const gameOver = useRef(false);
  const shootingInterval = useRef<NodeJS.Timeout | null>(null);
  const backgroundImage = useRef(new Image());
  const backgroundX = useRef(0);

  const [gameStarted, setGameStarted] = useState(false);
  const [cursor, setCursor] = useState<TCursor>('inherit');
  const [score, setScore] = useState(0);
  const [enemySpeed] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (!gameStarted) {
      drawStartGame(canvas, ctx, canvasWidth, canvasHeight, setGameStarted, setCursor);
      return;
    }

    if (backgroundImage.current.complete && backgroundImage.current.naturalHeight !== 0) {
      gameLoop({
        ctx,
        gameOver,
        backgroundX,
        backgroundImage,
        width: canvasWidth,
        height: canvasHeight,
        ship,
        bullets,
        enemies,
        setScore,
      });
    } else {
      backgroundImage.current.onload = (): void => {
        requestAnimationFrame(() =>
          gameLoop({
            ctx,
            gameOver,
            backgroundX,
            backgroundImage,
            width: canvasWidth,
            height: canvasHeight,
            ship,
            bullets,
            enemies,
            setScore,
          })
        );
      };
      backgroundImage.current.src = SpaceHD;
    }

    const handleMouseMove = (event: MouseEvent): void => handleMouseMoveShip(event, canvas, ship);
    const handleMouseDown = (): void =>
      handleMouseDownStartShooting(() => shootBullet(bullets, ship), shootingInterval);
    const handleMouseUp = (): void => handleMouseUpStopShooting(shootingInterval);
    const spawnEnemyInterval = setInterval(
      () => spawnEnemy(enemies, canvasWidth, canvasHeight, enemySpeed),
      500
    );

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      clearInterval(spawnEnemyInterval);
      if (shootingInterval.current) {
        clearInterval(shootingInterval.current);
      }
    };
  }, [canvasWidth, canvasHeight, gameStarted]);

  useEffect(() => {
    const handleResize = (): void => {
      if (document.fullscreenElement != null) {
        setCanvasWidth(window.innerWidth);
        setCanvasHeight(window.innerHeight);
      } else {
        setCanvasWidth(width);
        setCanvasHeight(height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width, height]);

  const toggleFullScreen = (): void => {
    if (!onFullscreenToggle) {
      return;
    }
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setCanvasWidth(window.innerWidth);
          setCanvasHeight(window.innerHeight);
          onFullscreenToggle(true);
          setIsFullscreen(true);
        })
        .catch((e) => {
          console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`);
        });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setCanvasWidth(width);
          setCanvasHeight(height);
          onFullscreenToggle(false);
          setIsFullscreen(false);
        });
      }
    }
  };

  return (
    <section className={classes.game}>
      <h2 className={`${classes.score} ${isFullscreen ? classes.scoreIsFullscreen : ''}`}>
        {score}
      </h2>
      <button onClick={toggleFullScreen} className={classes.fullscreenButton}>
        Toggle Fullscreen
      </button>
      <canvas
        className={classes.canvas}
        style={{ cursor: cursor }}
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
    </section>
  );
};
