import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBrand } from 'src/app/interfaces/IBrand';
import { ICategory } from 'src/app/interfaces/ICategory';
import { IProduct } from 'src/app/interfaces/IProduct';
import { AppService } from 'src/app/services/app/app.service';

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
    this.appservice.putProduct(this.productId, this.productForm.value).subscribe(response => {
      this.router.navigate(['/']);
    });
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
      
      this.productForm.patchValue({
        Name: this.product.name,
        Featured: this.product.featured,
        ExpirationDate: formatDate(this.product.expirationDate, 'yyyy-mm-dd', 'en'),
        ItemsInStock: this.product.itemsInStock,
        ReceiptDate: this.product.receiptDate,
        Rating: this.product.rating,
        BrandId: this.product.brandName,
        CategoryIds: this.product.categoryNames,
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
  onSelectAll(items: any) {
    items.map(item=>{
      this.selectedCategories.push(item.id)
    })
    console.log(this.selectedCategories);
    
  }


}
