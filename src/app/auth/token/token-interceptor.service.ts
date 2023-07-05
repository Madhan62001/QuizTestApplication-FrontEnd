import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { ConnectionsService } from '../connections.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  constructor(private connection: ConnectionsService) { }
  intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    console.log("came here");
    const token = localStorage.getItem('token');
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(authRequest);
  }
}
