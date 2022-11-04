import { Component, OnInit } from '@angular/core';
import {Customer} from "../model/Customer";
import {Item} from "../model/Item";
import {DTOItem} from "../model/DTOItem";
import {ProductDTO} from "../model/ProductDTO";
import {CustomerService} from "../service/customer.service";
import {ProductService} from "../service/product.service";
import {CartService} from "../service/cart.service";
import {OrdersService} from "../service/orders.service";
import Swal from "sweetalert2";
import {OrderDetail} from "../model/OrderDetail";
import {CategoryBrand} from "../model/CategoryBrand";
import {CategoryBrandService} from "../service/category-brand.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

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

  roleSize ?: number
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
  constructor(private customerService: CustomerService, private productService: ProductService,
              private cartService: CartService,
              private categoryBrandService: CategoryBrandService,
              private orderService: OrdersService,
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
    this.findCurrentCustomer()
    // this.currentCustomer = localStorage.getItem("currentCustomer")
    this.username = localStorage.getItem("username")
    // this.displayItem()
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

  // Cần thay đổi Id của cửa hàng

  createOrder() {
    // @ts-ignore
    let idShop = parseInt(localStorage.getItem("idShop"))
    // @ts-ignore
    let description = document.getElementById('checkout-mess').value
    let order = {
      description: description,
      customer: {
        id: this.currentCustomer.id
      },
      shop_id: idShop
    }
    // @ts-ignore
    return this.orderService.createOrder(order).subscribe(value => {
      let orderDetails: OrderDetail [] = [];
      let dtoItemCheckOut = this.findItemByShopId()
      console.log(dtoItemCheckOut)
      for (let i = 0; i < dtoItemCheckOut.length; i++) {
        // @ts-ignore
        let quantity = dtoItemCheckOut[i].item.quantity
        // @ts-ignore
        let orderDetail = {
          quantity: quantity,
          orders: {
            id: value.id
          },
          product: {
            id: dtoItemCheckOut[i].item.product.id
          }
        }
        orderDetails.push(orderDetail)
      }
      console.log("Trước khi lưu" + orderDetails)
      return this.orderService.createOrderDetail(orderDetails).subscribe(value1 => {
        console.log(value1)
        // @ts-ignore
        document.getElementById('checkout-mess').value = ""
        for (let i = 0; i < dtoItemCheckOut.length; i++) {
          // @ts-ignore
          this.cartService.deleteItem(dtoItemCheckOut[i].item.id).subscribe(() =>{
            localStorage.removeItem("idShop")
          })
        }
        this.createSuccess()
      })
    })
  }

  createSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Đặt hàng thành công',
      showConfirmButton: false,
      timer: 1500
    }).finally(() =>{
      localStorage.removeItem("idShop")
      this.router.navigate(["/"])
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

  subtotalMoney(): any {
    // @ts-ignore
    let idShop = parseInt(localStorage.getItem("idShop"))
    let DTOItems: DTOItem[] = [];
    let subtotal = 0;
    for (let i = 0; i < this.DTOItems.length; i++) {
      if (this.DTOItems[i].shop_id == idShop) {
        DTOItems.push(this.DTOItems[i])
      }
    }
    for (let i = 0; i < DTOItems.length; i++) {
      // @ts-ignore
      subtotal += DTOItems[i].item.product.price * DTOItems[i].item.quantity
    }
    return subtotal

  }

  totalMoney(): any {
    // @ts-ignore
    let idShop = parseInt(localStorage.getItem("idShop"))
    let total = 0
    let DTOItems: DTOItem[] = [];
    let subtotal = 0;
    for (let i = 0; i < this.DTOItems.length; i++) {
      if (this.DTOItems[i].shop_id == idShop) {
        DTOItems.push(this.DTOItems[i])
      }
    }
    for (let i = 0; i < DTOItems.length; i++) {
      // @ts-ignore
      subtotal += DTOItems[i].item.product.price * DTOItems[i].item.quantity
    }
    if (subtotal > 100000000) {
      total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.3
      this.discountItem = 30
    } else if (subtotal > 50000000) {
      total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.15
      this.discountItem = 15
    } else if (subtotal > 30000000) {
      total = subtotal - subtotal * this.voucherItem / 100 - subtotal * 0.1
      this.discountItem = 10
    } else {
      total = subtotal - subtotal * this.voucherItem / 100
      this.discountItem = 0
    }
    return total;
  }

  discountAutomatic(subtotal: number): any {
    let discountItem = 0
    if (subtotal > 100000000) {
      discountItem = 30
    } else if (subtotal > 50000000) {
      discountItem = 15
    } else if (subtotal > 30000000) {
      discountItem = 10
    } else {
      discountItem = 0
    }
    return discountItem
  }
  logOut(){
    this.customerService.logOutCustomer();
    window.location.replace("http://localhost:4200/login-register")
  }
  findRole(){
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.customerService.findCustomerById(idCustomer).subscribe(value => {
      console.log(value)
      this.roleSize = value.role?.length
    })

  }

}
