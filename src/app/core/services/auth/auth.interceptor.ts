// import { Injectable, inject } from '@angular/core';
// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, catchError, throwError } from 'rxjs';

// import { Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   private authService = inject(AuthService);
//   private router = inject(Router);

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {

//     const token = this.authService.getAuthorizationToken();

//   const authReq = req.clone({
//     setHeaders: {
//       ...(token && { Authorization: `Bearer ${token}` }),
//       'ngrok-skip-browser-warning': 'true'
//     }
//   });


//     return next.handle(authReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           this.authService.logout();
//         }
//         return throwError(() => error);
//       })
//     );
//   }
// }
