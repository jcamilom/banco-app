import { Component, OnInit } from '@angular/core';

import { Client } from '../../client';
import { ClientService } from '../../services/client.service';

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

  private getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => console.log(clients));
  }

  private addClient(): void {
    this.clientService.addClient(this.client)
      .subscribe(client => console.log(client));
  }

  onSubmit() {
    this.submitted = true;
    // Add client if not exist
    this.addClientIfNotExist();
  }

  /** This function get all the clients and add the new client
  * only if it doesn't exist already.
  * TODO: Modify the implementation once Firebase is changed to own API
  * with SQL Server
  * The id validation should be done when the input gets a new value
  */
  private addClientIfNotExist() {
    this.clientService.getClients()
      .subscribe(clients => {
        let exist = false;
        for(let key in clients) {
          if(clients.hasOwnProperty(key)) {
            if(clients[key].id == this.client.id) {
              exist = true;
              break;
            }
          }
        }
        if(exist == true) {
          console.log("client already exist");
        } else {
          this.addClient();
        }
      });
  }

}