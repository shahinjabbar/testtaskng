import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpsService } from '../http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService extends HttpsService {

  public PRODUCT = 'product';

  constructor(public http: HttpClient) {
    super();
  }


  public getProducts(params: any = {}): Observable<any> {
    return this.get(this.http, `${this.PRODUCT}`, params);
  }

  public getProduct(id: any): Observable<any> {
    return this.get(this.http, `${this.PRODUCT}/${id}`);
  }

  public deleteProduct(id: any = {}): Observable<any> {
    return this.delete(this.http, `${this.PRODUCT}/${id}`);
  }

  public postProduct(params: any): Observable<any> {
    return this.post(this.http, `${this.PRODUCT}`, params);
  }

  public putProduct(id: any= {},params: any): Observable<any> {
    return this.put(this.http, `${this.PRODUCT}/${id}`, params);
  }

  public getBrands(params: any = {}): Observable<any> {
    return this.get(this.http, `brand`, params);
  }

  public getCategories(params: any = {}): Observable<any> {
    return this.get(this.http, `category`, params);
  }

}
