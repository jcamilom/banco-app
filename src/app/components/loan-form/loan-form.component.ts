import { Component, OnInit }                  from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { maxTodayValidator } from '../../directives/max-today.directive';
import { ClientService } from '../../services/client.service';
import { LoanService } from '../../services/loan.service';

import { Client} from '../../client';
import { Loan } from '../../loan';

const justNumbRegExp = new RegExp('^[0-9]+$');

const errorMsgId0: string = "No es posible solicitar el crédito. El cliente con número de identificación ";
const errorMsgId1: string = " no se encuentra registrado en nuestra base de datos.";
const errorMsgReq: string = "Lo sentimos, usted no cumple con los requisitos "
                               + "adecuados para solicitar un crédito."

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})
export class LoanFormComponent implements OnInit {

  client = new Client(245623364, '', '', '', '', '', 'Servientrega', 12345678, 2000000, '2015-01-15');
  loan = new Loan(4321, 1000);

  loanForm: FormGroup;

  submitted = false;
  submitError = false;
  approvedAmount: number = 0;
  errorMessage: string = "";

  constructor(
    private clientService: ClientService,
    private loanService: LoanService
  ) { }

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

  addLoan(loan: Loan) {
    this.loanService.addLoan(loan)
      .subscribe(resp => console.log(resp));
  }

  onSubmit() {
    console.log("submit!");

    // add loan if client is registered
    this.addLoanIfRegisteredClient();
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

  /** This function get all the clients and add the new loan
  * only if the client is already registered.
  * TODO: Modify the implementation once Firebase is changed to own API
  * with SQL Server
  * The id validation should be done when the input gets a new value
  */
 private addLoanIfRegisteredClient() {
  this.clientService.getClients()
    .subscribe(clients => {
      let exist = false;
      for(let key in clients) {
        if(clients.hasOwnProperty(key)) {
          if(clients[key].id == this.loanForm.value.id) {
            exist = true;
            break;
          }
        }
      }
      if(exist == true) {
        console.log("client already exist");

        // Check if the client gets an approval
        if(this.checkApproval()) {
          // Select range
          this.approvedAmount = 0;
          let salary = this.loanForm.value.salary;
          if(salary > 800000 && salary < 1000000) {
            console.log("credito de $5'000.000");
            this.approvedAmount = 5000000;
          } else if(salary >= 1000000 && salary < 4000000) {
            console.log("credito de $20'000.000");
            this.approvedAmount = 20000000;
          } else if(salary >= 4000000) {
            console.log("credito de $50'000.000");
            this.approvedAmount = 50000000;
          }
          // Calls the addLoan function
          this.loan.id = this.loanForm.value.id;
          this.loan.amount = this.approvedAmount;
          console.log(this.loan);
          this.addLoan(this.loan);
          // Show confirmation message
          this.submitted = true;
        } else {
          console.log("credit not approved");
          // Show error message
          this.errorMessage = errorMsgReq;
          this.submitError = true;
          this.submitted = true;
        }
      } else {
        console.log("the clients doesn't exist in the bank's database");
        // Show error message
        this.errorMessage = errorMsgId0 + this.loanForm.value.id + errorMsgId1;
        this.submitError = true;
        this.submitted = true;
      }
    });
  }

  clearSubmitError() {
    this.submitted = false;
    this.submitError = false;
    this.errorMessage = "";
  }

  get id() { return this.loanForm.get('id'); }

  get companyName() { return this.loanForm.get('companyName'); }

  get nit() { return this.loanForm.get('nit'); }

  get salary() { return this.loanForm.get('salary'); }

  get entryDate() { return this.loanForm.get('entryDate'); }

}
