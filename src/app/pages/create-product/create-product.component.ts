import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBrand } from 'src/app/interfaces/IBrand';
import { ICategory } from 'src/app/interfaces/ICategory';
import { AppService } from 'src/app/services/app/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  categories: ICategory;
  selectedCategories: ICategory[] = [];
  brands: IBrand;
  dropdownSettings = {};
  constructor(
    public fb: FormBuilder,
    public appservice: AppService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.createProductForm();
    this.getBrands();
    this.getCategories();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
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
      CategoryIds: [[]],
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
      this.appservice.postProduct(this.productForm.value).subscribe(response => {
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

  getBrands() {
    this.appservice.getBrands().subscribe(response => {
      this.brands = response;
    });
  }

  onItemDeSelect(item: any) {
    const index = this.selectedCategories.indexOf(item.id);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    }
    
  }

  onItemSelect(item: any) {
    this.selectedCategories.push(item.id);
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
