import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import User from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import CryptoJS from 'crypto-js';
import { Constant } from '../../conststnt';
import { Actions } from '@ngrx/effects';
import { loginSuccess } from '../../auth/auth.actions';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  private frontUrl = environment.frontUrl;
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {}

  signUpObj: User = new User('', '', '');
  loginObj: User = new User('', '');

  encriptData(data: any) {
    return CryptoJS.AES.encrypt(data, Constant.EN_KEY).toString();
  }

  onSignup() {
    //debugger;
    let validinput: boolean = true;
    let message: string = '';
    if (this.signUpObj.email == '' || !this.isEmail(this.signUpObj.email)) {
      validinput = false;
      message = 'please enter a valid email';
    } else if (this.signUpObj.password.length <= 6) {
      validinput = false;
      message += '\n please enter a valid password';
    } else if (this.signUpObj.name == '') {
      validinput = false;
      message += '\n please enter a valid name';
    }
    if (validinput) {
      this.authService.signup(this.signUpObj).subscribe((res: any) => {
        //debugger;

        if (res.message) {
          alert(res.message);
          console.log(res.message);
          this.router.navigateByUrl('login');
        } else {
          alert(res);
        }
      });
    } else {
      alert(message);
    }
  }

  onLogin() {
    //debugger;
    let validinput: boolean = true;
    let message: string = '';
    if (this.loginObj.email == '' || !this.isEmail(this.loginObj.email)) {
      validinput = false;
      message = 'please enter a valid email';
    } else if (this.loginObj.password.length <= 6) {
      validinput = false;
      message += '\n please enter a valid password';
    }
    if (validinput) {
      this.authService.login(this.loginObj).subscribe((res: any) => {
        if (res.message) {
          console.log(res.message);
          //alert("Login Success");
          //debugger;
          this.store.dispatch(loginSuccess());
        } else {
          alert(res);
        }
      });
    } else {
      alert(message);
    }
  }

  isEmail(search: string): boolean {
    var serchfind: boolean;

    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    serchfind = regexp.test(search);

    //console.log(serchfind)
    return serchfind;
  }
}
