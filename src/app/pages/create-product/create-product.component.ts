import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBrand } from 'src/app/interfaces/IBrand';
import { ICategory } from 'src/app/interfaces/ICategory';
import { AppService } from 'src/app/services/app/app.service';

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
      ExpirationDate: [''],
      ItemsInStock: [0, [Validators.required]],
      ReceiptDate: [''],
      Rating: [0, [Validators.required]],
      BrandId: [null, [Validators.required]],
      CategoryIds: [[], [Validators.required]],
      // navigatorUrl: ['/subjects/0']
    });
  }


  submit() {
    this.productForm.patchValue({
      CategoryIds: this.selectedCategories
    })
    this.appservice.postProduct(this.productForm.value).subscribe(response => {
      this.router.navigate(['/']);
    });
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

  onItemSelect(item: any) {
    this.selectedCategories.push(item.id)
  }
  onSelectAll(items: any) {
    items.map(item=>{
      this.selectedCategories.push(item.id)
    })
    console.log(this.selectedCategories);
    
  }

}
