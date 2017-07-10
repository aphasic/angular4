import { Component, OnInit } from '@angular/core';
import {RealClassify} from "../interface";

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.css']
})
export class ClassifyComponent implements OnInit {
  parents: RealClassify[];       //依次存储每个子组件的输入
  constructor() {
    //初始化
    var first:RealClassify = {
      _id : "0",
      name: "",
      parentid: ""
    };
    this.parents=[first];
  }

  ngOnInit() {
  }

  parentTransmit(classify:RealClassify , index:number){
    if(this.parents.length > (index+1)){
      this.parents[index+1] = classify;
    }
    else{
      this.parents.push(classify);
    }
  }

}
