import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  
  centered = false;
  month: any;
  posts: any;
  empdata:any;
  postlength: any;
  employeelength: any; 
  
  constructor(private apiService: ApiService) {
  }
  ngOnInit(){
    this.month = new Date();
    this.list();
    this.employeeList();
  }

  list(){
    this.apiService.getPayslipDetails().subscribe(data => {
      this.posts = data;
      this.postlength = this.posts?.data?.length; // Assign the length here
      //console.log('Fetched data:', data);
      //console.log('Fetched data:', this.postlength);
    },
    error => {
      console.error('Error fetching data:', error);
    });
  }

  employeeList(){
    this.apiService.getPosts().subscribe(data => {
      this.empdata = data;
      this.employeelength = this.empdata?.data?.length; // Assign the length here
      //console.log('Fetched data:', data);
    },
    error => {
      console.error('Error fetching data:', error);
    });
  }
  
}
