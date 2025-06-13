import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowApiComponent } from './show-api/show-api.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostFormComponent } from './post-form/post-form.component';
import { KitchenItemsComponent } from './kitchen-items/kitchen-items.component';
import { ShowKitchenItemsComponent } from './show-kitchen-items/show-kitchen-items.component';
import { PdfGenerateComponent } from './pdf-generate/pdf-generate.component';
import { PayslipFormComponent } from './payslip-form/payslip-form.component';
import { PayslipDetailsComponent } from './payslip-details/payslip-details.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AuthGuard, LoginGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'auth/login', component: UserloginComponent, canActivate: [LoginGuard]  },
  { path: 'post-result', component: ShowApiComponent,canActivate: [AuthGuard] },
  { path: 'post-kitchen-result', component: ShowKitchenItemsComponent ,canActivate: [AuthGuard]},
  { path: 'post-form', component: PostFormComponent,canActivate: [AuthGuard] },
  { path: 'post-form/:id', component: PostFormComponent ,canActivate: [AuthGuard]},
  { path: 'add-kitchen-items/:id', component: KitchenItemsComponent,canActivate: [AuthGuard] },
  { path: 'add-kitchen-items', component: KitchenItemsComponent,canActivate: [AuthGuard] },
  { path: 'pdf-generate/:id', component: PdfGenerateComponent ,canActivate: [AuthGuard]},
  { path: 'payslip', component: PayslipFormComponent ,canActivate: [AuthGuard]},
  { path: 'payslip-details', component: PayslipDetailsComponent ,canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
