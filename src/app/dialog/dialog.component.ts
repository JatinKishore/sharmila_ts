// dialog.component.ts
import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  dialogData: any; // Define dialogData property
  @Output() dataDeleted = new EventEmitter<void>();
  showPayslipDeleteButton: boolean ;
  showDataDeleteButton:boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService) {
    this.dialogData = data; // Assign data to dialogData property
    //console.log(this.dialogData.id);
    this.showPayslipDeleteButton = data.showPayslipDeleteButton;
    this.showDataDeleteButton = data.showDataDeleteButton;
  }

  delete(data: any){
    //console.log('Delete Payslip Data',data)
    this.apiService.deletePayslipApi(data).subscribe(
      () => {
        //console.log('Data deleted successfully');
        this.dataDeleted.emit();
        // Handle success or any further action after deletion
      },
      error => {
        console.error('Error deleting data:', error);
        // Handle error
      }
    );
    }

    deleteData(data: any){
      //console.log('Delete User Data',data)
      this.apiService.deleteApi(data).subscribe(
        () => {
          //console.log('Data deleted successfully');
          this.dataDeleted.emit();
          // Handle success or any further action after deletion
        },
        error => {
          console.error('Error deleting data:', error);
          // Handle error
        }
      );
      }

}