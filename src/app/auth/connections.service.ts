import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const url="http://localhost:8000/api";

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {
  constructor(private http: HttpClient) { }

  create(data: any): Observable<any>{
    console.log(data);
    let api_URL=url+'/register';  
    return this.http.post(api_URL,data);
  }

  login(data: any):Observable<any>{
    console.log(data);
    let api_URL=url+'/login';
    return this.http.post(api_URL,data);
  }  
  logout(): Observable<any> {
    let api_URL=url+'/logout';
    return this.http.post<any>(api_URL,{});
  }
  getUserProfile(): Observable<any> {
    let api_URL=url+'/profile';
    return this.http.get(api_URL);
  }

  // gtoken(data:any):Observable<any>{
  //   let api_URL=url+'/gverify';
  //   return this.http.post(api_URL,data);
  // }
}
