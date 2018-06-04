import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Client } from '../client';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ClientService {

  private clientsURL: string = "https://bancoapp-2b119.firebaseio.com/clients.json";  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  /* GET clients from the server */
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsURL)
      .pipe(
        tap(clients => console.log(`fetched clients`))
      );
  }

  //////// Save methods //////////

  /* POST: add a new client to the server */
  addClient (client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientsURL, JSON.stringify(client), httpOptions)
      .pipe(
        tap(client => console.log(`posted client`))
      );
  }

}
