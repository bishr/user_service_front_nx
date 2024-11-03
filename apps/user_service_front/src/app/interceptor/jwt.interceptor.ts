import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    withCredentials: true, // Important: Allows cookies to be sent with request
  });
  return next(clonedRequest);
};
