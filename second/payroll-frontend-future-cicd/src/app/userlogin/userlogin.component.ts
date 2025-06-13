import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent {
  loginForm!: FormGroup;
  isSubmit: boolean = false;
  id: any;
  errorMessage: string = '';
  newdata: any;


  constructor(private fb: FormBuilder, private apiService: ApiService,private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ["", [Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ["", Validators.required],

    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  formSubmit() {

    if (!this.isSubmit) {
     
      if (this.id) {
      console.log("updated date rishwanth"+ JSON.stringify(this.loginForm.value));

      } else {
        this.isSubmit = true;
        this.submitForm();
    console.log(this.loginForm.value);

   }
  }
}

submitForm() {
  this.apiService
      .postUserLogin(this.loginForm)
      .subscribe(
          (data) => {
              
              this.newdata = data;
              const newdatas = this.newdata.data.status;
              
              if (newdatas !== "error") {
                  this.handleSuccess();
                  sessionStorage.setItem('token', this.newdata.data.token);
              } else {
                  this.handleError('Invalid Username Or Password');
              }
          },
          (error) => {
              console.error(error);
              this.handleError('Invalid Username Or Password');
          }
      );
}

handleSuccess() {

  this.loginForm.reset();
  this.router.navigate(['/']);
  console.log("submit date rishwanth" + JSON.stringify(this.loginForm.value));
  setTimeout(() => { // SetTimeout for delay
    this.errorMessage = ''; // Clear error message
    this.isSubmit = false; // Reset isSubmit flag after the fade-out animation completes
  }, 1000);
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

}
