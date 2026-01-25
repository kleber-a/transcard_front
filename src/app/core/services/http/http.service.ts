// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { catchError, Observable, throwError } from 'rxjs';
// import { environment } from '../../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpService {

//   constructor() { }

//   private readonly apiUrl: string = environment.API_URL;

//   #http = inject(HttpClient)
//   #router = inject(Router)

//   // ======================
//   // 🔹 GET genérico
//   // ======================
//   getGeneric<T>(endpoint: string, params?: { [key: string]: any }): Observable<T> {
//     const url = `${this.apiUrl}/${endpoint}`;
//     let httpParams = new HttpParams();
//     if (params) {
//       Object.keys(params).forEach(key => {
//         if (params[key] !== null && params[key] !== undefined) {
//           httpParams = httpParams.set(key, params[key]);
//         }
//       });
//     }
//     return this.#http.get<T>(url, { params: httpParams }).pipe(
//       catchError(err => this.handleError(err))
//     );
//   }

//   // ======================
//   // 🔹 GET genérico CEP
//   // ======================

//   getGenericCep<T>(url: string, params?: { [key: string]: any }): Observable<T> {
//     let httpParams = new HttpParams();
//     if (params) {
//       Object.keys(params).forEach(key => {
//         if (params[key] !== null && params[key] !== undefined) {
//           httpParams = httpParams.set(key, params[key]);
//         }
//       });
//     }
//     console.warn('Entrou no generic dentro do http')
//     return this.#http.get<T>(url, { params: httpParams }).pipe(
//       catchError(err => this.handleError(err))
//     );
//   }

//   // ======================
//   // 🔹 POST genérico
//   // ======================
//   postGeneric<T>(endpoint: string, body?: unknown): Observable<T> {
//     console.log('postGeneric')
//     const url = `${this.apiUrl}/${endpoint}`;
//     return this.#http.post<T>(url, body ?? null).pipe(
//       catchError(err => this.handleError(err))
//     );
//   }

//   // ======================
//   // 🔹 PUT genérico
//   // ======================
//   putGeneric<T>(endpoint: string, body: any): Observable<T> {
//     console.log('body',body)
//     const url = `${this.apiUrl}/${endpoint}`;
//     // const httpOptions = {
//     //   headers: new HttpHeaders()
//     // }
//     return this.#http.put<T>(url, body).pipe(
//       catchError(err => this.handleError(err))
//     );
//   }

//   // ======================
//   // 🔹 DELETE genérico
//   // ======================
//   deleteGeneric<T>(endpoint: string): Observable<T> {
//     const url = `${this.apiUrl}/${endpoint}`;
//     return this.#http.delete<T>(url).pipe(
//       catchError(err => this.handleError(err))
//     );
//   }

//   // ======================
//   // 🔹 Tratamento de erros
//   // ======================
//   private handleError(err: any) {
//     if (err.status === 401) {
//       // Se quiser, redireciona para login
//       this.#router.navigate(['/autenticacao/login']);
//     }
//     // Aqui você pode adicionar toast, log, etc.
//     return throwError(() => err);
//   }



//   postJson<T>(endpoint: string, body: any): Observable<T> {
//     const url = `${this.apiUrl}/${endpoint}`;

//     return this.#http.post<T>(url, body, {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json'
//       })
//     }).pipe(
//       catchError(err => this.handleError(err))
//     );
//   }

//   postMultipart<T>(endpoint: string, formData: FormData): Observable<T> {
//     const url = `${this.apiUrl}/${endpoint}`;

//     // NÃO DEFINIR Content-Type AQUI
//     return this.#http.post<T>(url, formData).pipe(
//       catchError(err => this.handleError(err))
//     );
//   }



// }
