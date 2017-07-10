//针对对象数组的方法集合
//如：[{name:,parent:},..]这样的结构
export class ObjArray{
  public indexOfArray;
  constructor(){
    this.indexOfArray = (array , protery ,x) =>{
      let index = "-1";
      array.forEach(function (val , key) {
        if(val[protery] === x){
          index = key;
          return;
        }
      });
      return index;
    }

  }

}
