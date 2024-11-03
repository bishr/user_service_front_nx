import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import User from '../../models/user';
import { checkAuthStatus, logout } from '../../auth/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth/auth.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {}

  users: User[] = [];

  ngOnInit(): void {
    this.store.dispatch(checkAuthStatus());
    /*this.authService.getalluser()
      .subscribe(users => {
        this.users = users;
      });*/
  }

  /*onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
        this.router.navigate(['/login']); // Redirect to login or home page
      },
      error: (err: any) => console.error('Logout failed:', err),
    });
  }*/

  async onLogout() {
    //debugger
    await this.authService.logout().subscribe((res: any) => {
      if (res.message) {
        //debugger
        console.log(res.message);
        alert(res.message);

        this.router.navigate(['/login']);
      } else {
        alert(res);
      }
    });
    this.store.dispatch(logout());
  }
}
