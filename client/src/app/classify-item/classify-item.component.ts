import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import {ClassifyService} from "../services/classify.service";

import {Classify , ClassifyErrors, RealClassify} from "../interface"
import {ObjArray} from "../class"
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-classify-item',
  templateUrl: './classify-item.component.html',
  styleUrls: ['./classify-item.component.css'],
  providers:[]
})

export class ClassifyItemComponent implements OnInit{
  @Input()
  parentid:string;
  @Input()
  parentname:string;
  @Input()
  parentIndex:number;
  @Output()
    onDetail:EventEmitter<RealClassify> = new EventEmitter();


  addFlag:boolean = false;     //(视图)是否点击添加分类按钮的标志
  batchFlag:boolean = false;   //(视图)是否进入批量管理的标志
  editFlag:boolean = false;    //(视图)是否进入编辑状态的标志
  deleteFlag:boolean = false;    //(视图)是否进入删除状态的标志
  all:boolean = false;         //(视图)是否全选的标志
  addInput:string;             //(视图)添加分类名称输入框的绑定数据
  editIndex:number = -1;       //(视图)当前编辑的输入框的index
  deleteIndex:number = -1;       //(视图)当前要删除的分类的index
  activeIndex: number = -1;    //(视图)当前正在详情页面的分类的index
  editInput:string;            //(视图)编辑分类名称输入框的绑定数据
  classifyErrors: ClassifyErrors;  //(视图)编辑或添加分类名称输入框的错误提示
  getClassifyItems: RealClassify[];     //(视图)获取的所有分类
  lastInput: string;           //(视图)最后添加的一项分类的名称


  classifyItems: Classify[] = [];  //保存添加的分类
  deleteItems: string[] = [];  //保存删除的分类id
  objArray:any;                //保存ObjArray的实例
  constructor(private classifyService:ClassifyService) {

  }

  ngOnInit() {
    //初始化所有项数组getClassifyItems
    this.getItems();
    this.errorsInit();
    this.objArray = new ObjArray();
  }

  //监听checkbox的点击事件，判断是否被选中
  //选中则将该项添加进待删除项数组(deleteItems)
  //反选则将该项从待删除项数组(deleteItems)中移除
  onChecked(event:any){
    if(event.target.checked){
      this.deleteItems.push(event.target.value);
    }
    else{
      var index = this.deleteItems.indexOf(event.target.value);
      this.deleteItems.splice(index,1);
    }
    console.log(this.all);
  }

  //监听全选checkbox的点击事件，判断是否全选
  //若全选，则将所有项数组(getClassifyItems)赋给待删除项数组(deleteItems)
  //若反选，将待删除项数组(deleteItems)清空
  onAllChecked(event:any){
    if(event.target.checked){
      this.deleteItems = [];
      this.getClassifyItems.forEach((classify , key) => {
        this.deleteItems.push(classify._id);
      });
    }
    else{
      this.deleteItems = [];
    }
  }

  //以组件的输入变量parentid为参数，获取所有项，存入所有项数组getClassifyItems
  getItems(){
    this.classifyService.get(this.parentid).subscribe(data => {
      if(!data.err)
        this.getClassifyItems = data.msg;
    });
  }

  errorsInit(){
    this.classifyErrors = {
        errors : [],
        firstCount: 0,
        secondCount: 0,
        thirdCount: 0,
    };
  }
  //点击详情按钮时，将被点击的分类的完整信息作为组件的输出传出
  detailClick(classify:RealClassify){
    this.onDetail.emit(classify);
  }

  //点击确认添加按钮时，将要添加的分类保存到待添加项数组(classifyItems)中
  //此处事后还要做数据过滤，如果name已经存在，则返回给用户结果，还要同时更新所有项数组(getClassifyItems)
  addItem(form : NgForm){
    let item:Classify = {
      "name" : form.form.get("classifyname").value,
      "parentid" : this.parentid
    };
    //如果分类名已在所有项数组(getClassifyItems)中存在，或者已在待添加项数组(classfiyItems)中存在
    if(this.objArray.indexOfArray(this.getClassifyItems,"name",item.name)!="-1" || this.objArray.indexOfArray(this.classifyItems,"name",item.name)!="-1"){
      this.lastInput = this.addInput;
      this.addInput ="";
      this.classifyErrors.errors.push(2);
      this.classifyErrors.secondCount++;
    }
    //数据合法
    else{
      this.lastInput = this.addInput;
      this.addInput = "";
      this.classifyItems.push(item);
      this.classifyErrors.errors.push(1);
      this.classifyErrors.firstCount++;
    }
  }

  //点击保存添加按钮时，调用分类服务，将待添加项数组(classifyItems)整体传到后台
  saveItems(){
    if(this.classifyItems.length){
      this.classifyService.save(this.classifyItems).subscribe(data => {
        if(!data.err)
        //添加成功后，必须重新获取数据，更新getClassifyItems,而且必须从后台获取，因为_id是新生成的
          this.getItems();
        else{
          this.classifyErrors.errors.push(3);
          this.classifyErrors.thirdCount++;
        }
      });

    }
    this.addFlag = false;
  }

  //点击确认删除按钮时，调用分类服务，将待删除项数组(deleteItems)整体传到后台
  delItems(){
    console.log(this.deleteItems);
    if(this.deleteItems.length){
      this.classifyService.remove(this.deleteItems).subscribe(data => {
        if(data)
          console.log(data);
      });
    }
    this.deleteItems.forEach((val , key)=>{
      let index = this.objArray.indexOfArray(this.getClassifyItems,"_id",val);
      this.getClassifyItems.splice(index , 1);
      console.log(index);
    });
    console.log(this.getClassifyItems);
    this.batchFlag = false;
    this.deleteFlag = false;
    this.deleteIndex = -1;
  }

  editItem(index : number){
    //如果分类名已在所有项数组(getClassifyItems)中存在
    if(this.objArray.indexOfArray(this.getClassifyItems,"name",this.editInput)!="-1"){
      this.lastInput = this.editInput;
      this.editInput = "";
      this.classifyErrors.errors.push(2);
      this.classifyErrors.secondCount++;
    }
    else{
      this.getClassifyItems[index].name = this.editInput;
      this.classifyService.edit(this.getClassifyItems[index]).subscribe(data => {
        if(!data.err){
          this.editFlag = false;
          this.editIndex = -1;
        }
        else{
          this.classifyErrors.errors.push(2);
          this.classifyErrors.secondCount++;
        }
      });

    }


  }
}

