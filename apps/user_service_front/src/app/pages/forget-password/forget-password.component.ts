import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  constructor(private router: Router, private authService: AuthService) {}

  formObj: string = '';

  async onSubmit() {
    //debugger
    if (this.formObj !== '' && this.isEmail(this.formObj)) {
      await this.authService
        .sendresetemail(this.formObj)
        .subscribe((res: any) => {
          if (res.message) {
            console.log(res.message);
            alert(res.message);
          } else {
            alert(res);
          }
        });
      this.router.navigateByUrl('login');
    } else {
      alert('please enter a valid email');
    }
  }

  isEmail(search: string): boolean {
    var serchfind: boolean;

    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    serchfind = regexp.test(search);

    console.log(serchfind);
    return serchfind;
  }
}
