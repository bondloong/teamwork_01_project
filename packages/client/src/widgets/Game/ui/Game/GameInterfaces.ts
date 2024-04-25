
export interface IGameProps {
	width: number;
	height: number;
}

export interface IBullet {
	x: number;
	y: number;
	moveX: number;
	moveY: number;
}
export interface IEnemy {
	x: number;
	y: number;
	size: number;
	moveX: number;
	moveY: number;
}