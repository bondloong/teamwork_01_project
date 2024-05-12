import { IBullet, IEnemy, IShip } from '../GameInterfaces';
import { drawBullets, drawEnemies, drawShip, enemiesCheckCollision, moveBG } from '.';

interface IGameLoopProps {
  ctx: CanvasRenderingContext2D;
  gameOver: boolean;
  backgroundX: React.MutableRefObject<number>;
  backgroundImage: React.MutableRefObject<HTMLImageElement>;
  width: number;
  height: number;
  ship: React.MutableRefObject<IShip>;
  bullets: React.MutableRefObject<IBullet[]>;
  enemies: React.MutableRefObject<IEnemy[]>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

export const gameLoop = ({
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
}: IGameLoopProps): void => {
  if (!ctx || gameOver) return;

  // Отрисовка движущегося экрана
  moveBG(backgroundX, backgroundImage, width, height, ctx);

  //отрисовка положения корабля
  drawShip(ctx, ship);

  // Отрисовка выстрелов
  drawBullets(bullets, ctx, width, height);

  // Отрисовка врагов
  drawEnemies(enemies, ctx, ship, setGameOver);

  // Проверка столкновений пуль с врагами
  enemiesCheckCollision(enemies, bullets, setScore);

  requestAnimationFrame(() =>
    gameLoop({
      setGameOver,
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
    })
  );
};
