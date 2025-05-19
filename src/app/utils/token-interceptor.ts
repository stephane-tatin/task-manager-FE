import { inject } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function tokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  // const cookieService = inject(CookieService);

  // const token = cookieService.get('authToken');
  // console.log('token', token);
  // if (token) {
  // req = req.clone({
  //   setHeaders: {
  //     withCredentials: true,
  //   },
  // });
  // }

  return next(req);
}
