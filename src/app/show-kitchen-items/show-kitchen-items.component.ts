import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-kitchen-items',
  templateUrl: './show-kitchen-items.component.html',
  styleUrl: './show-kitchen-items.component.css'
})
export class ShowKitchenItemsComponent {
  items: any;



  constructor(private apiService: ApiService,private route:Router) {}
  ngOnInit() {
   this.list()
  }

  list(){
    this.apiService.getItems().subscribe(data => {
      this.items = data;
      //console.log('Fetched data:', data);
    },
    error => {
      console.error('Error fetching data:', error);
    });
  }

  addNewData(){
    this.route.navigate(['/add-kitchen-items'])
  }

  edit(data:any){
    //console.log(data.id);
    this.route.navigate(['/add-kitchen-items/'+data.id])
  }

  deleteData(item: any){
    //console.log(item.id)
    this.apiService.deleteKitchenItemsApi(item.id).subscribe(() => {
      //console.log('Data deleted successfully');
      this.list()
      // Handle success or any further action after deletion
    },
    error => {
      console.error('Error deleting data:', error);
      // Handle error
    })
  }
}
