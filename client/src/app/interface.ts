// 分类接口
export interface Classify{
  name: string,
  parentid: string,
}
//包含_id的分类接口
export interface RealClassify{
  _id: string,
  name: string,
  parentid: string,
}
//(视图)添加或编辑分类时的输入错误标志
//errors[]的取值为1,2,3;分别代表错误：
//1--添加成功：可继续添加！
//2--添加失败：分类名已存在
//3--系统错误
export interface ClassifyErrors{
  errors: number[],
  firstCount: number,
  secondCount: number,
  thirdCount: number,
}
