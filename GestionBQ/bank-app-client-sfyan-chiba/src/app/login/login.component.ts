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
    this.authService.customer$.subscribe((customer) => {
      this.isLoggedIn = !!customer;
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
    console.log(email, password);
    this.authService.login(email, password).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        this.error = true;
      }
    );
  }
}
