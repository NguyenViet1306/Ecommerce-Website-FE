import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../service/product.service";
import {CustomerService} from "../service/customer.service";
import {ProductDTO} from "../model/ProductDTO";
import {CartService} from "../service/cart.service";
import {CategoryBrandService} from "../service/category-brand.service";
import {OrdersService} from "../service/orders.service";
import {Customer} from "../model/Customer";
import {Item} from "../model/Item";
import {CategoryBrand} from "../model/CategoryBrand";
import {DTOItem} from "../model/DTOItem";
import Swal from "sweetalert2";
import {DTOComment} from "../model/DTOComment";
import {Comment} from "../model/Comment";
import {CommentService} from "../service/comment.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  idProduct?: number
  idCustomer?: number
  DTOProduct!: ProductDTO
  roleSize ?: number
  currentCustomer!: Customer;
  items: Item [] = [];
  categoryBrands: CategoryBrand[] = []
  total: number = 0;
  subtotal: number = 0;
  discountItem: number = 0;
  voucherItem: number = 0;
  DTOItems: DTOItem [] = [];
  idCurrentCustomer: number = 0;
  listProduct: ProductDTO [] = [];
  username?: any;
  DTOComment?: DTOComment[];
  comment?: Comment;
  displayComment: boolean = true;
  commentForm!: FormGroup
  curDate?: any
  time?: string
  productIdSolds ?: number[]
  checkExist !: boolean


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

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private cartService: CartService,
    private categoryBrandService: CategoryBrandService,
    private orderService: OrdersService,
    private commentService: CommentService,
    private router: ActivatedRoute,
    private formGroup: FormBuilder) {
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

    const script1 = document.createElement('script');
    script1.src = './assets/js/vendor/modernizr-3.5.0.min.js';
    document.body.appendChild(script1);
    this.commentForm = new FormGroup({
      id: new FormControl(""),
      review: new FormControl("", Validators.required),
      time: new FormControl(""),
      product: new FormControl(""),
      customer: new FormControl(""),
    })
    // @ts-ignore
    this.currentCustomer = localStorage.getItem("currentCustomer")
    this.curDate = new Date();
    this.time = this.curDate.getFullYear() + "-" + (this.curDate.getMonth() + 1) + "-" + this.curDate.getDate() + "T" + this.curDate.getHours() + ":" + this.curDate.getMinutes() + ":" + this.curDate.getSeconds()
    console.log(this.time)
    this.username = localStorage.getItem("username")
    // @ts-ignore
    this.idProduct = this.router.snapshot.queryParamMap.get("id")
    // console.log(this.idProduct)
    // @ts-ignore
    this.idCustomer = localStorage.getItem("idCustomer")
    this.productService.detailProduct(this.idCustomer, this.idProduct).subscribe(value => {
      this.DTOProduct = value
      // console.log(this.DTOProduct)
    })
    this.displayComment = true;
    this.displayComments();
    // this.displayBrandByCategory()
    this.findRole()
    this.displayItem()
    this.findProductIdSoldForCustomer()
  }

  displayItem() {
    // @ts-ignore
    this.idCurrentCustomer = parseInt(localStorage.getItem("idCustomer"))
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.cartService.findAllItemByCustomerId(idCustomer).subscribe(value => {
      this.items = value;
      for (let i = 0; i < value.length; i++) {
        // @ts-ignore
        this.total += value[i].quantity * value[i].product.price
      }
    })
  }

  displayComments() {
    this.commentService.findCommentByIdProduct(this.idProduct).subscribe(value => {
      this.DTOComment = value
      if (this.DTOComment.length >= 1) {
        this.displayComment = false;
      }
    })
  }

  createComment() {
    let comment = {
      id: this.commentForm.value.id,
      review: this.commentForm.value.review,
      time: this.commentForm.value.time,
      product: {
        id: this.idProduct
      },
      customer: {
        id: this.idCustomer
      }
    }
    this.commentService.createComment(comment).subscribe(value => {
      this.commentForm.reset()
      this.createCommentSuccess();
    }, error => {
      this.createCommentFail()
    })
  }

  createCommentSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Phản hồi thành công',
      showConfirmButton: false,
      timer: 1500
    }).finally(() => {
      this.displayComments()
    })
  }

  createCommentFail(value?: any) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Phản hồi thất bại',
      showConfirmButton: false,
      timer: 1500
    })
  }

  findRole() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.customerService.findCustomerById(idCustomer).subscribe(value => {
      console.log(value)
      this.roleSize = value.role?.length
    })

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

  changePrice(money?: number): any {
    const formatter = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
    })
    if (money != null) {
      return formatter.format(money);
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

  logOut() {
    this.customerService.logOutCustomer();
    window.location.replace("http://localhost:4200/login")
  }

  findProductIdSoldForCustomer() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.commentService.findProductIdSoldForCustomer(idCustomer).subscribe(value => {
      console.log(value)
      this.productIdSolds = value
    })

  }
  check():any {
    let check = 0
    // @ts-ignore
    for (let i = 0; i < this.productIdSolds?.length; i++) {
      // @ts-ignore
      if (this.productIdSolds[i] == this.idProduct){
        check = 1
      }
    }
    return check
  }
}
