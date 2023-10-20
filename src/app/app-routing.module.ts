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
import { AdminAddUserComponent } from './admin/admin-add-user/admin-add-user.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { LoginComponent } from './Pages/login/login.component';
import { CartPageComponent } from './Pages/cart-page/cart-page.component';
import { CustomizeScreenComponent } from './Pages/customize-screen/customize-screen.component';
import { AdminIngredientsAddComponent } from './admin/admin-ingredients/admin-ingredients-add/admin-ingredients-add.component';
import { AdminIngredientsComponent } from './admin/admin-ingredients/admin-ingredients.component';
import { ProductPageComponent } from './Pages/product-page/product-page.component';


const routes: Routes = [
  {
    path: '',
    component: SplashScreenComponent,
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
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cart-page',
    component: CartPageComponent
  },
  {
    path: 'product-page',
    component: ProductPageComponent
  },
  {
    path: 'customize-screen',
    component: CustomizeScreenComponent
  },
 {
    path: 'admin/orders',
    component: AdminOrdersComponent 
 },
  {
   path: 'admin/orders/add', 
    component: AdminOrderAddComponent
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent
  },
  {
    path: 'admin/users/add',
    component: AdminAddUserComponent
  },
  {
    path: 'admin/ingredients',
    component: AdminIngredientsComponent 
 },
 {
  path: 'admin/ingredients/add', 
   component: AdminIngredientsAddComponent
 },
  {
    path: 'customize-screen',
    component: CustomizeScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
