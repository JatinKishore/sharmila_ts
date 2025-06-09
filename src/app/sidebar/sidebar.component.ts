import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // Fix the styleUrl typo
})
export class SidebarComponent implements OnInit {
  hideElements: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute,private user:AuthService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (this.router.url === '/auth/login') {
        this.hideElements = true; // Hide elements if the current route is 'auth/login'
      } else {
        this.hideElements = false; // Show elements for other routes
      }
    });
  }
logout(){
  this.user.logout();
  this.router.navigate(['/auth/login'])
}
}
