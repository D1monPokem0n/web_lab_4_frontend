export interface Point {
  id: number;
  userName: string;
  x: number;
  y: number;
  r: number;
  shotResult: ShotResult;
  time: string;
  executionTime: number;
}

export enum ShotResult {
  Hit = 'Hit',
  Miss = 'Miss',
}

export function randomPoint(): Point {
  return {
    id: Math.round(10000 * Math.random()),
    userName: 'foo',
    x: +(12 * Math.random() - 6).toFixed(2),
    y: +(12 * Math.random() - 6).toFixed(2),
    r: Math.round(4 * Math.random() + 1),
    shotResult: Math.random() > 0.5 ? ShotResult.Hit : ShotResult.Miss,
    time: Math.round(10000 * Math.random()) + '',
    executionTime: Math.round(10000 * Math.random()),
  };
}
