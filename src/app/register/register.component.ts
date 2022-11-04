import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Customer} from "../model/Customer";
import {Role} from "../model/Role";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../service/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  customer!: Customer;
  role!: Role;
  customerForm!: FormGroup;
  check?: boolean = true;
  p2p?: boolean = true;
  currentCustomer?: any

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

      this.customerForm = this.formGroup.group({
        id: new FormControl(""),
        name: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8)])),
        emailAddress: new FormControl("", Validators.compose([Validators.required, Validators.email])),
        password: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")])),
        phoneNumber: new FormControl("", Validators.compose([Validators.required, Validators.pattern("^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$")])),
        address: new FormControl("", Validators.compose([Validators.required, Validators.minLength(5)])),
        image: new FormControl(""),
        status: new FormControl(""),
        role: new FormControl(""),
      });
    }
  }

  createCustomer(){
    // @ts-ignore
    const repassword = document.getElementById("repassword").value
    let customer = {
      id: this.customerForm.value.id,
      name: this.customerForm.value.name,
      emailAddress: this.customerForm.value.emailAddress,
      password: this.customerForm.value.password,
      phoneNumber: this.customerForm.value.phoneNumber,
      address: this.customerForm.value.address,
      image: "https://znews-photo.zingcdn.me/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg",
      status: 1,
      role:[
        {
          id: 3
        }
      ]
    }
    if (repassword == this.customerForm.value.password){
      this.customerService.createCustomer(customer).subscribe(value => {
          let idCustomer = value.id
          let cart = {
            customer :{
              id : idCustomer
            }
          }
          return this.customerService.createCart(cart).subscribe(value1 => {
            this.p2p = true
            console.log(value1)
            // @ts-ignore
            document.getElementById("repassword").value = ""
            this.createSuccess()
            this.customerForm.reset()
          })
        }, error1 => {
          this.createFail()
        }
      )
    }else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Mật khẩu nhập lại không đúng',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  createSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tạo mới thành công',
      showConfirmButton: false,
      timer: 1500
    }).finally(()=>{
      this.router.navigate(["login"])
    })
  }

  createFail(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Tạo mới thất bại',
      showConfirmButton: false,
      timer: 1500
    })
  }

    checkPassword(){
    // @ts-ignore
    const repassword = document.getElementById("repassword").value
    console.log(repassword)
    const password = this.customerForm.value.password
    console.log(password)
    if (repassword == "" && password == ""){
      this.check = true
    }
    if (repassword != password){
      this.check = false
    }else {
      this.check = true
      this.p2p = false
    }
    console.log(this.check)
  }
}
