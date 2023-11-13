import { Component } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { Router } from '@angular/router';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public customer: Customer = new Customer();

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) 
  {}

  createCustomer() {
    this.customerService.checkEmailAvailability(this.customer).subscribe(
      (response) => {
        console.log('Email availability checked successfully:', response);
        this.customerService.createCustomer(this.customer, this.customer.agency).subscribe(
          (response) => {
            console.log('Customer created successfully:', response);
            this.router.navigate(['/login']);
          }
        );
      }
    );
  }

}
