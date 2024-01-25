import { Time } from '@angular/common';

export interface Point {
  id: number;
  userName: string;
  x: number;
  y: number;
  r: number;
  shotResult: ShotResult;
  time: number;
  executionTime: number;
  mouseX: number;
  mouseY: number;
}

export enum ShotResult {
  Hit = 'Hit',
  Miss = 'Miss',
}
