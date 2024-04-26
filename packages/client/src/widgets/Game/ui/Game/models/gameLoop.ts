import { IBullet, IEnemy, IShip } from '../GameInterfaces';
import { checkCollision } from './collisionUtils';


interface IGameLoopProps {
	ctx: CanvasRenderingContext2D,
	gameOver: React.MutableRefObject<boolean>,
	backgroundX: React.MutableRefObject<number>,
	backgroundImage: React.MutableRefObject<HTMLImageElement>,
	width: number,
	height: number,
	player: React.MutableRefObject<IShip>,
	bullets: React.MutableRefObject<IBullet[]>,
	enemies: React.MutableRefObject<IEnemy[]>,
	setScore: React.Dispatch<React.SetStateAction<number>>
}

export const gameLoop = ({
	ctx, 
	gameOver,
	backgroundX,
	backgroundImage,
	width,
	height,
	player,
	bullets,
	enemies,
	setScore
}: IGameLoopProps): void => {
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

	requestAnimationFrame(() => gameLoop({ctx, gameOver, backgroundX, backgroundImage, width, height, player, bullets, enemies,	setScore}));
};