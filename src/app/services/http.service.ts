import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  login(serviceName: string, data: any, lang: string){
    const header = new HttpHeaders();
    const options = {header: header, withCredentials: false}
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.post(url, data, options);
  }

  registration(serviceName: string, data: any, lang:string){
    const header = new HttpHeaders();
    const options = {header: header, withCredentials: false};
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.post(url, data, options);
  }

  getDashbord(serviceName: string, data: any, lang: string, acces_token: string){
    const headers = new HttpHeaders()
      .set('Authorization', acces_token);
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.get(url, { 'headers': headers })
  }

  getSales(serviceName: string, lang: string, acces_token: string){
    const headers = new HttpHeaders()
      .set('Authorization', acces_token);
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.get(url, { 'headers': headers })
  }

  getOptions(serviceName: string, lang: string, acces_token: string){
    const headers = new HttpHeaders()
      .set('Authorization', acces_token);
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.get(url, { 'headers': headers })
  }

  saveClient(serviceName: string, data: any, lang: string, acces_token: string){
    const headers = new HttpHeaders()
      .set('Authorization', acces_token);
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.post(url, data, {'headers': headers});
  }

  saveItem(serviceName: string, data: any, lang: string, acces_token: string){
    const headers = new HttpHeaders()
      .set('Authorization', acces_token);
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.post(url, data, {'headers': headers});
  }

  saveEstimate(serviceName: string, data: any, lang: string, acces_token: string){
    const headers = new HttpHeaders()
      .set('Authorization', acces_token);
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    console.log(data);
    return this.httpClient.post(url, data, {'headers': headers});
  }

  resetPassword(serviceName: string, data: any, lang: string){
    const headers = new HttpHeaders();
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.post(url, data, {'headers': headers});
  }

  newSubscription(serviceName: string, data: any, lang: string, acces_token: string){
    const headers = new HttpHeaders()
      .set('Authorization', acces_token);
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.post(url, data, {'headers': headers});
  }

  subscriptionCallBack(serviceName: string, data: any, lang: string, acces_token: string){
    const headers = new HttpHeaders()
      .set('Authorization', acces_token);
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.post(url, data, {'headers': headers});
  }

  createPaymee(){
    const headers = new HttpHeaders()
      .set('Authorization', 'Token 22d3285a517027c19aa0e01e7a695455e2398be8')
      .set('Content-type', 'application/json');
    const url = 'https://sandbox.paymee.tn/api/v1/payments/create'
    console.log(url);
    let data = {
      "vendor": 1460,
      "amount": 12.5,
      "note": "Order #1"
    };
    return this.httpClient.post(url, data, {'headers': headers});
  }

  checkPaymee(token: string){
    const headers = new HttpHeaders()
      .set('Authorization', 'Token 22d3285a517027c19aa0e01e7a695455e2398be8')
      .set('Content-type', 'application/json');
    const url = 'https://sandbox.paymee.tn/api/v1/payments/'+token+'/check';
    console.log(url);
    return this.httpClient.get(url, { 'headers': headers })
  }

  createCompany(serviceName: string, data: any, lang: string, acces_token: string){
    const headers = new HttpHeaders()
      .set('Authorization', acces_token);
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.post(url, data, {'headers': headers});
  }

  client(serviceName: string, lang: string, acces_token: string){
    const headers = new HttpHeaders()
      .set('Authorization', acces_token);
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.get(url, { 'headers': headers })
  }

  logout(serviceName: string, lang: string, acces_token: string){
    const headers = new HttpHeaders()
      .set('Authorization', acces_token);
    const url = environment.apiUrl1 + lang + environment.apiUrl2 + serviceName;
    console.log(url);
    return this.httpClient.post(url, { 'headers': headers })
  }
}
