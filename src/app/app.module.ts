import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import {FormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackbarComponent } from './Components/snackbar/snackbar.component';
import {MatIconModule} from '@angular/material/icon';

import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminOrderAddComponent } from './admin/admin-orders/admin-order-add/admin-order-add.component';
import { AdminOrderServiceService } from './Services/admin-order-service/admin-order-service.service';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
  { path: 'admin/orders/add', component: AdminOrderAddComponent }
]

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
    AdminComponent,
    AdminOrdersComponent,
    AdminOrderAddComponent
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    HttpClientModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(routes)
    MatSnackBarModule,
    MatIconModule,
  ],
  exports: [RouterModule],
  providers: [AdminOrderServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
