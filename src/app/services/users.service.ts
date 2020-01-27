import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url:string = "http://localhost:3000/";
  private token:string = "";

  constructor(private http:HttpClient) { 
  }

  public register(username:string,email:string,password:string){
    return this.http.post(this.url+"users/",{
      username:username,
      email:email,
      password:password
    }).toPromise();
  } 

  public login(email:string,password:string){
    return this.http.post(this.url+"users/login",{
      email:email,
      password:password
    }).pipe(
      tap((res:{token:string;}) => {
        let token:string = res.token;
        console.log(res);
        localStorage.setItem("access_token", token);
      })
    );
  }
}
