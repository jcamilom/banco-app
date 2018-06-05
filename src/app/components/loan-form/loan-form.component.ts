import { Component, OnInit }                  from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { maxTodayValidator } from '../../directives/max-today.directive';

const justNumbRegExp = new RegExp('^[0-9]+$');

import { Client} from '../../client';
import { Loan } from '../../loan';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})
export class LoanFormComponent implements OnInit {

  client = new Client(245623364, '', '', '', '', '', 'Servientrega', 12345678, 2000000, '2015-01-15');

  loanForm: FormGroup;

  ngOnInit(): void {
    // Generate the maxValue for the date (today)
    /* let todate: string = (new Date).toISOString().split("T")[0]; */

    this.loanForm = new FormGroup({
      'id': new FormControl(this.client.id, [
        Validators.required,
        Validators.pattern(justNumbRegExp)
      ]),
      'companyName': new FormControl(this.client.companyName, Validators.required),
      'nit': new FormControl(this.client.nit, [
        Validators.required,
        Validators.pattern(justNumbRegExp)
      ]),
      'salary': new FormControl(this.client.salary, [
        Validators.required,
        Validators.min(1),
        Validators.max(99999999),
        Validators.pattern(justNumbRegExp)
      ]),
      'entryDate': new FormControl(this.client.entryDate, [
        Validators.required,
        maxTodayValidator()
      ])
    });
  }

  onSubmit() {
    console.log("submit!");
    if(this.checkApproval()) {
      // Select range
      let approvedValue: number;
      let salary = this.loanForm.value.salary;
      if(salary > 800000 && salary < 1000000) {
        console.log("credito de $5'000.000");
        approvedValue = 5000000;
      } else if(salary >= 1000000 && salary < 4000000) {
        console.log("credito de $20'000.000");
        approvedValue = 20000000;
      } else if(salary >= 4000000) {
        console.log("credito de $50'000.000");
        approvedValue = 50000000;
      }
    } else {
      console.log("credit not approved");
    }
  }

  checkApproval(): boolean {
    // Check working period
    if(!this.passWoringPeriod()) {
      return false;
    }
    // Check min salary
    if(this.loanForm.value.salary <= 800000) {
      return false;
    }
    return true;
  }

  passWoringPeriod(): boolean {
    let eDate: any = new Date(this.loanForm.value.entryDate);
    let today: any = new Date();
    let diffDate: any = new Date(today - eDate);
    let minDate: any = new Date(1971, 6); // 6 gives 1 July, 6 months have passed
    return diffDate >= minDate;    
  }

  get id() { return this.loanForm.get('id'); }

  get companyName() { return this.loanForm.get('companyName'); }

  get nit() { return this.loanForm.get('nit'); }

  get salary() { return this.loanForm.get('salary'); }

  get entryDate() { return this.loanForm.get('entryDate'); }

}
