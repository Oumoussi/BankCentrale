import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/models/agency.model';
import { Customer } from 'src/models/customer.model';
import { Director } from 'src/models/director.model';
import { AuthService } from 'src/services/auth.service';
import { CustomerService } from 'src/services/customer.service';
import { DirectorService } from 'src/services/director.service';

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
    private route: ActivatedRoute,
    private router : Router,
    private authService: AuthService, 
    private customerService: CustomerService,
    private directorService: DirectorService
    ) {
      this.authService.director$.subscribe((director) => {
        this.isLoggedIn = !!director;
      });
    }

    ngOnInit() {
      this.authService.director$.subscribe((director) => {
        if (director) {
          var agencyId = this.route.snapshot.paramMap.get('id');
          if (agencyId) this.getCustomers(agencyId);
        }
      });
    }

    getCustomers(id: string) {
      this.customerService.getCustomersByAgencyId(id).subscribe((customers) => {
        this.customers = customers;
      });
    }

    viewCustomerDetails(id: string) {
      this.router.navigate(['customer-details', id]);
    }
}
