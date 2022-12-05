import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Dato } from "./login.model"; 
import { map} from 'rxjs/operators'
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";


@Injectable({providedIn: 'root'})
export class LoginService{
  
    private datos: Dato[] = [];
    private loginUpdate = new Subject<Dato[]>();
    constructor (private http: HttpClient, private router: Router){}
    getPosts(){
        this.http.get<{message: string, datos: any}>('http://localhost:3000/api.posts/Login')
        .pipe(map((postData) => {
            return postData.datos.map(post => {
              return{
              id: post._id,
              usuario: post.usuario,
              email: post.email,
              contraseña: post.contraseña
              };
            });
        }))
        .subscribe((transformedPost)=>{
          this.datos = transformedPost;
          this.loginUpdate.next([...this.datos]);
        });
      }
entrar(user){
  return this.http.post<any>("http://localhost:3000/api.posts/Login", user)

}
getToken(){
  return localStorage.getItem('token')
}
loggedIn(){
  return !!localStorage.getItem('token')
}
}
