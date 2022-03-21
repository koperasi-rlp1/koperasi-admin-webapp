import { UserResponse, UserRequest } from './model/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router, private toastr : ToastrService, private httpKlien: HttpClient) { }

  public checking(nip : string, username : any){
    let param = new HttpParams();
    param.append("nip", nip);
    param.append("username", username)
    return this.httpKlien.get<any>(`${environment.urlAdmin}/admin/auth/checking/${nip}/${username}`, {observe : 'response'});
  }

  logout(){
    const token = localStorage.getItem("token").toString();
    this.httpKlien.delete(environment.urlAdmin + '/auth/logout/' + token).pipe(map(data => data )).subscribe(resp => {
      localStorage.removeItem('token');
      localStorage.removeItem('currentLogin');
      this.router.navigate(["/sign-in"]);
    });
  }
  // isAuthorized(): Observable<NasabahCheck> {
  //   const token = localStorage.getItem('token');
  //   if( token != null) {
  //       return this.httpKlien.post(environment.urlApi + '/auth/checking', token).pipe(map( data => data as NasabahCheck));
  //   } else {
  //       this.router.navigate(['/auth/signin']);
  //   }
  // }

  isAuthentic(): boolean{
  const token = localStorage.getItem('token');
  let statusLogin : boolean = false;
  if(token != null ){
    statusLogin = true;
  }
    return statusLogin;
  }

  isAuthorized(): Observable<UserResponse> {
    let data = new UserRequest();
    data.tokenKey = localStorage.getItem('token');
    if( data != null) {
        return this.httpKlien.post(environment.urlAdmin + '/auth/checking', data).pipe(map( data => data as UserResponse));
    } else {
        this.router.navigate(['/auth/signin']);
    }
  }
}
