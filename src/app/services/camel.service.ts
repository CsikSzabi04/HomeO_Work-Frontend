import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Camel } from '../models/camel.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CamelService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCamels(): Observable<Camel[]> {
    return this.http.get<Camel[]>(`${this.apiUrl}/camels`)
      .pipe(catchError(this.handleError));
  }

  getCamel(id: number): Observable<Camel> {
    return this.http.get<Camel>(`${this.apiUrl}/camels/${id}`)
      .pipe(catchError(this.handleError));
  }

  createCamel(camel: Camel): Observable<Camel> {
    return this.http.post<Camel>(`${this.apiUrl}/camels`, camel)
      .pipe(catchError(this.handleError));
  }

  updateCamel(id: number, camel: Camel): Observable<Camel> {
    return this.http.put<Camel>(`${this.apiUrl}/camels/${id}`, camel)
      .pipe(catchError(this.handleError));
  }

  deleteCamel(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/camels/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ismeretlen hiba történt!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Hiba: ${error.error.message}`;
    } else {
      errorMessage = `Szerver hiba: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}