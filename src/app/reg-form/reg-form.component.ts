import { Component, OnInit } from '@angular/core';

import { Client } from '../client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.css']
})
export class RegFormComponent implements OnInit {

  client = new Client(1234, 'Juan', 'Ramirez', 'Zuluaga', '1991-03-21', 'Pablo');

  submitted = false;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => console.log(clients));
  }

  addClient(): void {
    this.clientService.addClient(this.client)
      .subscribe(client => console.log(client));
  }

  onSubmit() {
    this.submitted = true;
    this.addClient();
  }

}
