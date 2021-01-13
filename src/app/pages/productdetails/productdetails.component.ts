import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';
import { AppService } from 'src/app/services/app/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  product: IProduct;
  productId: number;
  constructor(
    public appservice: AppService,
    public activateRout: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.activateRout.params.subscribe(params => {
      this.productId = params.id;
      this.getProduct(this.productId);
    });
  }


  getProduct(id) {
    this.appservice.getProduct(id).subscribe(response => {
      this.product = response;
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
            confirmButtonText: 'Close ',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-primary btn-width-small mx-1'
          },
          });
          this.router.navigate(['/']);
        });
      }
    });
  }
}
