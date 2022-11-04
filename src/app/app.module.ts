import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule, RoutingComponent} from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {NgxPaginationModule} from "ngx-pagination";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {httpInterceptorProviders} from "./helper/jwt-interceptor";
import { ProductComponent } from './product/product.component';
import {AdminTableComponent} from "./admin-table/admin-table.component";
import {AdminComponent} from "./admin/admin.component";
import {FormCreateProductComponent} from "./form-create-product/form-create-product.component";
import { AboutUsComponent } from './about-us/about-us.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SingleProductComponent } from './single-product/single-product.component';
import {OrderShopComponent} from "./order-shop/order-shop.component";
import {MatExpansionModule} from "@angular/material/expansion";
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {OrderModule} from "ngx-order-pipe";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {ShopComponent} from "./shop/shop.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import { UserDetailComponent } from './user-detail/user-detail.component';
import { OrderCustomerComponent } from './order-customer/order-customer.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RoutingComponent,
    RegisterComponent,
    ProductComponent,
    ShopComponent,
    AdminTableComponent,
    AdminComponent,
    FormCreateProductComponent,
    ShoppingCartComponent,
    AboutUsComponent,
    CheckoutComponent,
    SingleProductComponent,
    OrderShopComponent,
    OrderDetailComponent,
    UserDetailComponent,
    OrderCustomerComponent,
    AdminManageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    // Khởi tạo vào gọi tới Environment được khai báo biến ở trong environment
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    NgxPaginationModule,
    MatExpansionModule,
    OrderModule,
    Ng2SearchPipeModule,

  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
