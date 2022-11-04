import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {CustomerService} from "../service/customer.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Customer} from "../model/Customer";
import {Role} from "../model/Role";
import {first} from "rxjs";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  customer!: Customer
  role!: Role
  loginForm!: FormGroup
  currentCustomer?: any
  idCustomer ?: number
  sizeRole : any

  myScriptElement: HTMLScriptElement;
  myScriptElement1: HTMLScriptElement;
  myScriptElement2: HTMLScriptElement;
  myScriptElement3: HTMLScriptElement;
  myScriptElement4: HTMLScriptElement;
  myScriptElement5: HTMLScriptElement;
  myScriptElement6: HTMLScriptElement;
  myScriptElement7: HTMLScriptElement;
  myScriptElement8: HTMLScriptElement;
  myScriptElement9: HTMLScriptElement;
  myScriptElement10: HTMLScriptElement;
  myScriptElement11: HTMLScriptElement;

  constructor(private customerService: CustomerService,
              private formGroup: FormBuilder,
              private router: Router) {
    this.myScriptElement = document.createElement("script")
    this.myScriptElement.src = "./assets/js/vendor/jquery-3.2.1.min.js";
    document.body.appendChild(this.myScriptElement)

    this.myScriptElement1 = document.createElement("script")
    this.myScriptElement1.src = "./assets/js/jquery.countdown.min.js";
    document.body.appendChild(this.myScriptElement1)

    this.myScriptElement2 = document.createElement("script")
    this.myScriptElement2.src = "./assets/js/jquery.meanmenu.min.js";
    document.body.appendChild(this.myScriptElement2)

    this.myScriptElement3 = document.createElement("script")
    this.myScriptElement3.src = "./assets/js/jquery.scrollUp.js";
    document.body.appendChild(this.myScriptElement3)

    this.myScriptElement4 = document.createElement("script")
    this.myScriptElement4.src = "./assets/js/jquery.nivo.slider.js";
    document.body.appendChild(this.myScriptElement4)

    this.myScriptElement5 = document.createElement("script")
    this.myScriptElement5.src = "./assets/js/jquery.fancybox.min.js";
    document.body.appendChild(this.myScriptElement5)

    this.myScriptElement6 = document.createElement("script")
    this.myScriptElement6.src = "./assets/js/jquery.nice-select.min.js";
    document.body.appendChild(this.myScriptElement6)

    this.myScriptElement7 = document.createElement("script")
    this.myScriptElement7.src = "./assets/js/jquery-ui.min.js";
    document.body.appendChild(this.myScriptElement7)

    this.myScriptElement8 = document.createElement("script")
    this.myScriptElement8.src = "./assets/js/owl.carousel.min.js";
    document.body.appendChild(this.myScriptElement8)

    this.myScriptElement9 = document.createElement("script")
    this.myScriptElement9.src = "./assets/js/popper.min.js";
    document.body.appendChild(this.myScriptElement9)

    this.myScriptElement10 = document.createElement("script")
    this.myScriptElement10.src = "./assets/js/plugins.js";
    document.body.appendChild(this.myScriptElement10)

    this.myScriptElement11 = document.createElement("script")
    this.myScriptElement11.src = "./assets/js/main.js";
    document.body.appendChild(this.myScriptElement11)
  }

  ngOnInit(): void {
    this.currentCustomer = localStorage.getItem("currentCustomer")
    if (this.currentCustomer != null){
      this.router.navigate(["/"])
    }else {
      const script1 = document.createElement('script');
      script1.src = './assets/js/vendor/modernizr-3.5.0.min.js';
      document.body.appendChild(script1);
      this.loginForm = new FormGroup({
        usename: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
      })
    }
  }


  loginCustomer(){
    console.log(this.loginForm.value.usename)
    console.log(this.loginForm.value.password)
    this.customerService.loginCustomer(this.loginForm.value.usename, this.loginForm.value.password)
      .pipe(first())
      .subscribe(value => {
        console.log(value)
        // @ts-ignore
        localStorage.setItem("username", value.username);
        // @ts-ignore
        localStorage.setItem("roles",value.roles[0].authority);
        // @ts-ignore
        localStorage.setItem("idCustomer",value.id);
        // @ts-ignore
        localStorage.setItem("token",value.token);
        // @ts-ignore
        this.loginSuccess(value)
      }, error =>{
        this.loginFail()
      })
  }

  directCustomer(roles?: string){
    if (roles == "ADMIN"){
      this.router.navigate(['admin-manage'])
    }
    if (roles == "SELLER"){
      this.router.navigate(['/'])
    }
    if (roles == "CUSTOMER"){
      this.router.navigate(['/'])
    }
  }

  loginFail(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Tài khoản hoặc mật khẩu không đúng',
      showConfirmButton: false,
      timer: 1500
    })
  }
  loginSuccess(value?: any) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Đăng nhập thành công',
      showConfirmButton: false,
      timer: 1500
    }).finally(()=>{
      this.directCustomer(value.roles[0].authority)
    })
  }
}
