import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = environment.apiUrl


  constructor(private http: HttpClient) { }

  

  getPosts(): Observable<any[]> {
        // Get the JWT token from wherever it's stored (e.g., sessionStorage)
        const token = sessionStorage.getItem('token');
    
        // Set up the headers with the authorization token
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}users`, { headers });
  }
  getUsersForPayslip(): Observable<any[]> {
            const token = sessionStorage.getItem('token');
            const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}payroll`, { headers });
  }

  getPdfData(id:any): Observable<any[]> {
                const token = sessionStorage.getItem('token');
                const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}payroll/payslip/${id}`, { headers });
  }

  getPayslipDetails(): Observable<any[]>{
                    const token = sessionStorage.getItem('token')
                    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}payroll/payroll-details`, { headers })
  }

  getDataByPageDetails(queryParams:any): Observable<any[]>{
                const token = sessionStorage.getItem('token')
                const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
                let params = new HttpParams();
                Object.keys(queryParams).forEach(key => {
                  params = params.append(key, queryParams[key]);
                });
                
                const options = { headers: headers, params: params };
    return this.http.get<any[]>(`${this.apiUrl}payroll/payroll-details-page`,options)
  }

  getItems(): Observable<any[]> {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.apiUrl}post-kitchen-items`,{headers});
  }

  postForm(data: any): Observable<any> {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Replace 'your_api_endpoint' with your actual API endpoint
    const postapiUrl = `${this.apiUrl}users`;
     let formdata = JSON.stringify(data.value);
     //console.log('From Services file'+formdata)
    return this.http.post(postapiUrl, formdata, { headers });
  }

  postUserRegister(data: any): Observable<any> {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Replace 'your_api_endpoint' with your actual API endpoint
    const postapiUrl = `${this.apiUrl}auth/register`;
     let formdata = JSON.stringify(data.value);
     //console.log('From Services file'+formdata)
    return this.http.post(postapiUrl, formdata, { headers });
  }

  postUserLogin(data: any): Observable<any> {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Replace 'your_api_endpoint' with your actual API endpoint
    const postapiUrl = `${this.apiUrl}auth/login`;
     let formdata = JSON.stringify(data.value);
     //console.log('From Services file'+formdata)
    return this.http.post(postapiUrl, formdata, { headers });
  }


  postPayslipForm(data: any): Observable<any> {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Replace 'your_api_endpoint' with your actual API endpoint
    const postapiUrl = `${this.apiUrl}payroll/payslip-calculate`;
     let formdata = JSON.stringify(data.value);
     //console.log('From Services file'+formdata)
    return this.http.post(postapiUrl, formdata, { headers });
  }

  uploadExcelFile(formData: FormData): Observable<any> {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const postapiUrl = `${this.apiUrl}payroll/upload-payroll`;
    return this.http.post(postapiUrl, formData, {headers});
  }
  

  //post kitchen form
  postKitchenForm(data: any): Observable<any> {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Replace 'your_api_endpoint' with your actual API endpoint
    const postapiUrl = `${this.apiUrl}post-kitchen-form`;
     let formdata = JSON.stringify(data.value);
     //console.log(formdata)
    return this.http.post(postapiUrl, formdata, { headers });
  }

  getForm(id: any): Observable<any> {

    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Replace 'your_api_endpoint' with your actual API endpoint
    const postapiUrl = `${this.apiUrl}users/${id}`;

    // //console.log(formdata)
    return this.http.get(postapiUrl, { headers });
  }

  getKitchenForm(id: any): Observable<any> {
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // Replace 'your_api_endpoint' with your actual API endpoint
    const postapiUrl = `${this.apiUrl}getkitchendata/${id}`;

    // //console.log(formdata)
    return this.http.get(postapiUrl, { headers });
  }

deleteApi(id: any): Observable<any>{
  const token = sessionStorage.getItem('token')
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  //console.log(id)
  return this.http.delete(`${this.apiUrl}users/${id}`,{headers})
}

deletePayslipApi(id: any): Observable<any>{
  const token = sessionStorage.getItem('token')
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  //console.log(id)
  return this.http.delete(`${this.apiUrl}payroll/payslip/${id}`,{headers})
}

deleteKitchenItemsApi(data: any): Observable<any>{
  const token = sessionStorage.getItem('token')
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  //console.log(data)
  return this.http.delete(`${this.apiUrl}deletekitchenapi/${data}`,{headers})
}


updateData(data: any, id: string): Observable<any> {
  const token = sessionStorage.getItem('token')
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  //console.log(id)
  //console.log(data)
  return this.http.put(`${this.apiUrl}users/${id}`, data,{headers})
}

updateKitchenData(data: any, id: string): Observable<any> {
  const token = sessionStorage.getItem('token')
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
  //console.log(id)
  //console.log(data)
  return this.http.put(`${this.apiUrl}updatekitchendata/${id}`, data, {headers})
}
}


