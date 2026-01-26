import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  private readonly apiUrl: string = environment.apiUrl;

  #http = inject(HttpClient)
  #router = inject(Router)

  getGeneric<T>(endpoint: string, params?: { [key: string]: any }): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.#http.get<T>(url, { params: httpParams }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  postGeneric<T>(endpoint: string, body?: unknown): Observable<T> {
    console.log('postGeneric')
    const url = `${this.apiUrl}/${endpoint}`;
    return this.#http.post<T>(url, body ?? null).pipe(
      catchError(err => this.handleError(err))
    );
  }

  putGeneric<T>(endpoint: string, body: any): Observable<T> {
    console.log('body',body)
    const url = `${this.apiUrl}/${endpoint}`;
    // const httpOptions = {
    //   headers: new HttpHeaders()
    // }
    return this.#http.put<T>(url, body).pipe(
      catchError(err => this.handleError(err))
    );
  }

  patchGeneric<T>(endpoint: string, body?: unknown, params?: { [key: string]: any }): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;

    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return this.#http.patch<T>(url, body ?? null, { params: httpParams }).pipe(
      catchError(err => this.handleError(err))
    );
  }


  deleteGeneric<T>(endpoint: string, body?: unknown): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    const options = body ? { body } : {};
    return this.#http.delete<T>(url, options).pipe(
      catchError(err => this.handleError(err))
    );
  }

  private handleError(err: any) {
    if (err.status === 401) {
      this.#router.navigate(['/login']);
    }
    return throwError(() => err);
  }

}
