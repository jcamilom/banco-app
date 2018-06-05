import { Component, OnInit } from '@angular/core';

import { Client } from '../../client';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})
export class LoanFormComponent implements OnInit {

  client = new Client(0, '', '', '', '', '', 'Servientrega', 12345678, 2000000, '2015-01-15')

  constructor() { }

  ngOnInit() {
  }

}
