import { IBullet, IEnemy, IShip } from '../GameInterfaces';
import { checkCollision } from './collisionUtils';

// Отрисовка фона с учётом сдвига
export const moveBG = (backgroundX: React.MutableRefObject<number>, backgroundImage: React.MutableRefObject<HTMLImageElement>, width: number, height: number, ctx: CanvasRenderingContext2D): void => {
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
}

export const drawShip = (ctx: CanvasRenderingContext2D, ship: React.MutableRefObject<IShip>): void => {
	ctx.fillStyle = 'blue';
	ctx.fillRect(ship.current.x, ship.current.y, ship.current.size, ship.current.size);
}

export const drawBullets = (bullets: React.MutableRefObject<IBullet[]>, ctx: CanvasRenderingContext2D,  width: number, height: number): void => {
	bullets.current.forEach((bullet, index) => {
		bullet.x += bullet.moveX;
		bullet.y += bullet.moveY;
		ctx.fillStyle = 'red';
		ctx.fillRect(bullet.x, bullet.y, 5, 5);

		if (bullet.x < 0 || bullet.y < 0 || bullet.x > width || bullet.y > height) {
			bullets.current.splice(index, 1);
		}
	});
}

export const enemiesCheckCollision = (enemies: React.MutableRefObject<IEnemy[]>, bullets: React.MutableRefObject<IBullet[]>, setScore: React.Dispatch<React.SetStateAction<number>>):void => {
	enemies.current = enemies.current.filter((enemy) => {
		const someBulletsCheck = (bullet: IBullet, bulletIndex: number): boolean => {
			const hit = checkCollision(bullet, enemy);
			if (hit) {
				bullets.current.splice(bulletIndex, 1);
				setScore((prev) => prev + 100);
			}
			return hit;
		}

		return !bullets.current.some(someBulletsCheck);
	});
}

export const drawEnemies = (enemies: React.MutableRefObject<IEnemy[]>, ctx: CanvasRenderingContext2D, ship: React.MutableRefObject<IShip>, gameOver: React.MutableRefObject<boolean>) :void => {
	enemies.current.forEach((enemy) => {
		enemy.x += enemy.moveX;
		ctx.fillStyle = 'green';
		ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

		if (
			Math.hypot(enemy.x - ship.current.x, enemy.y - ship.current.y) <
			(enemy.size + ship.current.size) / 2
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
}