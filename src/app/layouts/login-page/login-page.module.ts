import { LoginPageRoutingModule } from './login-page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,  RouterModule.forChild(LoginPageRoutingModule),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginPageModule { }
