import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isLoggedIn = false;

  public loginForm!: FormGroup;
  public submitted = false;
  public error = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.manager$.subscribe((manager) => {
      this.isLoggedIn = !!manager;
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    this.error = false;

    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.getRawValue();
    const email = credentials.email;
    const password = credentials.password;
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/customer-list']);
      },
      (error) => {
        console.error(error);
        this.error = true;
      }
    );
  }
}
