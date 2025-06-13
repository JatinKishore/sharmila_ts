import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowApiComponent } from './show-api/show-api.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostFormComponent } from './post-form/post-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { KitchenItemsComponent } from './kitchen-items/kitchen-items.component';
import { ShowKitchenItemsComponent } from './show-kitchen-items/show-kitchen-items.component';
import { PdfGenerateComponent } from './pdf-generate/pdf-generate.component';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { PayslipFormComponent } from './payslip-form/payslip-form.component';
import { PayslipDetailsComponent } from './payslip-details/payslip-details.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NumberToWordsPipe, ReversePipe } from './custom.pipe';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HomepageComponent } from './homepage/homepage.component';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { UserloginComponent } from './userlogin/userlogin.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
    ShowApiComponent,
    PageNotFoundComponent,
    PostFormComponent,
    KitchenItemsComponent,
    ShowKitchenItemsComponent,
    PdfGenerateComponent,
    EmployeeDetailsComponent,
    PayslipFormComponent,
    PayslipDetailsComponent,
    SidebarComponent,
    NumberToWordsPipe,
    DialogComponent,
    HomepageComponent,
    UserloginComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatRippleModule,
    MatDatepickerModule,
    
  ],
  providers: [
   provideClientHydration(),
   MatNativeDateModule,
   provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }