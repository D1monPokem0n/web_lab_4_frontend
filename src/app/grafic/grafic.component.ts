import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserInputService } from '../user-input.service';
import { RestClientService } from '../rest-client.service';
import { Point } from '../point';
import { PointsContainerService } from '../points-container.service';

@Component({
  selector: 'app-grafic',
  templateUrl: './grafic.component.html',
  styleUrls: ['./grafic.component.scss'],
})
export class GraficComponent {
  @ViewChild('grafic', { static: true }) grafic!: ElementRef;
  DEFAULT_RADIUS = 5;
  CX = 250; // Grafic center x
  CY = 250; // Grafic center y
  DEFAULT_RADIUS_SIZE = 180;
  DEFAULT_RECT_WIDTH = 90;
  DEFAULT_RECT_HEIGHT = 180;
  DEFAULT_RECT_COORDINATES = '160,70 250,70 250,250 160,250';
  DEFAULT_TRIANGLE_COORDINATES = '250,250 430,250 250,70 250,250';
  POINT_OFFSET_X = 2;
  POINT_OFFSET_Y = 2;

  graficIsHovered = false;

  constructor(
    private userInput: UserInputService,
    private pointsContainer: PointsContainerService
  ) {}

  currentR(): number {
    return this.userInput.r;
  }

  get points(): Point[] {
    return this.pointsContainer.points;
  }

  getCircleRadius(): string {
    if (this.userInput.r === undefined) return `${this.DEFAULT_RADIUS_SIZE}`;
    return `${this.proportion() * this.DEFAULT_RADIUS_SIZE}`;
  }

  getRectCoordinates(): string {
    if (!this.userInput.r) return `${this.DEFAULT_RECT_COORDINATES}`;
    const rect_x = this.CX - this.proportion() * this.DEFAULT_RECT_WIDTH;
    const rect_y = this.CY - this.proportion() * this.DEFAULT_RECT_HEIGHT;
    return `${rect_x},${rect_y} ${this.CX},${rect_y} ${this.CX},${this.CY} ${rect_x},${this.CY}`;
  }

  getTriangleCoordinates(): string {
    if (!this.userInput.r) return `${this.DEFAULT_TRIANGLE_COORDINATES}`;
    const radius = this.proportion() * this.DEFAULT_RADIUS_SIZE;
    const x = this.CX + radius;
    const y = this.CY - radius;
    return `${this.CX},${this.CY} ${x},${this.CY} ${this.CX},${y} ${this.CX},${this.CY}`;
  }

  proportion(): number {
    if (!this.userInput.r) return 1;
    return this.userInput.r / this.DEFAULT_RADIUS;
  }

  graficCX(): number {
    const { x, _ } = this.grafic.nativeElement.getBoundingClientRect();
    return x + this.CX;
  }

  graficCY(): number {
    const { _, y } = this.grafic.nativeElement.getBoundingClientRect();
    return y + this.CY + window.scrollY;
  }

  pointX(x: number): number {
    const cx = this.graficCX();
    const pointX =
      cx +
      (x / this.DEFAULT_RADIUS) * this.DEFAULT_RADIUS_SIZE -
      this.POINT_OFFSET_X;
    return pointX;
  }

  pointY(y: number): number {
    const cy = this.graficCY();
    const pointY =
      cy -
      (y / this.DEFAULT_RADIUS) * this.DEFAULT_RADIUS_SIZE -
      this.POINT_OFFSET_Y;
    return pointY;
  }

  getPointPosition(x: number, y: number): string {
    return `left: ${this.pointX(x)}px; top: ${this.pointY(y)}px`;
  }

  handleGraficClick(ev: MouseEvent): void {
    if (!this.currentR() || this.currentR() <= 0) return;
    const cx = this.graficCX();
    const cy = this.graficCY();
    const x =
      +(((ev.clientX - cx) / this.DEFAULT_RADIUS_SIZE) * this.DEFAULT_RADIUS).toFixed(2);
    const y =
      +(((cy - ev.clientY) / this.DEFAULT_RADIUS_SIZE) * this.DEFAULT_RADIUS).toFixed(2);
    console.log(x, y);
    this.pointsContainer.addPoint(x, y, this.userInput.r);
  }
}
