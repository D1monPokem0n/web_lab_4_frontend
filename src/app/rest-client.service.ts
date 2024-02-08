import { Injectable } from '@angular/core';
import { Point, randomPoint } from './point';
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
    return this.http.get<Point[]>(this.pointsUrl + 'all').pipe(
      tap((p) => console.log('points fetched')),
      catchError(this.handleError<Point[]>('getPoints', []))
    );
  }

  addPoint(x: number, y: number, r: number): Observable<Point> {
    return this.http
      .post<Point>(this.pointsUrl + `shot?X=${x}&Y=${y}&R=${r}`, '')
      .pipe(
        tap((p) => console.log('point added', p)),
        catchError(this.handleError<Point>('addPoints', randomPoint()))
      );
  }

  clearPoints(): Observable<Object> {
    return this.http.delete(this.pointsUrl + 'clear').pipe(
      tap((p) => console.log('points cleared')),
      catchError(this.handleError<Point>('clearPoints', undefined))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
