import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {OrdersService} from "../service/orders.service";
import {Orders} from "../model/Orders";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

import Swal from "sweetalert2";
import {CustomerService} from "../service/customer.service";
import {OrderDetail} from "../model/OrderDetail";
import {ProductService} from "../service/product.service";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailComponent} from "../order-detail/order-detail.component";
import {DTOOrder} from "../model/DTOOrder";



@Component({
  selector: 'app-order-shop',
  templateUrl: './order-shop.component.html',
  styleUrls: ['./order-shop.component.css'],
})

export class OrderShopComponent implements OnInit {


  myScriptElement: HTMLScriptElement;
  myScriptElement1: HTMLScriptElement;
  myScriptElement2: HTMLScriptElement;
  myScriptElement3: HTMLScriptElement;
  myScriptElement4: HTMLScriptElement;
  myScriptElement5: HTMLScriptElement;
  myScriptElement6: HTMLScriptElement;

  status_order = "Chờ xác nhận"
  status_order_1 = "Đã gửi hàng"
  status_order_2 = "Đã nhận được hàng"

  displayedColumns: string[] = ['stt', 'dateOrder', 'dateShip', 'description', 'customer', 'status_order', 'status_pay', 'action'];
  username?: any
  term: string = ""
  dataSource!: MatTableDataSource<DTOOrder> ;
  // dataSource!: MatTableDataSource<Orders> ;
  constructor(private orderService: OrdersService,
              private customerService: CustomerService,
              public dialog: MatDialog) {
    this.myScriptElement = document.createElement("script")
    this.myScriptElement.src = "./assets/admin/vendor/jquery/jquery.min.js";
    document.body.appendChild(this.myScriptElement)

    this.myScriptElement1 = document.createElement("script")
    this.myScriptElement1.src = "./assets/admin/vendor/bootstrap/js/bootstrap.bundle.min.js";
    document.body.appendChild(this.myScriptElement1)

    this.myScriptElement2 = document.createElement("script")
    this.myScriptElement2.src = "./assets/admin/vendor/jquery-easing/jquery.easing.min.js";
    document.body.appendChild(this.myScriptElement2)

    this.myScriptElement3 = document.createElement("script")
    this.myScriptElement3.src = "./assets/admin/js/sb-admin-2.min.js";
    document.body.appendChild(this.myScriptElement3)

    this.myScriptElement4 = document.createElement("script")
    this.myScriptElement4.src = "./assets/admin/vendor/datatables/jquery.dataTables.min.js";
    document.body.appendChild(this.myScriptElement4)

    this.myScriptElement5 = document.createElement("script")
    this.myScriptElement5.src = "./assets/admin/vendor/datatables/dataTables.bootstrap4.min.js";
    document.body.appendChild(this.myScriptElement5)

    this.myScriptElement6 = document.createElement("script")
    this.myScriptElement6.src = "./assets/admin/js/demo/datatables-demo.js";
    document.body.appendChild(this.myScriptElement6)


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    const script1 = document.createElement('link');
    script1.href = "./assets/admin/vendor/fontawesome-free/css/all.min.css";
    script1.rel = "stylesheet";
    script1.type = "text/css";
    document.body.appendChild(script1);

    const script2 = document.createElement('link');
    script2.href = "https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i";
    script2.rel = "stylesheet";
    document.body.appendChild(script2);

    const script3 = document.createElement('link');
    script3.href = "./assets/admin/css/sb-admin-2.min.css";
    script3.rel = "stylesheet";
    document.body.appendChild(script3);
    const script = document.createElement('link');
    script.href = "./assets/admin/vendor/datatables/dataTables.bootstrap4.min.css";
    script.rel = "stylesheet";
    document.body.appendChild(script);
    // const script4 = document.createElement('body');
    // script4.id = "page-top"
    // document.body.appendChild(script4);
    const script5 = document.createElement('link');
    script2.href = "https://use.fontawesome.com/releases/v5.2.0/css/all.css\" integrity=\"sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ\" crossorigin=\"anonymous";
    script2.rel = "stylesheet";
    document.body.appendChild(script5);
    // this.findAllOrderByShopId()
    // this.findAllOrderDetailByShopId()
    this.username = localStorage.getItem("username")
    this.findAllDTOOrderByShopId()
  }

  // Content
  logOut(){
    this.customerService.logOutCustomer();
    window.location.replace("http://localhost:4200/login")
  }
  // findAllOrderByShopId() {
  //   // @ts-ignore
  //   let idShop = parseInt(localStorage.getItem("idCustomer"))
  //   return this.orderService.findAllOrderByShopId(idShop).subscribe(value => {
  //     console.log(value)
  //     this.dataSource = new MatTableDataSource<Orders>(value)
  //     this.dataSource.paginator = this.paginator
  //     this.dataSource.sort = this.sort
  //   })
  // }

  findAllDTOOrderByShopId(){
    // @ts-ignore
    let idShop = parseInt(localStorage.getItem("idCustomer"))
    return this.orderService.findAllDTOOrderByShopId(idShop).subscribe(value => {
      console.log(value)
      this.dataSource = new MatTableDataSource<DTOOrder>(value)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  updateStatusExist(idOrder ?: number) {
    Swal.fire({
      title: 'Bạn có chắc muốn hủy đơn hàng?',
      text: "Dữ liệu sẽ không thể khôi phục!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!',
      cancelButtonText: 'Hủy',
    }).then((result) => {

      if (result.isConfirmed) {
        this.orderService.rejectOrder(idOrder).subscribe(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đã từ chối đơn hàng',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(()=>{
            // this.findAllOrderByShopId()
            this.findAllDTOOrderByShopId()
          } ,1700)
        })

      }
    })

  }

  // Chuyển STATUS_ORDER sang 1 là phần gửi hàng
  updateStatusOrderFirst(idOrder ?: any){
    this.orderService.updateStatusOrder(idOrder).subscribe(value => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Xác nhận đơn hàng thành công',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() =>{
       // this.findAllOrderByShopId()
       this.findAllDTOOrderByShopId()
      },1700)
    })

  }

  // Content
  openDialog(idOrder ?: any) {
    localStorage.setItem("idOrder",idOrder)
    const dialogRef = this.dialog.open(OrderDetailComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
