import { MutableRefObject } from 'react';
import { IBullet, IEnemy, IShip, TCursor } from '../GameInterfaces';

interface shootingInterval extends React.MutableRefObject<NodeJS.Timeout | null> {}


// Отрисовка корабля на мышке
export const handleMouseMovePlayer = (event: MouseEvent, canvas: HTMLCanvasElement, player: MutableRefObject<IShip>): void => {
	const rect = canvas.getBoundingClientRect();
	player.current.x = event.clientX - rect.left - player.current.size / 2;
	player.current.y = event.clientY - rect.top - player.current.size / 2;
};

// Выстрел
export const handleMouseDownStartShooting = (shootBullet: () => void, shootingInterval: shootingInterval): void => {
	shootBullet();
	shootingInterval.current = setInterval(shootBullet, 200); // Повторение выстрела каждые 0.2 секунды
};

// Прекращение стрельбы
export const handleMouseUpStopShooting = (shootingInterval: shootingInterval): void => {
	if (shootingInterval.current) {
		clearInterval(shootingInterval.current);
		shootingInterval.current = null;
	}
};

// Спавн врага
export const spawnEnemy = (enemies: React.MutableRefObject<IEnemy[]>, width: number, height: number, enemySpeed: number): void => {
	/* Ускорять по мере набора очков */
	enemies.current.push({
		x: width,
		y: Math.random() * (height - 30),
		size: 30,
		moveX: -enemySpeed,
		moveY: 0,
	});
};

// Пуля
export const shootBullet = (bullets: React.MutableRefObject<IBullet[]>, player: MutableRefObject<IShip>): void => {
	const speed = 15;
	bullets.current.push({
		x: player.current.x + player.current.size / 2,
		y: player.current.y + player.current.size / 2,
		moveX: speed,
		moveY: 0,
	});
};

// Отрисовка кнопки начала игры
export const handleStartGameClick = (event: MouseEvent, canvas: HTMLCanvasElement, width: number, height: number, setGameStarted: React.Dispatch<React.SetStateAction<boolean>>, setCursor: React.Dispatch<React.SetStateAction<TCursor>>): void => {
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
		canvas.removeEventListener('click', () => handleStartGameClick); // Удаление обработчика событий после начала игры
	}
};

// отрисовка обработчика начала игры

export const drawStartGame = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, width: number, height: number, setGameStarted: React.Dispatch<React.SetStateAction<boolean>>, setCursor: React.Dispatch<React.SetStateAction<TCursor>>) :void => {
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect(0, 0, width, height);
	ctx.font = '20px Arial';
	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';
	ctx.fillText('Начать игру', width / 2, height / 2);
	canvas.addEventListener('click', (event) => handleStartGameClick(event, canvas, width, height, setGameStarted, setCursor)); // ← Обработчик клика для начала игры
}