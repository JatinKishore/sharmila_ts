// auth.guard.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): boolean {

    //console.log('platform id is:  ',this.platformId)
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('token');
      //console.log("Your Token Is ",token)
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          if (decodedToken && decodedToken.hasOwnProperty('exp')) {
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTime) {
              sessionStorage.removeItem('token');
              this.router.navigate(['/auth/login']);
              return false;
            }
            return true;
          } else {
            console.error("Token expiration property 'exp' not found.");
            return false;
          }
        } catch (error) {
          console.error("Error decoding JWT token:", error);
          return false;
        }
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    } else {
      // Handle the case where sessionStorage is not available (e.g., server-side rendering)
      console.error("Session storage is not available.");
      return false;
    }
  }
}


@Injectable({
    providedIn: 'root'
  })
  export class LoginGuard implements CanActivate {
  
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
        try {
          if (!this.authService.isLoggedIn()) {
            return true; // User is not logged in, allow access to the route
          } else {
            // User is logged in, redirect to home or any other page
            this.router.navigate(['/']);
          
            return false;
          }
        } catch (error) {
          // Handle any errors that occur
         // console.error("Session storage is not available!!");
          return false;
        }
      }
  }