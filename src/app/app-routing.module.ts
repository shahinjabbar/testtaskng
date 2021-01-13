import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ProductdetailsComponent } from './pages/productdetails/productdetails.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'product-details/:id',
    component: ProductdetailsComponent,
  },
  {
    path: 'create-product',
    component: CreateProductComponent,
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
