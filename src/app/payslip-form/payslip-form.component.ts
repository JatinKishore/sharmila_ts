import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-payslip-form',
  templateUrl: './payslip-form.component.html',
  styleUrl: './payslip-form.component.css'
})


export class PayslipFormComponent implements OnInit{
  payslipForm!: FormGroup;
  id: any;
  isSubmit: boolean = false;
  payslipdatas: any;
  errorMessage: string = '';
  newdata: any;

  // Set minimum and maximum dates
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  currentMonth: number = this.currentDate.getMonth() + 1;
  minDate: string = `${this.currentYear}-${this.currentMonth.toString().padStart(2, '0')}`;
  maxDate: string = this.minDate;
  daysInMonth!: number;

  

  
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,

  ) {}

  

  ngOnInit(): void {
    this.payslipForm = this.fb.group({
      employeeCode: ['', Validators.required],
      salaryMonth: ['', Validators.required],
      totalWorkedDays: ['', Validators.required],
      tds: ['0'],
      loan: ['0'],
      pf: ['0'],
      leaveDays: ['', Validators.required],
      lopDays: ['0'],
    });

    const salaryMonthControl = this.payslipForm.get('salaryMonth');
  const leaveDaysControl = this.payslipForm.get('leaveDays');
  const lopDaysControl = this.payslipForm.get('lopDays');
  const loanAmount = this.payslipForm.get('loan');
  const pf = this.payslipForm.get('pf');

  console.log('leaveDaysControl:', leaveDaysControl);

  if (salaryMonthControl) {
    salaryMonthControl.valueChanges.subscribe((value) => {
      this.daysInMonth = this.getDaysInMonth(value);
      const leaveDaysValue = leaveDaysControl?.value; // Use optional chaining
      const lopDaysValue = lopDaysControl?.value; // Use optional chaining
      console.log('leaveDaysValue<<<<<<<<<:', leaveDaysValue);
      console.log('lopDaysValue<<<<<<<<<:', lopDaysValue);
      console.log('this.daysInMonth<<<<<<<<<<:', this.daysInMonth);

      const workedDays = this.daysInMonth - (leaveDaysValue + lopDaysValue || 0); // Use 0 as default value
      this.payslipForm.patchValue({ totalWorkedDays: workedDays });
    });
  }

  if (leaveDaysControl && lopDaysControl) {
    merge(
      leaveDaysControl.valueChanges,
      lopDaysControl.valueChanges
    ).subscribe(() => {
      const leaveDaysValue = leaveDaysControl.value || 0;
      const lopDaysValue = lopDaysControl.value || 0;
  
      console.log('leaveDaysValue:', leaveDaysValue);
      console.log('lopDaysValue:', lopDaysValue);
      console.log('this.daysInMonth:', this.daysInMonth);
  
      const workedDays = this.daysInMonth - (leaveDaysValue + lopDaysValue);
      console.log(workedDays)
      this.payslipForm.patchValue({ totalWorkedDays: workedDays });
    });
  }
  
    this.listPayslipData();
  }
  

  

  getDaysInMonth(dateString: string): number {
    const [year, month] = dateString.split('-').map(Number);
    return new Date(year, month, 0).getDate();
  }

  listPayslipData(){
    this.apiService.getUsersForPayslip().subscribe(data => {
      this.payslipdatas = data;
      //console.log('Fetched payslip data:', data);
    },
    error => {
      console.error('Error fetching payslip data:', error);
    });
   }

   

  get formControls() {
    return this.payslipForm.controls;
  }

  

  formSubmit() {

    if (!this.isSubmit) {
      //console.log("date rishwanth"+ JSON.stringify(this.payslipForm.value));
      if (this.id) {
       //console.log("updated date rishwanth"+ JSON.stringify(this.payslipForm.value));

      } else {
        this.isSubmit = true;
        console.log(this.payslipForm)
        this.submitForm();
    //console.log(this.payslipForm.value);

   }
  }
}

submitForm() {
  this.apiService
      .postPayslipForm(this.payslipForm)
      .subscribe(
          (data) => {
              //console.log(data);
              this.newdata = data;
              const newdatas = this.newdata.data.status;
              //console.log(newdatas)
              if (newdatas !== "error") {
                  this.handleSuccess();
              } else {
                  this.handleError('You are Submitting the Employee data is already in exist for this Month');
              }
          },
          (error) => {
              console.error(error);
              this.handleError('You are Submitting the Employee data is already in exist for this Month');
          }
      );
}

handleSuccess() {
  this.payslipForm.reset();
  this.router.navigate(['/payslip-details']);
  //console.log("submit date rishwanth" + JSON.stringify(this.payslipForm.value));
  setTimeout(() => { // SetTimeout for delay
    this.errorMessage = ''; // Clear error message
    this.isSubmit = false; // Reset isSubmit flag after the fade-out animation completes
  }, 4000);
}

handleError(message: string) {
  this.errorMessage = message;
  this.isSubmit = true; // Set isSubmit to true when an error occurs
  setTimeout(() => {
    this.clearErrorMessage();
  }, 4000); // Clear the error message after 4 seconds
}

clearErrorMessage() {
  this.isSubmit = false; // Set isSubmit to false before fade-out animation
  setTimeout(() => {
    this.errorMessage = ''; // Clear the error message after the fade-out animation
  }, 1000); // Wait for 1 second for the fade-out animation to complete
}

onExcelUpload(event: any): void {
  const target = event.target as HTMLInputElement;

  if (!target.files || target.files.length !== 1) {
    alert('Please upload only one file.');
    target.value = '';
    return;
  }

  const file = target.files[0];
  const formData = new FormData();
  formData.append('file', file);

  this.apiService.uploadExcelFile(formData).subscribe({
    next: (res) => {
      console.log('File upload successful:', res);
      this.router.navigate(['/payslip-details']);
    },
    error: (err) => {
      console.error('File upload failed:', err);
      this.handleError('Excel file upload failed.');
      target.value = '';
    }
  });
}






}



