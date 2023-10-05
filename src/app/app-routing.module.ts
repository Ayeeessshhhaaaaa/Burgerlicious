import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './Pages/splash-screen/splash-screen.component';
import { HomeScreenComponent } from './Pages/home-screen/home-screen.component';
import { FeedbackScreenComponent } from './Pages/feedback-screen/feedback-screen.component';
import { FeedbackDetailsScreenComponent } from './Pages/feedback-details-screen/feedback-details-screen.component';
import { FeedbackFormComponent } from './Pages/feedback-form/feedback-form.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminOrderAddComponent } from './admin/admin-orders/admin-order-add/admin-order-add.component';
import { AdminOrderServiceService } from './Services/admin-order-service/admin-order-service.service';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
  { path: 'admin/orders/add', component: AdminOrderAddComponent }
]
const routes: Routes = [
  {
    path: '',
    component: HomeScreenComponent,
  },
  {
    path: 'home',
    component: HomeScreenComponent,
  },
  {
    path: 'feedback',
    component: FeedbackScreenComponent,
  },
  {
    path: 'feedback-details/:ReviewID',
    component: FeedbackDetailsScreenComponent
  },
  {
    path: 'feedback-form',
    component: FeedbackFormComponent
  },
  {
    path: 'admin', 
    component: AdminComponent
  },
 {
    path: 'admin/orders',
    component: AdminOrdersComponent 
 },
  {
   path: 'admin/orders/add', 
    component: AdminOrderAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
