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
    return this.http.post<any>(api_URL,{},{withCredentials:true});
  } 

  passuserquiz(data: any):Observable<any>{
    let api_URL=url+'/uquiz';
    return this.http.post(api_URL,data,{withCredentials:true} );
  }

  getQuestions(link:string):Observable<any>{
    let api_URL=url+'/ques';
    return this.http.post(api_URL,{link},{withCredentials:true});
  }

  save(data:any):Observable<any>{
    let api_URL=url+'/save';
    return this.http.post(api_URL,data,{withCredentials:true});
  }

  aiInfo(data:any):Observable<any>{
    let api_URL=url+'/ai';
    return this.http.post(api_URL,data,{withCredentials:true});
  }

  profile():Observable<any>{
    let api_URL=url+'/profile';
    return this.http.post(api_URL,{},{withCredentials:true});
  }

  dsboard():Observable<any>{
    let api_URL=url+'/board';
    return this.http.post(api_URL,{},{withCredentials:true});
  }

  subscription(d:any):Observable<any>{
    let api_URL=url+'/sub';
    return this.http.post(api_URL,d,{withCredentials:true});
  }
}
