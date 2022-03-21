import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService : AuthService, private router : Router, private _toastr : ToastrService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean> | Promise<boolean> | boolean {
      const allowedRoles = next.data.allowedRoles;
      return this.authService.isAuthorized()
      .pipe(map(data => {
        if(data.roles != null && allowedRoles.some(r => data.roles.includes(r)) && data.isValid){
          return true;
        }else{
          this._toastr.error("Access Denied!!!");
        }
      }))
  }

}
