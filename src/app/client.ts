export class Client {

  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public secLastname: string,
    public birthdate: string,
    public secFirstname?: string,
    public companyName?: string,
    public nit?: number,
    public salary?: number,
    public entryDate?: string
  ) {  }

}
