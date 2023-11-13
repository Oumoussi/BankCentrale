import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from 'src/models/agency.model';
import { Customer } from 'src/models/customer.model';
import { Manager } from 'src/models/manager.model';
import { AuthService } from 'src/services/auth.service';
import { CustomerService } from 'src/services/customer.service';
import { ManagerService } from 'src/services/manager.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  public isLoggedIn = false;
  agency: Agency | null = null;
  customers: Customer[] = [];
  
  constructor(
    private router : Router,
    private authService: AuthService, 
    private customerService: CustomerService,
    private managerService: ManagerService
    ) {
      this.authService.manager$.subscribe((manager) => {
        this.isLoggedIn = !!manager;
      });
    }

    ngOnInit() {
      this.authService.manager$.subscribe((manager) => {
        if (manager) {
          this.getAgency(manager);
        }
      });
    }

    getAgency(manager: Manager) {
      this.managerService.getAgencyByManagerId(manager.id).subscribe((agency) => {
        this.agency = agency;
        this.getCustomers(this.agency!.id);
      });
    }

    getCustomers(id: string) {
      this.customerService.getCustomersByAgencyId(id).subscribe((customers) => {
        this.customers = customers;
      });
    }
}
