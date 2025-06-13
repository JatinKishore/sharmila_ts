import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-payslip-details',
  templateUrl: './payslip-details.component.html',
  styleUrl: './payslip-details.component.css',
 

})




export class PayslipDetailsComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  allposts: any;
  posts: any;
  payslipusername: any;
  filterMonth: string = ''; // Variable to store the month to filter by
  filteredData: any[] = []; // Variable to store the filtered data
  filter: boolean = false;
  filterdata: any;
  //max and min date for filter
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentMonth: number = this.currentDate.getMonth() + 1;
  
  // Set minimum year to 2018
  minYear: number = 2018;
  minDate: string = `${this.minYear}-${this.currentMonth.toString().padStart(2, '0')}`;
  maxDate: string = `${this.currentYear}-${this.currentMonth.toString().padStart(2, '0')}`;

//get pagination data
pagedata :any;
  
// queryParam = {
//   pageSize:10
// }
  constructor(private apiService: ApiService,private route:Router, public dialog: MatDialog) {}
  ngOnInit() {
    this.list() 
  }


  

  list(){
    this.clearFilter()
    this.apiService.getPayslipDetails().subscribe(data => {
       this.allposts = data;  //if we slice use this.allposts = data;
      //  this.ref.detectChanges()
      //console.log('Fetched data:', data);
      if(this.allposts.data.length >= 0){
        const sliced =this.allposts.data.slice(0,50);
        this.posts = {data:sliced}
        //console.log('List data',this.posts);
        
      }
      this.payslipUserName();
    },
    error => {
      console.error('Error fetching data:', error);
    });
  }

  getDataByPage(queryParams:any){
    this.clearFilter()
    //console.log(queryParams)
    this.apiService.getDataByPageDetails(queryParams).subscribe(data => {
      this.posts = data;
      this.payslipUserName();
      //console.log(this.posts);
      
    },
    error => {
      //console.log(error)
    })
  }

  payslipUserName(){
    this.apiService.getUsersForPayslip().subscribe(data => {
      this.payslipusername = data;
      //console.log('User Details Fetched data:', data);
    },
    error => {
      console.error('Error fetching data:', error);
    });
  }

  getUserForPayslip(item:any){
    console.log(item)
  }
  
  applyFilter() {
    this.filter = true;
    this.apiService.getPayslipDetails().subscribe(data => {
        this.filterdata = data;
        //console.log("filter data from all data", data);

        if (this.filterMonth) {
            //console.log(this.filterMonth);
            //console.log(this.posts);

            this.filteredData = this.filterdata.data.filter((item: any) => item.salaryMonth === this.filterMonth);
            //console.log("filtered data from all data", this.filteredData);
        } else {
            this.filteredData = this.filterdata.data; // If no filter is applied, show all data
            this.filter = false;
        }
    });
}


    clearFilter() {
      this.filterMonth = ''; // Clear the filter input by setting it to an empty string
      this.applyFilter(); // Apply the filter again to show all data
      //console.log(this.posts);
      
    }


  generatePayslip(item:any){
    //console.log(item.id);
    const id = item.id
    this.route.navigate([`/pdf-generate/${id}`])
  }


  delete(data: any){
    this.apiService.deletePayslipApi(data.id).subscribe(
      () => {
        //console.log('Data deleted successfully');
        this.list()
        // Handle success or any further action after deletion
      },
      error => {
        console.error('Error deleting data:', error);
        // Handle error
      }
    );
    }

    openDialog(id:any): void {
      //console.log(id.id)
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: { id: id.id, showPayslipDeleteButton: true } // Sending the ID as part of the data object

      });
    
      dialogRef.afterClosed().subscribe((result:any )=> {
        //console.log('The dialog was closed');
        // Add any logic you want to execute after the dialog is closed
      });

      dialogRef.componentInstance.dataDeleted.subscribe(() => {
        this.list(); // Reload the list after deletion
      });
    }



    //pagination

    
}


