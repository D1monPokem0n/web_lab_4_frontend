import { Component, OnInit } from '@angular/core';
import { Point } from '../point';
import { RestClientService } from '../rest-client.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  points: Point[] = [];

  constructor(private client: RestClientService) {}

  ngOnInit(): void {
    this.getPoints();
  }

  getPoints() {
    this.client.getPoints().subscribe((points) => (this.points = points));
  }
}
