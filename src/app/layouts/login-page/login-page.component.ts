import { UserRequest, UserResponse } from './model/user';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  status: string;
  isLogin = false;

  constructor(
    private router : Router,
    private _toastr : ToastrService,
    private httpKlien : HttpClient,
    private titleService : Title,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      username: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required]),
    });

    this.titleService.setTitle('Welcome to Koperasi App | Sign In');

  }

  // checkAccount(username: string, password: string) {
  //   if (this.form.valid) {
  //     document.getElementById('login-loader').style.display = 'inline';
  //     document.getElementById('loader-text').style.display = 'none';
  //     const userAdmin = new User();
  //     userAdmin.userName = username;
  //     userAdmin.userPassword = password;
  //     this.httpKlien.post(environment.urlAuth + '/auth/check-account', userAdmin
  //     ).pipe(map(data => data as StatusChecking))
  //       .subscribe(data => {
  //         if (data.status !== "Username is not valid") {
  //           if (data.status !== "Password is not correct") {
  //             if (data.status !== "Account must verified") {
  //               this.login(username, password);
  //             } else {
  //               this._toastr.error("Some Error", data.status);
  //               document.getElementById('login-loader').style.display = 'none';
  //               document.getElementById('loader-text').style.display = 'inline';
  //               localStorage.setItem('username', userAdmin.userName)
  //               localStorage.setItem('password', userAdmin.userPassword)
  //               this.router.navigate(['/auth/verificate-account']);
  //             }
  //           } else {
  //             this._toastr.error("Some Error", data.status);
  //             document.getElementById('login-loader').style.display = 'none';
  //             document.getElementById('loader-text').style.display = 'inline';
  //           }
  //         } else {
  //           this._toastr.error("Some Error", data.status);
  //           document.getElementById('login-loader').style.display = 'none';
  //           document.getElementById('loader-text').style.display = 'inline';
  //         }
  //       });
  //   } else{
  //     this._toastr.error("Some Error", "Form cannot null");
  //   }
  // }

  login(): void {
    if(this.form.valid){
      document.getElementById('login-loader').style.display = 'inline';
      document.getElementById('loader-text').style.display = 'none';
      const userAdmin = new UserRequest();
      userAdmin.userName = this.form.get("username").value;
      userAdmin.userPassword = this.form.get("password").value;
      console.log(userAdmin)
      this.httpKlien.post(environment.urlAdmin + '/auth/login', userAdmin
      ).pipe(map(data => data as UserResponse))
        .subscribe(data => {
          this.isLogin = data.isValid;
          if (this.isLogin) {
            localStorage.setItem('token', data.tokenKey);
            localStorage.setItem( "currentLogin", JSON.stringify(data.userName));
            this._toastr.success("Anda Berhasil Login");
            this.router.navigate(['/dashboard']);
            document.getElementById('login-loader').style.display = 'none';
            document.getElementById('loader-text').style.display = 'inline';
            // this.service.getData( userAdmin.userName, userAdmin.userPassword).subscribe(data =>{
            //   localStorage.setItem( "currentLogin", JSON.stringify(data.body));
            //   document.getElementById('login-loader').style.display = 'none';
            //   document.getElementById('loader-text').style.display = 'inline';
            // })
          } else {
            this._toastr.error("Login Gagal");
            document.getElementById('login-loader').style.display = 'none';
            document.getElementById('loader-text').style.display = 'inline';
          }
        }, error => {
          this._toastr.error("Login Gagal");
          document.getElementById('login-loader').style.display = 'none';
          document.getElementById('loader-text').style.display = 'inline';
        });
    } else {
      this._toastr.warning("Lengkapi Form")
    }
    }
}
