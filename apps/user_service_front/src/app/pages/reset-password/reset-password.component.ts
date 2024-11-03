import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  password: string = '';
  confirmPassword: string = '';
  token: string | null = null;

  ngOnInit(): void {
    this.token = this.activeRoute.snapshot.queryParamMap.get('token');
    //alert('Token:'+ this.token); // Check if token is retrieved
  }

  async onSubmit() {
    //debugger
    if (
      this.password.length > 6 &&
      this.confirmPassword == this.password &&
      this.token != ''
    ) {
      await this.authService
        .resetpassword({ token: this.token, password: this.password })
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
      alert('please enter a valid password');
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
