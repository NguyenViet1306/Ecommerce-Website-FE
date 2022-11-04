import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {CartService} from "../service/cart.service";
import {Item} from "../model/Item";
import Swal from "sweetalert2";
import {ProductDTO} from "../model/ProductDTO";
import {ThemePalette} from "@angular/material/core";
import {CustomerService} from "../service/customer.service";
import {Customer} from "../model/Customer";
import {DTOItem} from "../model/DTOItem";
import {CategoryBrandService} from "../service/category-brand.service";
import {CategoryBrand} from "../model/CategoryBrand";

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

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
  currentCustomer?: any
  items: Item [] = []
  discountItem: number = 0;
  voucherItem: number = 0;
  // Những tài khoản có quyền bán hàng
  listCustomerHaveShop: Customer [] = []
  listProduct: ProductDTO [] = []
  subtotal: number = 0;
  total: number = 0;
  DTOItems: DTOItem [] = []
  idCurrentCustomer : number = 0
  // @ts-ignore
  idCustomerCurrent: number
  // List Shop in Cart
  listShopCurrent: Customer [] = []
  subtasks = {name: 'Warn', completed: false, color: 'warn'}
  categoryBrands: CategoryBrand[] = []
  username?: any
  roleSize ?: number

  constructor(private productService: ProductService,
              private cartService: CartService,
              private customerService: CustomerService,
              private categoryBrandService: CategoryBrandService,
  ) {
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
    this.currentCustomer = localStorage.getItem("currentCustomer")
    const script1 = document.createElement('script');
    script1.src = './assets/js/vendor/modernizr-2.8.3.min.js';
    document.body.appendChild(script1);
    this.username = localStorage.getItem("username")
    this.displayItem()
    this.findAllCustomerHaveShop()
    this.findShopInCart()
    this.findProductByCustomerId()
    this.findAllDTOItem()
    this.displayBrandByCategory()
    this.findRole()

  }



  // Hiển thị Brand và Category
  displayBrandByCategory() {
    return this.categoryBrandService.findAllCategoryAndBrand().subscribe(value => {
      this.categoryBrands = value
      console.log(value)
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

  findAllProductByCategoryIdAndBrandId(idCategory?: number, idBrand?: number) {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.productService.findAllProductByCategoryIdAndBrandId(idCustomer, idCategory, idBrand)
      .subscribe(value => {
        this.listProduct = value
      })
  }

  // Hiển thị danh sách sản phẩm được thêm vào giỏ hàng nhưng chưa được hình thành đơn hàng
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

  // Xóa sản phẩm khỏi Giỏ hàng trước khi được thanh toán (Xóa từng sản phẩm )
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
      this.displayItem()
      // @ts-ignore
      document.getElementById('cart').style.display = "none"
    })
  }


  changePrice(money?: number): any {
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
      // minimumFractionDigits: 2
    })
    if (money != null) {
      return formatter.format(money);
    }
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

  findRole(){
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.customerService.findCustomerById(idCustomer).subscribe(value => {
      console.log(value)
      this.roleSize = value.role?.length
    })

  }
  // Cập nhật số lượng mua hàng
  updateQuantityItem() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.cartService.findAllItemByCustomerId(idCustomer).subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        // @ts-ignore
        let quantity = document.getElementById('' + value[i].product.id).value

        if (quantity != value[i].quantity) {
          // @ts-ignore
          let idCustomer = parseInt(localStorage.getItem("idCustomer"))
          this.cartService.findAllItemByCustomerId(idCustomer).subscribe(value1 => {
            for (let j = 0; j < value1.length; j++) {
              // @ts-ignore
              if (quantity > value1[i].product.amount) {
                // @ts-ignore
                quantity = value1[i].product.amount
              } else { // @ts-ignore
                if (quantity <= 0) {
                  this.cartService.deleteItem(value1[i].id).subscribe()
                }
              }
              // @ts-ignore
              let idProduct = value1[i].product.id
              let item = {
                id: value1[i].id,
                quantity: quantity,
                cart: {
                  id: idCustomer
                },
                product: {
                  id: idProduct
                }
              }
              this.cartService.updateItemToCart(item).subscribe(value1 => {
                this.updateQuantityToCartSuccess()
                // this.displayItem()
                setTimeout(() => {
                  window.location.reload()
                  // this.displayItem()
                }, 1700)
              })
            }
          })
        }
      }
    })

  }



  updateQuantityToCartSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cập nhật giỏ hàng thành công',
      showConfirmButton: false,
      timer: 1500
    })
  }


  selectItem(idItem: any) {
    let listItem: any[] = []
    listItem.push(idItem)
    console.log(listItem)
  }

  // Lấy tổng tiền cho sản phẩm trong Cart
  getTotalItem(idItem: any): any {
    let totalMoney: any;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == idItem) {
        // @ts-ignore
        totalMoney = this.items[i].quantity * this.items[i].product.price
        return totalMoney
      }
    }
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

  // CheckBox

  task: Task = {
    name: 'Chọn tất cả',
    completed: false,
    color: 'primary'
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.subtasks != null && this.subtasks.completed;
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.subtasks.completed && !this.allComplete;

  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.subtasks == null) {
      return;
    }
    this.subtasks.completed = completed;
  }


  // Hiển thị danh sách Item theo ID của Shop

  // Tìm kiếm người dùng có quyền bán hàng
  findAllCustomerHaveShop() {
    return this.customerService.findAllCustomerHaveShop().subscribe(value => {
      // console.log("listCustomerHaveShop" + value)
      this.listCustomerHaveShop = value;
    })
  }

  // Tìm ra list người bán hàng có sản phẩm tồn tại trong Cart của người đang đăng nhập
  findShopInCart() {
    // @ts-ignore
    this.idCustomerCurrent = parseInt(localStorage.getItem("idCustomer"))
    // let shopCurrent: Customer[] = []
    return this.cartService.findListIdShop(this.idCustomerCurrent).subscribe(value => {
      console.log("idShop:" + value)
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < this.listCustomerHaveShop.length; j++) {
          if (value[i] == this.listCustomerHaveShop[j].id) {
            this.listShopCurrent.push(this.listCustomerHaveShop[j])
          }
        }
      }
    })
  }

  //Find All DTOItem.ts theo id của người đang đăng nhập
  findAllDTOItem() {
    // @ts-ignore
    this.idCurrentCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.cartService.findAllDTOItem(this.idCustomerCurrent).subscribe(value => {
      console.log(value)
      this.DTOItems = value
    })
  }

  // Tìm từng Item theo ID của từng cửa hàng có tồn tại trong Cart
  findItemByShopId(idShop ?: number): any {
    let DTOItems: DTOItem[] = [];
    for (let i = 0; i < this.DTOItems.length; i++) {
      if (this.DTOItems[i].shop_id == idShop) {
        DTOItems.push(this.DTOItems[i])
      }
    }
    console.log("List :" + DTOItems)
    return DTOItems;
  }

  subtotalMoney(idShop ?: number): any {
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

  totalMoney(idShop ?: number): any {
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
  // Lưu Id Cửa hàng khi cần thanh toán
  saveIdShop(idShop ?: any){
    localStorage.setItem("idShop",idShop)
  }
  logOut(){
    this.customerService.logOutCustomer();
    window.location.replace("http://localhost:4200/login")
  }

  changeStringToNumber(quantity ?: any): any{
    return parseInt(quantity)
  }


}
