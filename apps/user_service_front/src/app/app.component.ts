import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAuthComponent } from './pages/user-auth/user-auth.component';
import { Actions } from '@ngrx/effects';
import { checkAuthStatus } from './auth/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from './auth/auth.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'user_service_front';
  constructor(private store: Store<{ auth: AuthState }>) {}
  ngOnInit(): void {
    this.store.dispatch(checkAuthStatus());
  }
}
