import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  list(API_URL: string) {
      // returns all users
      return this.http.get(API_URL);
  }

  create(data: any, API_URL: string): Observable<any> {
    return this.http.post(API_URL, data).pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    // Error handling
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
}
}
