export class Client {

  constructor(
    public id: number,
    public idType: string,
    public firstname: string,
    public lastname: string,
    public secLastname: string,
    public birthdate: string,
    public secFirstname?: string
  ) {  }

}
