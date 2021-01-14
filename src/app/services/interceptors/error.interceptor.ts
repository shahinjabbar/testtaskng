import { AppService } from 'src/app/services/app/app.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private appService: AppService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          // pass url in component like : params['navigatorUrl'] = '/hr';
          // tslint:disable-next-line: triple-equals
          if (request.body && request.body.hasOwnProperty('navigatorUrl') && (evt.status == 200 || evt.status === 204 )) {
            Swal.fire({
              title: 'Success!',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Bağla',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-primary btn-width-small mx-1'
            },
            }).then((result) => {
              if (result.value) {
                this.router.navigate([request.body.navigatorUrl]);
              }
            });
          // tslint:disable-next-line: triple-equals
          } else if (evt.status != 200) {
            // Swal.fire({
            //   title: 'Əməliyyatda səhv!',
            //   text: evt.body.responseMessage,
            //   icon: 'warning',
            //   showCancelButton: false,
            //   confirmButtonText: 'Bağla',
            // }).then((result) => {
            //   if (result.value) {
            //     // this.router.navigate(['']);
            //   }
            // });
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {

          try {
            if ([403].indexOf(err.status) !== -1) {
              this.router.navigate(['/home']);
            }
            if ([400].indexOf(err.status) !== -1) {

              // return throwError(err);
            }
            if ([401].indexOf(err.status) !== -1) {
              // auto logout if 401 Unauthorized  Forbidden response returned from api
              localStorage.clear();
              // location.reload();
              this.router.navigate(['/login']);
              return throwError(err);
            } else {

              Swal.fire({
                title: 'Error',
                text: err.error != null ? err.error.errors.Name : '',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'close',
                buttonsStyling: false,
                customClass: {
                  confirmButton: 'btn btn-primary btn-width-small mx-1'
              },
              }).then((result) => {
                if (result.value) {
                  // this.router.navigate(['']);
                }
              });
            }
          } catch (e) {
            const error = err.error.message || err.statusText;
            return throwError(error);
          }
        }
        return of(err);
      }));
  }
}
