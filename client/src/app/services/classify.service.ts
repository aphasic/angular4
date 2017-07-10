import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Classify} from "../interface"
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class ClassifyService {
  constructor(private http:Http) { }

  //保存添加时，将要添加的分类数组（不包含_id）传到后台
  save(data:Classify[]):Observable<any>{
    let body = {"data":data};
    return this.http.post("/classify/add",body)
      .map(res => res.json());
  }
  //根据父分类的id获取分类
  get(parentid: string):Observable<any>{
    let body = {"data" : parentid};
    return this.http.post("/classify/get",body)
      .map(res => res.json());
  }
  //确认删除时，将要删除的分类的_id数组传到后台
  remove(data:string[]):Observable<any>{
    let body = {"data" : data};
    return this.http.post("/classify/delete",body)
      .map(res => res.json());
  }
  //编辑时，将编辑的分类信息传到吼他
  edit(data:any):Observable<any>{
    let body = {"data": data};
    return this.http.post("/classify/edit",body)
      .map(res => res.json());
  }


}
