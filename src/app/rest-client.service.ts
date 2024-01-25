import { Injectable } from '@angular/core';
import { Point } from './point';
import { ShotResult } from './point';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestClientService {
  private pointsUrl = 'http://127.0.0.1:8090/web_lab_4_backend/api/points/';

  constructor(private http: HttpClient) {}

  getPoints(): Observable<Point[]> {
    this.http
      .get<Point[]>(this.pointsUrl + 'all')
      .pipe(
        tap((p) => console.log('points fetched')),
        catchError(this.handleError<Point[]>('getPoints', []))
      )
      .subscribe((points) => points.forEach((point) => console.log(point)));

    return of([
      {
        id: 1,
        userName: 'dmitrii',
        x: 5,
        y: 1,
        r: 5,
        shotResult: ShotResult.Hit,
        time: new Date().setTime(10000000),
        executionTime: 1000,
        mouseX: 1100,
        mouseY: 300,
      },
      {
        id: 1,
        userName: 'dmitrii',
        x: -2.5,
        y: 1,
        r: 5,
        shotResult: ShotResult.Hit,
        time: new Date().setTime(10000000),
        executionTime: 1000,
        mouseX: 940,
        mouseY: 300,
      },
      {
        id: 1,
        userName: 'dmitrii',
        x: 0,
        y: 5,
        r: 5,
        shotResult: ShotResult.Hit,
        time: new Date().setTime(10000000),
        executionTime: 1000,
        mouseX: 1050,
        mouseY: 170,
      },
    ]);
  }

  addPoint(x: number, y: number, r: number): void {}

  clearPoints(): void {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
