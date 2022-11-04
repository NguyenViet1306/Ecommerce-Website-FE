import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProductComponent} from "./product/product.component";
import {AdminTableComponent} from "./admin-table/admin-table.component";
import {AdminComponent} from "./admin/admin.component";
import {HomeComponent} from "./home/home.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {OrderShopComponent} from "./order-shop/order-shop.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {OrderCustomerComponent} from "./order-customer/order-customer.component";
import {AdminManageComponent} from "./admin-manage/admin-manage.component";


const routes: Routes = [
  {
    path: "", component: HomeComponent,
  },
  {
    path: "login", component: LoginComponent,
    children:[
      {
        path: "register", component: RegisterComponent,
      }
    ]
  },
  {
    path: "register", component: RegisterComponent,
    children:[
      {
        path: "login", component: LoginComponent
      }
    ]
  },
  {
    path: "product", component: ProductComponent
  },
  {
    path: "admin-manage", component: AdminManageComponent
  },
  {
    path: "accept-customer", component: AdminManageComponent
  },
  {
    path: "order-customer", component: OrderCustomerComponent
  },
  {
    path: "order-customer", component: OrderCustomerComponent
  },
  {
    path: "admin-table", component: AdminTableComponent,
    children:[
      {
        path: "order-shop", component: OrderShopComponent
      },
      {
        path: "admin", component: AdminComponent
      }
    ]
  },
  {
    path: "admin", component: AdminComponent,
    children:[
      {
        path: "admin-table", component: AdminTableComponent
      },
      {
        path: "order-shop", component: OrderShopComponent
      }
    ]
  },
  {
    path:"shopping-cart", component: ShoppingCartComponent,
    children:[
      {
        path: "order-customer", component: OrderCustomerComponent
      },
      {
        path: "user-detail", component: UserDetailComponent
      },
      {
        path: "admin", component: AdminComponent
      },
      {
        path: "checkout", component: CheckoutComponent
      }
    ]
  },
  {
    path:"about", component: AboutUsComponent
  },
  {
    path:"checkout", component: CheckoutComponent,
    children:[
      {
        path: "order-customer", component: OrderCustomerComponent
      },
      {
        path: "user-detail", component: UserDetailComponent
      },
      {
        path: "admin", component: AdminComponent
      },
      {
        path: "shopping-cart", component: ShoppingCartComponent
      }
    ]
  },
  {
    path:"order-shop", component: OrderShopComponent,
    children:[
      {
        path: "admin", component: AdminComponent
      },
      {
        path: "admin-table", component: AdminTableComponent
      }
    ]
  },

 {

    path:"user-detail", component: UserDetailComponent,
  },

  {
    path: "user-detail", component: UserDetailComponent,
    children:[
      {
        path: "order-customer", component: OrderCustomerComponent
      },
      {
        path: "admin", component: AdminComponent
      },
      {
        path: "shopping-cart", component: ShoppingCartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent =
  [HomeComponent, LoginComponent, RegisterComponent, ProductComponent]
