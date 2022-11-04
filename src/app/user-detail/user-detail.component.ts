import { Component, OnInit } from '@angular/core';
import {Customer} from "../model/Customer";
import {Item} from "../model/Item";
import {CategoryBrand} from "../model/CategoryBrand";
import {DTOItem} from "../model/DTOItem";
import {ProductDTO} from "../model/ProductDTO";
import {CustomerService} from "../service/customer.service";
import {ProductService} from "../service/product.service";
import {CartService} from "../service/cart.service";
import {CategoryBrandService} from "../service/category-brand.service";
import {OrdersService} from "../service/orders.service";
import Swal from "sweetalert2";
import {OrderDetail} from "../model/OrderDetail";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

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
  myScriptElement12: HTMLScriptElement;

  check?: boolean = true;
  p2p?: boolean = true;
  currentCustomer!: Customer;
  items: Item [] = [];
  categoryBrands: CategoryBrand[] = []
  total: number = 0;
  subtotal: number = 0;
  discountItem: number = 0;
  voucherItem: number = 0;
  DTOItems: DTOItem [] = []
  idCurrentCustomer : number = 0
  listProduct: ProductDTO [] = []
  username?: any
  roleSize ?: number
  selectedImages: any[] = []
  srcImg : any
  customerForm!: FormGroup;
  oldPassStatus :any

  constructor(private customerService: CustomerService, private productService: ProductService,
              private cartService: CartService,
              private categoryBrandService: CategoryBrandService,
              private storage : AngularFireStorage,
              private formGroup: FormBuilder,
              private orderService: OrdersService) {
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


    this.myScriptElement12 = document.createElement("script")
    this.myScriptElement12.src = "./assets/js/bootstrap.min.js";
    document.body.appendChild(this.myScriptElement12)


    this.myScriptElement10 = document.createElement("script")
    this.myScriptElement10.src = "./assets/js/plugins.js";
    document.body.appendChild(this.myScriptElement10)

    this.myScriptElement11 = document.createElement("script")
    this.myScriptElement11.src = "./assets/js/main.js";
    document.body.appendChild(this.myScriptElement11)
  }

  ngOnInit(): void {
    const script1 = document.createElement('script');
    script1.src = './assets/js/vendor/modernizr-2.8.3.min.js';
    document.body.appendChild(script1);
    this.username = localStorage.getItem("username")
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
    this.findCurrentCustomer()

    this.findAllDTOItem()
    this.findItemByShopId()
    this.findProductByCustomerId()
    this.displayBrandByCategory()
    this.displayItem()
    this.findRole()
  }

  // Hiển thị Brand và Category
  displayBrandByCategory() {
    return this.categoryBrandService.findAllCategoryAndBrand().subscribe(value => {
      this.categoryBrands = value
      console.log(value)
    })
  }


  findAllProductByCategoryIdAndBrandId(idCategory?: number, idBrand?: number) {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.productService.findAllProductByCategoryIdAndBrandId(idCustomer, idCategory, idBrand)
      .subscribe(value => {
        this.listProduct = value
      })
  }

  findProductByCategoryId(idCategory?: number) {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.productService.findAllProductByCategoryId(idCategory, idCustomer).subscribe(value => {
      this.listProduct = value;
      console.log(value)
    })
  }

  //Products của người mua hàng gồm cả người bán hàng nhưng không có sản phẩm của người bán đó
  // Đấy là list Product hiển thị trên trang bán hàng
  findProductByCustomerId() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.productService.findAllProductNotCustomerId(idCustomer).subscribe(value => {
      this.listProduct = value
    })
  }
  // Tìm kiếm thông tin người dùng
  findCurrentCustomer() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.customerService.findCustomerById(idCustomer).subscribe(value => {
      this.currentCustomer = value;
      this.srcImg = this.currentCustomer.image
    })
  }
  findImageURLFirst(idProduct: any): any {
    let imageURL: any;
    let flag = false;
    if (idProduct != null) {
      for (let i = 0; i < this.listProduct.length; i++) {
        // @ts-ignore
        if (this.listProduct[i].product.id == idProduct) {
          flag = true
          // @ts-ignore
          imageURL = this.listProduct[i].imageURLS[0]
          return imageURL;
        }
      }
    }
  }
  displayItem() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.cartService.findAllItemByCustomerId(idCustomer).subscribe(value => {
      console.log(value)
      this.items = value;
      this.subtotal = 0;
      for (let i = 0; i < value.length; i++) {
        // @ts-ignore
        this.subtotal += value[i].quantity * value[i].product.price
        this.getTotalMoney(this.subtotal)
      }
    })
  }
  findRole(){
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.customerService.findCustomerById(idCustomer).subscribe(value => {
      console.log(value)
      this.roleSize = value.role?.length
    })

  }

  // Lấy tổng tiền cần thanh toán khi đặt hàng
  getTotalMoney(subtotal: any) {
    if (subtotal > 100000000) {
      this.total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.3
      this.discountItem = 30
    } else if (subtotal > 50000000) {
      this.total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.15
      this.discountItem = 15
    } else if (subtotal > 30000000) {
      this.total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.1
      this.discountItem = 10
    } else {
      this.total = subtotal - subtotal * this.voucherItem / 100
      this.discountItem = 0
    }

  }

  changePrice(money?: number): any {
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    })
    if (money != null) {
      return formatter.format(money);
    }

  }

  // Lấy tổng tiền cho sản phẩm trong Cart
  getTotalItem(idItem: any): any {
    let dtoItems = this.findItemByShopId()
    let totalMoney: any;
    for (let i = 0; i < dtoItems.length; i++) {
      // @ts-ignore
      if (dtoItems[i].item.id == idItem) {
        // @ts-ignore
        totalMoney = dtoItems[i].item.quantity * dtoItems[i].item.product.price
        return totalMoney
      }
    }
  }

  deleteItem(idItem?: number) {
    Swal.fire({
      title: 'Xóa sản phẩm',
      text: "Xóa sản phẩm khỏi giỏ hàng",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.deleteItem(idItem).subscribe(value => {

        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Xóa thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Xóa sản phẩm thành công',
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.ngOnInit()
      // @ts-ignore
      document.getElementById('cart').style.display = "none"

    })

  }


  updateSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cập nhật thành công',
      showConfirmButton: false,
      timer: 1500
    })
  }

  //Find All DTOItem.ts theo id của người đang đăng nhập
  findAllDTOItem() {
    // @ts-ignore
    this.idCurrentCustomer = parseInt(localStorage.getItem("idCustomer"))
    // @ts-ignore
    let idCustomerCurrent = parseInt(localStorage.getItem("idCustomer"))
    return this.cartService.findAllDTOItem(this.idCurrentCustomer).subscribe(value => {
      console.log(value)
      this.DTOItems = value
    })
  }

  findItemByShopId(): any {
    // @ts-ignore
    let idShop = parseInt(localStorage.getItem("idShop"))
    let DTOItems: DTOItem[] = [];
    for (let i = 0; i < this.DTOItems.length; i++) {
      if (this.DTOItems[i].shop_id == idShop) {
        DTOItems.push(this.DTOItems[i])
      }
    }
    return DTOItems;
  }

  logOut(){
    this.customerService.logOutCustomer();
    window.location.replace("http://localhost:4200/login")
  }

  // Thay AVATAR
  createImage()   {
    if (this.selectedImages.length !== 0){

      for (let i = 0; i < this.selectedImages.length; i++) {
        // setInterval(() =>{
        //   console.log("Loading")
        // },1000)
        let selectedImage = this.selectedImages[i];
        var n = Date.now();
        const filePath = `Images/${n}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() =>{
            fileRef.getDownloadURL().subscribe(url => {
              console.log(url)
              this.srcImg = url;
              let customer = {
                id: this.currentCustomer.id,
                name: this.currentCustomer.name,
                emailAddress: this.currentCustomer.emailAddress,
                password: this.currentCustomer.password,
                phoneNumber: this.currentCustomer.phoneNumber,
                address: this.currentCustomer.address,
                image: url,
                status: 1,
                role:[
                  {
                    id: 3
                  }
                ]
              }
              this.customerService.updateProfileCustomer(this.currentCustomer.id, customer).subscribe(value => {
                console.log(value)
                this.updateSuccess();
              })
            });
          })
        ).subscribe()
      }    }
  }

  showPreview(event: any){
    debugger
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
      console.log(this.selectedImages)
    }else {
      this.selectedImages = []
    }
    this.createImage();

  }
  updateProfile(){
    // @ts-ignore
    let address = document.getElementById("address").value
    // @ts-ignore
    let name = document.getElementById("name").value

    let customer = {
      id: this.currentCustomer.id,
      name: name,
      emailAddress: this.currentCustomer.emailAddress,
      password: this.currentCustomer.password,
      phoneNumber: this.currentCustomer.phoneNumber,
      address: address,
      image: this.currentCustomer.image,
      status: 1,
      role: this.currentCustomer.role
    }
    this.customerService.updateProfileCustomer(this.currentCustomer.id, customer).subscribe(value => {
      console.log(value)
      this.updateSuccess()
      setTimeout(()=>{
        window.location.reload()
      },1700)
    })
  }

  updatePassword(){
    // @ts-ignore
    let address = document.getElementById("address").value
    // @ts-ignore
    let name = document.getElementById("name").value
    // @ts-ignore
    const password = document.getElementById("newPass").value
    let customer = {
      id: this.currentCustomer.id,
      name: name,
      emailAddress: this.currentCustomer.emailAddress,
      password: password,
      phoneNumber: this.currentCustomer.phoneNumber,
      address: address,
      image: this.currentCustomer.image,
      status: 1,
      role: this.currentCustomer.role
    }
    this.customerService.updateCustomer(this.currentCustomer.id, customer).subscribe(value => {
      console.log(value)
      this.updateSuccess()
      setTimeout(()=>{
        this.logOut()
      },1700)
    })
  }



  checkPassword(){
    // @ts-ignore
    const repeatPass = document.getElementById("repeatPass").value
    // @ts-ignore
    const oldPass = document.getElementById("oldPass").value
    if (oldPass != this.currentCustomer.password){
      this.oldPassStatus = "Mật khẩu cũ không đúng"
    }
    // @ts-ignore
    const password = document.getElementById("newPass").value
    if (repeatPass == "" && password == ""){
      this.check = true
    }
    if (repeatPass != password){
      this.check = false
    }else {
      this.check = true
      this.p2p = false
    }
    console.log(this.check)
  }
}
