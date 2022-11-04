import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
// @ts-ignore
import {DTOComment} from "../model/DTOComment";
// @ts-ignore
import {Comment} from "../model/Comment";



@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  findAllComment(): Observable<Comment[]>{
    return this.httpClient.get<Comment[]>("http://localhost:8081/api/commment/")
  }

  findCommentByIdProduct(id?: number): Observable<DTOComment[]>{
    return this.httpClient.get<DTOComment[]>("http://localhost:8081/api/commment/" + id)
  }

  createComment(comment?: Comment): Observable<Comment>{
    return this.httpClient.post<Comment>("http://localhost:8081/api/commment/", comment)
  }

  findProductIdSoldForCustomer(idCustomer?: number): Observable<any>{
    return this.httpClient.get<any>("http://localhost:8081/api/products/product-sold-customer/" + idCustomer)
  }

}
