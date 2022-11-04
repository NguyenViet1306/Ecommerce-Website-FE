import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {ProductDTO} from "../model/ProductDTO";
import {Brand} from "../model/Brand";
import {Item} from "../model/Item";
import {CategoryBrand} from "../model/CategoryBrand";
import {ProductService} from "../service/product.service";
import {CartService} from "../service/cart.service";
import {CategoryBrandService} from "../service/category-brand.service";
import {CustomerService} from "../service/customer.service";
import Swal from "sweetalert2";
import {DTOProductSold} from "../model/DTOProductSold";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentChecked {

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

  // Phân trang
  page: number = 1;
  count: number = 0;
  tableSize: number | undefined = 3;
  tableSizes: any = [3, 6, 9, 12];
  // Phân trang

  roleSize ?: number
  products: ProductDTO [] = []
  brands: Brand [] = []
  total: number = 0;
  items: Item [] = []
  categoryBrands: CategoryBrand[] = []
  listProduct: ProductDTO [] = []
  idCurrentCustomer : number = 0
  currentCustomer?: any
  username?: any
  listProductSold : DTOProductSold[] = []
  constructor(private productService: ProductService,
              private cartService: CartService,
              private categoryBrandService: CategoryBrandService,
              private customerService: CustomerService,
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

  ngAfterContentChecked(): void {
    //
    // const script2 = document.createElement('script');
    // script2.src = './assets/js/vendor/jquery-3.2.1.min.js';
    // document.body.appendChild(script2)

    // const script3 = document.createElement('script');
    // script3.src = './assets/js/jquery.countdown.min.js';
    // document.body.appendChild(script3);

    // const script4 = document.createElement('script');
    // script4.src = './assets/js/jquery.meanmenu.min.js';
    // document.body.appendChild(script4);


    // const script5 = document.createElement('script');
    // script5.src = './assets/js/jquery.scrollUp.js';
    // document.body.appendChild(script5);

    //
    // const script6 = document.createElement('script');
    // script6.src = './assets/js/jquery.nivo.slider.js';
    // document.body.appendChild(script6);


    // const script7 = document.createElement('script');
    // script7.src = './assets/js/jquery.fancybox.min.js';
    // document.body.appendChild(script7);


    // const script8 = document.createElement('script');
    // script8.src = './assets/js/jquery.nice-select.min.js';
    // document.body.appendChild(script8);


    // const script9 = document.createElement('script');
    // script9.src = './assets/js/jquery-ui.min.js';
    // document.body.appendChild(script9);

    //
    // const script10 = document.createElement('script');
    // script10.src = './assets/js/owl.carousel.min.js';
    // document.body.appendChild(script10);


    // const script11 = document.createElement('script');
    // script11.src = './assets/js/popper.min.js';
    // document.body.appendChild(script11);
    //
    //
    // const script12 = document.createElement('script');
    // script12.src = './assets/js/plugins.js';
    // document.body.appendChild(script12);

    //
    // const script13 = document.createElement('script');
    // script13.src = './assets/js/main.js';
    // document.body.appendChild(script13);

  }




  ngOnInit(): void {
    const script1 = document.createElement('script');
    script1.src = './assets/js/vendor/modernizr-3.5.0.min.js';
    document.body.appendChild(script1);
    this.currentCustomer = localStorage.getItem("currentCustomer")
    this.username = localStorage.getItem("username")
    this.displayItem()
    this.findProductByCustomerId()
    this.displayBrandByCategory()
    this.findRole()
    this.findAllSoldByProductId()
  }

  // Tìm số lượng đã bản ra của từng sản phẩm
  findAllSoldByProductId(){
    return this.productService.findAllSoldByProductId().subscribe(value => {
      console.log(value)
      this.listProductSold = value
    })
  }

  findSoldByProductId(idProduct ?: number): any{
    let sold = 0;
    for (let i = 0; i < this.listProductSold.length; i++) {
      if (idProduct == this.listProductSold[i].id){
        // @ts-ignore
        sold = this.listProductSold[i].sold
      }
    }
    return sold
  }

  // Hiển thị Brand và Category
  displayBrandByCategory() {
    return this.categoryBrandService.findAllCategoryAndBrand().subscribe(value => {
      this.categoryBrands = value
      console.log(value)
    })
  }

  //Products của người mua hàng gồm cả người bán hàng nhưng không có sản phẩm của người bán đó
  // Đấy là list Product hiển thị trên trang bán hàng
  findProductByCustomerId() {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    this.productService.findAllProductNotCustomerId(idCustomer).subscribe(value => {
      console.log( value)
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

  //Discount Price
  discountPrice(price?: any, discount?: any): any{
    // @ts-ignore
    return price - price * discount / 100
  }

  addToCart(idProduct?: number) {
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    if (idCustomer == 0){
      this.router.navigate(["login"])
    }else {
      this.cartService.findAllItemByCustomerId(idCustomer).subscribe(value => {
        this.items = value;
        let flag = false;
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].product!.id == idProduct) {
            flag = true;
            // @ts-ignore
            let quantity = this.items[i].quantity + 1;
            // @ts-ignore
            if (quantity > this.items[i].product.amount) {
              // @ts-ignore
              quantity = this.items[i].product.amount
            }
            let item = {
              id: this.items[i].id,
              quantity: quantity,
              cart: {
                id: idCustomer
              },
              product: {
                id: idProduct
              }
            }
            this.cartService.updateItemToCart(item).subscribe(value1 => {
              console.log(value1)
              this.addItemToCartSuccess()
              setTimeout(() => {
                this.displayItem()
              }, 1700)
            })
          }
        }
        if (!flag) {
          let quantity = 1;
          let item = {
            quantity: quantity,
            cart: {
              id: idCustomer
            },
            product: {
              id: idProduct
            }
          }
          this.cartService.saveItemToCart(item).subscribe(value1 => {
            console.log(value1);
            this.addItemToCartSuccess()
            setTimeout(() => {
              this.displayItem()
            }, 1700)
          })
        }
      })
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

  addItemToCartSuccess() {
    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: 'Thêm thành công',
      showConfirmButton: false,
      timer: 1500
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

  //Phân trang sản phẩm
  onTableDataChange(event: any) {
    this.page = event;
    this.findProductByCustomerId();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.findProductByCustomerId();
  }

  changeTableSize(size?:number){
    this.tableSize = size
  }
  //Phân trang sản phẩm

  //Load lại trang
  loadPage(){
    window.location.reload()
  }

  logOut(){
    this.customerService.logOutCustomer();
    window.location.replace("http://localhost:4200/login")
  }

  displayProductsByValue(value: ProductDTO []) {
    this.listProduct = value
  }

  searchByPrice() {
    let idCustomer = localStorage.getItem("idCustomer")
    // @ts-ignore
    let priceMin = document.getElementById("priceMin").value
    // @ts-ignore
    let priceMax = document.getElementById("priceMax").value
    this.productService.findProductByPrice(idCustomer, priceMin, priceMax).subscribe(value => {
      this.displayProductsByValue(value)
    })
  }

  searchByNameProduct() {
    let idCustomer = localStorage.getItem("idCustomer")
    // @ts-ignore
    let name = document.getElementById("searchByName").value
    if (name == null) {
      this.findProductByCustomerId()
    } else {
      this.productService.findProductByName(idCustomer, name).subscribe(value => {

        this.displayProductsByValue(value)
      })
    }
  }


  // Đăng ký bán hàng
  signShop(){
    // @ts-ignore
    let idCustomer = parseInt(localStorage.getItem("idCustomer"))
    return this.customerService.findCustomerById(idCustomer).subscribe(value => {
      let customer = {
        id: value.id,
        name: value.name,
        emailAddress:value.emailAddress,
        password: value.password,
        phoneNumber: value.phoneNumber,
        address: value.address,
        image: value.image,
        status: 2,
        role:[
          {
            id: 3
          }
        ]
      }
      this.customerService.updateCustomer(idCustomer, customer).subscribe(value => {
        console.log(value)
        this.updateSuccess();
      })
    })

  }
  updateSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Chờ xác nhận từ ADMIN',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
