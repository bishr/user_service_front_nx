import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import User from '../../models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../auth/auth.model';
import { checkAuthStatus } from '../../auth/auth.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  //isAuthenticated$: Observable<boolean> ;
  users: User[] = [];
  constructor(
    private store: Store<{ auth: AuthState }>,
    private authService: AuthService
  ) {
    //this.isAuthenticated$ = this.store.pipe(select((state) => state.auth.isAuthenticated));
  }

  ngOnInit(): void {
    this.store.dispatch(checkAuthStatus());
    this.authService.getalluser().subscribe((users) => {
      this.users = users;
    });
  }
}
