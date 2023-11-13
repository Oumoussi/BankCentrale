import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isLoggedIn = false;

  constructor(
    private router : Router,
    private authService: AuthService
    ) {
    this.authService.director$.subscribe((director) => {
      this.isLoggedIn = !!director;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
