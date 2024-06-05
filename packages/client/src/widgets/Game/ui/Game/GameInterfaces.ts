export interface IGameProps {
  width: number;
  height: number;
}

export interface IShip {
  x: number;
  y: number;
  size: number;
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

export type TCursor = 'inherit' | 'none';

export interface IGameAudio {
  blasterAudio: HTMLAudioElement | null;
  enemyHit: HTMLAudioElement | null;
  gameOverAudio: HTMLAudioElement | null;
}
