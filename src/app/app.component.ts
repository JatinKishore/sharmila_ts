import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';


  // constructor(private authService: AuthService, private router: Router) {}
  
  // canActivate(): boolean {
  //   if (!this.authService.isLoggedIn()) {
  //     console.error("Session storage is available!!! from app");
  //     return true;
  //   } else {
  //     this.router.navigate(['/']); // Redirect to home or any other page
  //     console.error("Session storage is not available!!."); 
  //     return false;
  //   }
  // }
  
}
