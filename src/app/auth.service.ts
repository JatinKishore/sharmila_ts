// auth.service.ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  isLoggedIn(): boolean {
    //console.log(!!sessionStorage.getItem('token'))
    // Check if the user is logged in by checking if the token exists in sessionStorage
    return !!sessionStorage.getItem('token');
  }
  logout():boolean{
    sessionStorage.clear()
    return true
  }
}
