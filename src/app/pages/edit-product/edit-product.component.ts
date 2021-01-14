import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBrand } from 'src/app/interfaces/IBrand';
import { ICategory } from 'src/app/interfaces/ICategory';
import { IProduct } from 'src/app/interfaces/IProduct';
import { AppService } from 'src/app/services/app/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productId: number;
  product: IProduct;
  productForm: FormGroup;
  categories: ICategory;
  selectedCategories: ICategory[] = [];
  brands: IBrand;
  dropdownSettings = {};
  constructor(
    public fb: FormBuilder,
    public appservice: AppService,
    public router: Router,
    public activateRout: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activateRout.params.subscribe(params => {
      this.productId = params.id;
      this.getProduct(this.productId);
    });
    this.createProductForm();
    this.getBrands();
    this.getCategories();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
  }

  get formControls() {
    return this.productForm.controls;
  }

  createProductForm() {
    this.productForm = this.fb.group({
      Name: ['', [Validators.required]],
      ExpirationDate: [null],
      ItemsInStock: [0, [Validators.required]],
      ReceiptDate: [null],
      Rating: [0, [Validators.required]],
      BrandId: [null, [Validators.required]],
      CategoryIds: [null, [Validators.required]],
      // navigatorUrl: ['/subjects/0']
    });
  }
  submit() {
    if (this.selectedCategories.length == 0) {
      this.selectedCategories = null
    }
    this.productForm.patchValue({
      CategoryIds: this.selectedCategories
    })
    if(this.productForm.valid){
      this.appservice.putProduct(this.productId, this.productForm.value).subscribe(response => {
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
        this.router.navigate(['/']);
      });
    }
    else{
      Swal.fire({
        title: 'You should select Brand!',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Close',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-primary btn-width-small mx-1'
      },
      });
    }
  }



  getCategories() {
    this.appservice.getCategories().subscribe(response => {
      this.categories = response;
    });
  }

  getProduct(id) {
    this.appservice.getProduct(id).subscribe(response => {
      this.product = response;
      console.log(this.product);
      this.selectedCategories = this.product.categories.map(item=> item.id);
      this.productForm.patchValue({
        Name: this.product.name,
        Featured: this.product.featured,
        ExpirationDate: this.product.expirationDate,
        ItemsInStock: this.product.itemsInStock,
        ReceiptDate: this.product.receiptDate,
        Rating: this.product.rating,
        BrandId: this.product.brand.id,
        CategoryIds: this.product.categories,
      })
    });
  }

  getBrands() {
    this.appservice.getBrands().subscribe(response => {
      this.brands = response;
    });
  }

  onItemSelect(item: any) {
    this.selectedCategories.push(item.id)
  }

  onItemDeSelect(item: any) {
    const index = this.selectedCategories.indexOf(item.id);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    }
    console.log(this.selectedCategories);
    
  }

  onSelectAll(items: any) {
    items.map(item=>{
      this.selectedCategories.push(item.id)
    })
    console.log(this.selectedCategories);
    
  }

  onDeSelectAll(items: any) {
    this.selectedCategories = []    
  }

}
