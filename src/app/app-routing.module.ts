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
import { AdminUpdateOrderStatusComponent } from './admin/admin-orders/admin-update-order-status/admin-update-order-status.component';
import { ProductPageComponent } from './Pages/product-page/product-page.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminProductsAddComponent } from './admin/admin-products/admin-products-add/admin-products-add.component';
import { UserPageComponent } from './Pages/user-page/user-page.component';
import { ProductDetailsScreenComponent } from './Pages/product-details-screen/product-details-screen.component';
import { AdminIngredientsUpdateComponent } from './admin/admin-ingredients/admin-ingredients-update/admin-ingredients-update.component';
import { AdminOrderViewComponent } from './admin/admin-orders/admin-order-view/admin-order-view.component';
import { AdminFeedbackComponent } from './admin/admin-feedback/admin-feedback.component';
import { CartComponent } from './Pages/cart/cart.component';
import { AdminOrderUpdateComponent } from './admin/admin-orders/admin-order-update/admin-order-update.component';
import { AdminOrderUpdateItemComponent } from './admin/admin-orders/admin-order-update-item/admin-order-update-item.component';
import { TrackOrderComponent } from './Pages/track-order/track-order.component';
import { AdminIngredientsViewComponent } from './admin/admin-ingredients/admin-ingredients-view/admin-ingredients-view.component';
import { AdminProductsViewComponent } from './admin/admin-products/admin-products-view/admin-products-view.component';
import { AdminProductsUpdateComponent } from './admin/admin-products/admin-products-update/admin-products-update.component';
import { PastOrderComponent } from './Pages/past-order/past-order.component';
import { AdminErrorPageComponent } from './admin/admin-error-page/admin-error-page.component';
import { ViewOrderComponent } from './Pages/view-order/view-order.component';
import { OrderSuccessfullyComponent } from './Pages/order-successfully/order-successfully.component';


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
    path: 'product-details/:ProductID',
    component: ProductDetailsScreenComponent
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
    path: 'admin/login',
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
    path: 'user-page/:id',
    component: UserPageComponent
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
  },
  {
    path: 'admin/orders/updateOrderStatus/:id',
    component: AdminUpdateOrderStatusComponent,
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent
 },
 {
  path: 'admin/products/add', 
   component: AdminProductsAddComponent
 },
 {
  path: 'admin/ingredients/updateIngredient/:id',
  component: AdminIngredientsUpdateComponent,
},
{
  path: 'admin/orders/viewOrder/:id',
  component: AdminOrderViewComponent,
},
{
  path: 'admin/feedback',
  component: AdminFeedbackComponent,
},
{
  path: 'cart', 
  component:  CartComponent
},
{
  path: 'admin/orders/updateOrder/:id',
  component: AdminOrderUpdateComponent,
},
{
  path: 'admin/orders/updateOrderItem/:id',
  component: AdminOrderUpdateItemComponent,
},
{
  path: 'track-order-page/:id',
  component: TrackOrderComponent,
},
{
  path: 'admin/ingredients/viewIngredient/:id',
  component: AdminIngredientsViewComponent,
},
{
  path: 'admin/products/viewProduct/:id',
  component: AdminProductsViewComponent,
},
{
  path: 'admin/products/updateProduct/:id',
  component: AdminProductsUpdateComponent,
},
{
  path: 'past-order/:id',
  component: PastOrderComponent,
},
{
  path: 'admin-error-page',
  component: AdminErrorPageComponent,
},
{
  path: 'view-order/:id',
  component: ViewOrderComponent,
},
{
  path: 'order-successfully/:id',
  component: OrderSuccessfullyComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
