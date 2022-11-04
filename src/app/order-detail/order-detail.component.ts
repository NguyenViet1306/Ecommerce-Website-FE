import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OrdersService} from "../service/orders.service";
import {ProductDTO} from "../model/ProductDTO";
import {OrderDetail} from "../model/OrderDetail";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  listOrderDetail !: OrderDetail []
  listDTOProduct !: ProductDTO []
  listDTOProductOfOrder !: ProductDTO []
  discountItem = 0
  total = 0
  voucherItem  = 0

  constructor(public dialog: MatDialog,
              private orderService: OrdersService,
              private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.findAllOrderDetailByOrderId()
    this.findAllDTOProductByOrderId()
  }

  clear() {
    localStorage.removeItem("idOrder")
    for (let i = 0; i < this.listDTOProduct.length; i++) {
      localStorage.removeItem("idProductImg"+ this.listDTOProduct[i].product!.id)
    }
  }

  findAllOrderDetailByOrderId() {
    // @ts-ignore
    let idOrder = parseInt(localStorage.getItem("idOrder"))
    return this.orderService.findAllOrderDetailByOrderId(idOrder).subscribe(value => {
      console.log(value)
      this.listOrderDetail = value;
      let totalMoney = 0;
      for (let i = 0; i < value.length; i++) {
        // @ts-ignore
        totalMoney += value[i].product!.price * value[i]!.quantity
      }
      this.total =totalMoney
      if (totalMoney > 100000000) {
        this.total = totalMoney - totalMoney * this.voucherItem / 100 - totalMoney * 0.3
        this.discountItem = 30
      } else if (totalMoney > 50000000) {
        this.total = totalMoney - totalMoney * this.voucherItem / 100 - totalMoney * 0.15
        this.discountItem = 15
      } else if (totalMoney > 30000000) {
        this.total = totalMoney - totalMoney * this.voucherItem / 100 - totalMoney * 0.1
        this.discountItem = 10
      } else {
        this.total = totalMoney - totalMoney * this.voucherItem / 100
        this.discountItem = 0
      }
    })
  }
  findAllDTOProductByOrderId(){
    // @ts-ignore
    let idOrder = parseInt(localStorage.getItem("idOrder"))
    return this.productService.findAllDTOProductByOrderId(idOrder).subscribe(value => {
      console.log(value)
      this.listDTOProductOfOrder = value
      for (let i = 0; i < value.length; i++) {
        // @ts-ignore
        localStorage.setItem("idProductImg"+value[i].product.id,value[i].imageURLS[0])
      }
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
  findImg(idProduct ?: number) :any{
    return localStorage.getItem("idProductImg" + idProduct)
  }

}
