import { Component, OnInit } from '@angular/core';
import { Point } from '../point';
import { RestClientService } from '../rest-client.service';
import { PointsContainerService } from '../points-container.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  constructor(private pointsContainer: PointsContainerService) {}
  get points(): Point[] {
    return this.pointsContainer.points;
  }

  ngOnInit(): void {
    this.pointsContainer.getPoints();
  }
}
