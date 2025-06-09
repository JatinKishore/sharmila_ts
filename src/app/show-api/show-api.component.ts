import { Component} from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute,Router } from '@angular/router';
import { MyServicesService } from '../my-services.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-show-api',
  templateUrl: './show-api.component.html',
  styleUrl: './show-api.component.css',
  
})
export class ShowApiComponent {
 
  posts: any;
  items: any;
  formattedDate:any;

  constructor(private apiService: ApiService,private route:Router, private myService: MyServicesService, public dialog: MatDialog) {}
  ngOnInit() {
    this.list()
    //this.itemList()
  }

  list(){
    this.apiService.getPosts().subscribe(data => {
      this.posts = data;
      //console.log('Fetched data:', data);
    },
    error => {
      console.error('Error fetching data:', error);
    });
  }

  itemList(){
    this.apiService.getItems().subscribe(data => {
      this.items = data;
      //console.log('Fetched data:', data);
    },
    error => {
      console.error('Error fetching data:', error);
    });
  }

  edit(data:any){
    //console.log(data.id);
    this.route.navigate(['/post-form/'+data.id])
  }

  addNewData(){
    this.route.navigate(['/post-form'])
  }

  // delete(data: any){
  // this.apiService.deleteApi(data.id).subscribe(
  //   () => {
  //     //console.log('Data deleted successfully');
  //     this.list()
  //     // Handle success or any further action after deletion
  //   },
  //   error => {
  //     console.error('Error deleting data:', error);
  //     // Handle error
  //   }
  // );
  // }

  openDialog(id:any): void {
    //console.log(id.id)
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { id: id.id, showDataDeleteButton: true } // Sending the ID as part of the data object
    });
  
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      // Add any logic you want to execute after the dialog is closed
    });

    dialogRef.componentInstance.dataDeleted.subscribe(() => {
      this.list(); // Reload the list after deletion
    });
  }

}


