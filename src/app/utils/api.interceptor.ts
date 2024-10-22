import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  let requestUrl = req.url;
  if (requestUrl.indexOf('@api') !== -1) {
    requestUrl = requestUrl.replace('@api', environment.apiUrl);
  }

  return next(req.clone({ url: requestUrl }));
};
