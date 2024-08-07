import { FC, useRef, useState, useEffect, useCallback } from 'react';
import { SpaceHD, BlasterSound, EnemyHitSound, GameOverSound } from './assets/index';
import { IBullet, IEnemy, IGameAudio, IGameProps, TCursor } from './GameInterfaces';
import classes from './Game.module.scss';
import {
  drawStartGame,
  handleMouseDownStartShooting,
  handleMouseMoveShip,
  handleMouseUpStopShooting,
  shootBullet,
  spawnEnemy,
  gameLoop,
  loadAudioFiles,
  stopAllAudio,
  handleStartGameClick,
} from './models';
import { GameOverModal } from './GameOverModal';
import { useFullscreen } from '@/shared/hooks/useFullscreen';

export const Game: FC<IGameProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<HTMLCanvasElement>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen(gameRef);

  const [canvasSize, setCanvasSize] = useState({ width, height });

  const ship = useRef({ x: width / 2, y: height / 2, size: 50 });
  const bullets = useRef<Array<IBullet>>([]);
  const enemies = useRef<Array<IEnemy>>([]);
  const [gameOver, setGameOver] = useState(false);
  const shootingInterval = useRef<NodeJS.Timeout | null>(null);
  const backgroundImage: React.MutableRefObject<HTMLImageElement | null> = useRef(null);
  const audio = useRef<IGameAudio>({
    blasterAudio: null,
    enemyHit: null,
    gameOverAudio: null,
  });
  const backgroundX = useRef(0);
  const enemySpeed = useRef(5);
  const animationId = useRef<number | null>(null);

  const [gameStarted, setGameStarted] = useState(false);
  const [cursor, setCursor] = useState<TCursor>('inherit');
  const [score, setScore] = useState(0);

  const handleGameOver = useCallback((): void => {
    setTimeout(() => window.location.reload(), 100);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const handleStartGame = (event: MouseEvent): void => {
      handleStartGameClick(
        event,
        canvas,
        canvasSize.width,
        canvasSize.height,
        setGameStarted,
        setCursor
      );
      canvas.removeEventListener('click', handleStartGame);
    };

    if (!gameStarted) {
      drawStartGame(
        canvas,
        ctx,
        canvasSize.width,
        canvasSize.height,
        setGameStarted,
        setCursor,
        handleStartGame
      );
      return;
    }

    const gameConfig = {
      ctx,
      gameOver,
      backgroundX,
      backgroundImage,
      width: canvasSize.width,
      height: canvasSize.height,
      ship,
      bullets,
      enemies,
      setScore,
      setGameOver,
      animationId,
    };

    if (!backgroundImage.current) {
      backgroundImage.current = new Image();
    }

    if (backgroundImage.current) {
      backgroundImage.current.src = SpaceHD; // Загрузка фона
      backgroundImage.current.onload = (): void => {
        // Запуск игры после отрисовки фона
        loadAudioFiles([BlasterSound, EnemyHitSound, GameOverSound])
          .then((audioElements) => {
            const [blasterAudio, enemyHit, gameOverAudio] = audioElements;
            audio.current = { blasterAudio, enemyHit, gameOverAudio };
          })
          .catch(() => {
            console.log('Не удалось загрузить звук(');
          })
          .finally(() => {
            if (audio.current) {
              requestAnimationFrame(() => {
                if (backgroundImage.current) {
                  gameLoop({
                    ...gameConfig,
                    audio: audio.current!,
                    backgroundImage: backgroundImage as React.MutableRefObject<HTMLImageElement>,
                  });
                }
              });
            }
          });
      };
    }

    const handleMouseMove = (event: MouseEvent): void => handleMouseMoveShip(event, canvas, ship);
    const handleMouseDown = (): void =>
      handleMouseDownStartShooting(
        () => shootBullet(bullets, ship),
        shootingInterval,
        audio.current.blasterAudio
      );
    const handleMouseUp = (): void => handleMouseUpStopShooting(shootingInterval);
    const spawnEnemyInterval = setInterval(
      () => spawnEnemy(enemies, canvasSize.width, canvasSize.height, enemySpeed.current),
      500
    );

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      setGameOver(true);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      clearInterval(spawnEnemyInterval);
      if (shootingInterval.current) {
        clearInterval(shootingInterval.current);
      }
    };
  }, [canvasSize.width, canvasSize.height, gameStarted]);

  useEffect(() => {
    enemySpeed.current = 5 + Math.floor(score / 1000);
  }, [score]);

  useEffect(() => {
    if (isFullscreen) {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    } else {
      setCanvasSize({ width, height });
    }
  }, [isFullscreen, width, height]);

  useEffect(() => {
    if (gameOver) {
      stopAllAudio(audio.current);
      audio.current.gameOverAudio?.play().catch((error) => console.error(error));
      animationId.current && cancelAnimationFrame(animationId.current);
    }
  }, [gameOver]);

  if (gameOver) {
    return <GameOverModal score={score} onClose={handleGameOver} />;
  }

  return (
    <section ref={gameRef} className={classes.game}>
      <h2 className={`${classes.score} ${isFullscreen ? classes.scoreIsFullscreen : ''}`}>
        {score}
      </h2>
      <button onClick={toggleFullscreen} className={classes.fullscreenButton}>
        Toggle Fullscreen!
      </button>
      <canvas
        className={classes.canvas}
        style={{ cursor: cursor }}
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
    </section>
  );
};
