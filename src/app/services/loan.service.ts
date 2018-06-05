import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Loan } from '../loan';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class LoanService {

  // URL to web api for loans
  private loansURL: string = "https://bancoapp-2b119.firebaseio.com/loans.json";

  constructor(
    private http: HttpClient
  ) { }


  //////// Save methods //////////

  /* POST: add a new loan to the server */
  addLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.loansURL, JSON.stringify(loan), httpOptions)
      .pipe(
        tap(loan => console.log(`posted loan`))
      );
  }

}
