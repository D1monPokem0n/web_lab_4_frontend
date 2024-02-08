import { Injectable, OnInit } from '@angular/core';
import { RestClientService } from './rest-client.service';
import { Point } from './point';

@Injectable({
  providedIn: 'root',
})
export class PointsContainerService implements OnInit {
  points: Point[] = [];

  constructor(private client: RestClientService) {}

  ngOnInit(): void {
    console.log('start points fetching');
    this.client.getPoints().subscribe((points) => (this.points = points));
    console.log('points fetched');
  }

  getPoints(): Point[] {
    if (this.points.length === 0) {
      this.client.getPoints().subscribe((points) => (this.points = points));
    }
    return this.points;
  }

  addPoint(x: number, y: number, r: number): void {
    this.client.addPoint(x, y, r).subscribe((point) => this.points.push(point));
  }

  clearPoints(): void {
    this.client.clearPoints().subscribe((_) => (this.points = []));
  }
}
