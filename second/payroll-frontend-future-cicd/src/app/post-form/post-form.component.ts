import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent implements OnInit {
  profileForm!: FormGroup;
  isSubmit: boolean = false;
  isLinear = true;
  salaryDetails!: FormGroup;
  parentForm!: FormGroup;
  id: any;
  salarymatched: any;
  errorMessage: string = '';
  companies = [
    { company_id: 1, value: 'VPRC' },
    { company_id: 2, value: 'BUBBL PAINTS' },
    { company_id: 3, value: 'HEALTHY GROCER' }
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  maxDateOfJoin: string = new Date().toISOString().split('T')[0];
  minDateOfJoin: string = '2018-01-01';
  maxDate: string = '2002-12-31';
  minDate: string = '1950-01-01';

  ngOnInit(): void {

    this.salaryDetails = this.fb.group({
      basicSalary: ['', Validators.required],
      houseRentAllowance: ['', Validators.required],
      conveyance: ['', Validators.required],
      childEduAllowance: ['', Validators.required],
      mediAllowance: ['', Validators.required],
      specialAllowance: ['', Validators.required],
      lta: ['0', Validators.required],
      telephonereimburesement: ['0', Validators.required],
      fuelreimburesement: ['0', Validators.required],
    });
 
    this.profileForm = this.fb.group({
      firstName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern('[a-zA-Z\s]*$')]],
      company_id: ['',[Validators.required]],
      lastName: ['', [Validators.required,Validators.minLength(1),Validators.maxLength(10),Validators.pattern('[a-zA-Z\s]*$')]],
      emailId: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, this.mobileNumberValidator()]],
      dateOfBirth:[ '', Validators.required],
      dateOfJoin: ['', Validators.required],
      employeeCode: ['', Validators.required],
      panNumber: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      bankName: ['', Validators.required],
      bankAccNum: ['', Validators.required],
      designation: ['', Validators.required],
      address: ['', Validators.required],
      salary: ['', Validators.required],
      hikeAmount: ['0'],
    })

    this.parentForm = this.fb.group({
        profileForm : this.profileForm,
        salaryDetails : this.salaryDetails
    });

    //update function
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.apiService.getForm(this.id).subscribe({
        next: (data) => {
          //console.log(data);

   
          const dateOfBirth = data?.data?.dateOfBirth;
          const dateOfJoin = data?.data?.dateOfJoin;
           //console.log(dateOfBirth);

          // //console.log(dateOfBirth)

          const datePartOfBirth = dateOfBirth.split(' ')[0]; // Extract date part
          const datePartOfJoin = dateOfJoin.split(' ')[0]; // Extract date part

          //update the form fields
          this.profileForm.get('firstName')?.setValue(data?.data?.firstName);
          this.profileForm.get('company_id')?.setValue(data?.data?.company_id);
          this.profileForm.get('lastName')?.setValue(data?.data?.lastName);
          this.profileForm.get('emailId')?.setValue(data?.data?.emailId);
          this.profileForm.get('mobileNumber')?.setValue(data?.data?.mobileNumber);
          this.profileForm.get('dateOfBirth')?.setValue(datePartOfBirth);
          this.profileForm.get('dateOfJoin')?.setValue(datePartOfJoin);
          this.profileForm.get('employeeCode')?.setValue(data?.data?.employeeCode);
          this.profileForm.get('panNumber')?.setValue(data?.data?.panNumber);
          this.profileForm.get('bankName')?.setValue(data?.data?.bankName);
          this.profileForm.get('bankAccNum')?.setValue(data?.data?.bankAccNum);
          this.profileForm.get('designation')?.setValue(data?.data?.designation);
          this.profileForm.get('address')?.setValue(data?.data?.address);
          this.profileForm.get('salary')?.setValue(data?.data?.salary);
          this.profileForm.get('hikeAmount')?.setValue(data?.data?.hikeAmount);
          this.salaryDetails.get('basicSalary')?.setValue(data?.data?.basicSalary);
          this.salaryDetails.get('houseRentAllowance')?.setValue(data?.data?.houseRentAllowance);
          this.salaryDetails.get('conveyance')?.setValue(data?.data?.conveyance);
          this.salaryDetails.get('childEduAllowance')?.setValue(data?.data?.childEduAllowance);
          this.salaryDetails.get('mediAllowance')?.setValue(data?.data?.mediAllowance);
          this.salaryDetails.get('specialAllowance')?.setValue(data?.data?.specialAllowance);
          this.salaryDetails.get('lta')?.setValue(data?.data?.lta);
          this.salaryDetails.get('telephonereimburesement')?.setValue(data?.data?.telephonereimburesement);
          this.salaryDetails.get('fuelreimburesement')?.setValue(data?.data?.fuelreimburesement);
        },
      });
    }
  }

  get formControls() {
    return this.profileForm.controls;
  }

  get newFormControls() {
    return this.salaryDetails.controls;
  }

  formSubmit() {

        const basicSalary = this.salaryDetails.get('basicSalary')?.value || 0;
        const houseRentAllowance = this.salaryDetails.get('houseRentAllowance')?.value || 0;
        const conveyance = this.salaryDetails.get('conveyance')?.value || 0;
        const childEduAllowance = this.salaryDetails.get('childEduAllowance')?.value || 0;
        const mediAllowance = this.salaryDetails.get('mediAllowance')?.value || 0;
        const specialAllowance = this.salaryDetails.get('specialAllowance')?.value || 0;
        const lta = this.salaryDetails.get('lta')?.value || 0;
        const telephonereimburesement = this.salaryDetails.get('telephonereimburesement')?.value || 0;
        const fuelreimburesement = this.salaryDetails.get('fuelreimburesement')?.value || 0;
        const totalSalary = basicSalary + houseRentAllowance + conveyance + childEduAllowance + mediAllowance + specialAllowance + Number(lta) + Number(telephonereimburesement) + Number(fuelreimburesement);
        
        const enteredSalary = this.profileForm.get('salary')?.value || 0;

        console.log(totalSalary, enteredSalary)

        if(totalSalary === enteredSalary){
          if (!this.isSubmit) {
            // console.log("date rishwanth"+ JSON.stringify(this.parentForm.value));
            if (this.id) {
              this.apiService
                .updateData(this.parentForm.value, this.id)
                .subscribe((data) =>{
                  
                } );
                this.parentForm.reset();
              this.router.navigate(['/post-result']);
            //console.log("updated date rishwanth"+ JSON.stringify(this.parentForm.value));
      
            } else {
              this.isSubmit = true;
              this.apiService
                .postForm(this.parentForm)
                .subscribe((data) =>{
      
                } );
                this.parentForm.reset();
             this.router.navigate(['/post-result']);
            //console.log("submit date rishwanth"+ JSON.stringify(this.parentForm.value));
      
            }
          }
          console.log(this.parentForm.value);
        }else{
          console.log("entered wrong amount");
          this.handleError('You are entering amounts are different from the Total Salary');

        }

   }

  
   handleError(message: string) {
    this.errorMessage = message;
    this.isSubmit = true; // Set isSubmit to true when an error occurs
    setTimeout(() => {
      this.clearErrorMessage();
    }, 1000); // Clear the error message after 3 seconds
  }
  
  clearErrorMessage() {
    this.isSubmit = false; // Set isSubmit to false before fade-out animation
    setTimeout(() => {
      this.errorMessage = ''; // Clear the error message after the fade-out animation
    }, 1000); // Wait for 1 second for the fade-out animation to complete
  }

   mobileNumberValidator(): any {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && !/^\d{10}$/.test(value)) {
        return { 'invalidMobileNumber': true };
      }
      return null;
    };
  }

}
