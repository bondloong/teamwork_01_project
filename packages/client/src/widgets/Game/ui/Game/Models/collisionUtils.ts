import { IBullet, IEnemy } from '../GameInterfaces';

export function checkCollision(bullet: IBullet, enemy: IEnemy): boolean {
	return Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < enemy.size;
}
