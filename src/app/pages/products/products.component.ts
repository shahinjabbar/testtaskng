import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/IProduct';
import { AppService } from 'src/app/services/app/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products : IProduct
  constructor(
    public appservice: AppService,
  ) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.appservice.getProducts().subscribe(response => {
      this.products = response;
    });
  }

  deleteProduct(id: number): void {
    Swal.fire({
      title: 'Are you sure to delete!?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      buttonsStyling: false,
      customClass: {
        cancelButton: 'btn btn-danger btn-width-small mx-1',
        confirmButton: 'btn btn-success btn-width-small mx-1'
    },
    }).then((result) => {
      if (result.value) {
        this.appservice.deleteProduct(id).subscribe(response => {
          Swal.fire({
            title: 'Succes!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Close',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-primary btn-width-small mx-1'
          },
          });
          this.getProducts()
        });
      }
    });
  }

}
