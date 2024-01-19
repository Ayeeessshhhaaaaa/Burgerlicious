import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SplashScreenComponent } from './Pages/splash-screen/splash-screen.component';
import { HomeScreenComponent } from './Pages/home-screen/home-screen.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';
import { FeedbackScreenComponent } from './Pages/feedback-screen/feedback-screen.component';
import { FeedbackBlockComponent } from './Components/feedback-block/feedback-block.component';
import { FeedbackDetailsScreenComponent } from './Pages/feedback-details-screen/feedback-details-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { RatingComponent } from './Components/rating/rating.component'; // Import HttpClientModule
import { MatListModule } from '@angular/material/list';
import { FeedbackFormComponent } from './Pages/feedback-form/feedback-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackbarComponent } from './Components/snackbar/snackbar.component';
import {MatIconModule} from '@angular/material/icon';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminOrderAddComponent } from './admin/admin-orders/admin-order-add/admin-order-add.component';
import { AdminOrderServiceService } from './Services/admin-order-service/admin-order-service.service';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminAddUserComponent } from './admin/admin-add-user/admin-add-user.component';
import { CartPageComponent } from './Pages/cart-page/cart-page.component';
import { AdminIngredientsComponent } from './admin/admin-ingredients/admin-ingredients.component';
import { AdminIngredientServiceService } from './Services/admin-ingredient-service/admin-ingredient-service.service';
import { CustomizeScreenComponent } from './Pages/customize-screen/customize-screen.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { AdminIngredientsAddComponent } from './admin/admin-ingredients/admin-ingredients-add/admin-ingredients-add.component';
import { IngredientsSliderComponent } from './Components/ingredients-slider/ingredients-slider.component';
import { PageLoaderComponent } from './Components/page-loader/page-loader.component';
import { FeedbackSearchComponent } from './Components/feedback-search/feedback-search.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminUpdateOrderStatusComponent } from './admin/admin-orders/admin-update-order-status/admin-update-order-status.component';
import { ProductPageComponent } from './Pages/product-page/product-page.component';
import { ProductBlockComponent } from './Components/product-block/product-block.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminProductsAddComponent } from './admin/admin-products/admin-products-add/admin-products-add.component';
import { UserPageComponent } from './Pages/user-page/user-page.component';
import { ProductDetailsScreenComponent } from './Pages/product-details-screen/product-details-screen.component';
import { AdminIngredientsUpdateComponent } from './admin/admin-ingredients/admin-ingredients-update/admin-ingredients-update.component';
import { AdminOrderViewComponent } from './admin/admin-orders/admin-order-view/admin-order-view.component';
import { AdminOrderUpdateComponent } from './admin/admin-orders/admin-order-update/admin-order-update.component';
import { AdminFeedbackComponent } from './admin/admin-feedback/admin-feedback.component';
import { CartComponent } from './Pages/cart/cart.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AdminOrderUpdateItemComponent } from './admin/admin-orders/admin-order-update-item/admin-order-update-item.component';
import { TrackOrderComponent } from './Pages/track-order/track-order.component';
import { AdminIngredientsViewComponent } from './admin/admin-ingredients/admin-ingredients-view/admin-ingredients-view.component';
import { AdminProductsViewComponent } from './admin/admin-products/admin-products-view/admin-products-view.component';
import { AdminProductsUpdateComponent } from './admin/admin-products/admin-products-update/admin-products-update.component';
import { CustomizeConfirmComponent } from './Components/customize-confirm/customize-confirm.component';
import { PastOrderComponent } from './Pages/past-order/past-order.component';
import { PastOrderBlockComponent } from './Components/past-order-block/past-order-block.component';
import { MenuNavbarComponent } from './Components/menu-navbar/menu-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    HomeScreenComponent,
    NavbarComponent,
    FeedbackScreenComponent,
    FeedbackBlockComponent,
    FeedbackDetailsScreenComponent,
    RatingComponent,
    FeedbackFormComponent,
    SnackbarComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    AdminOrdersComponent,
    AdminOrderAddComponent,
    AdminUsersComponent,
    AdminAddUserComponent,
    CartPageComponent,
    SnackbarComponent,
    IngredientsSliderComponent,
    AdminIngredientsComponent,
    AdminNavbarComponent,
    AdminIngredientsAddComponent,
    PageLoaderComponent,
    FeedbackSearchComponent,
    AdminUpdateOrderStatusComponent,
    ProductPageComponent,
    ProductBlockComponent,
    AdminProductsComponent,
    AdminProductsAddComponent,
    UserPageComponent,
    ProductDetailsScreenComponent,
    AdminIngredientsUpdateComponent,
    AdminOrderViewComponent,
    AdminOrderUpdateComponent,
    AdminFeedbackComponent,
    CartComponent,
    AdminOrderUpdateItemComponent,
    TrackOrderComponent,
    AdminIngredientsViewComponent,
    AdminProductsViewComponent,
    AdminProductsUpdateComponent,
    CustomizeConfirmComponent,
    PastOrderComponent,
    PastOrderBlockComponent,
    MenuNavbarComponent,
    CustomizeScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    HttpClientModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    CarouselModule.forRoot(),
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    NoopAnimationsModule
  ],
  exports: [RouterModule],
  providers: [AdminOrderServiceService, AdminIngredientServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
