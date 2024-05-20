import { EntityBase } from "../entity-base.vm";
import { FilterBase } from "../filter-base";

export class CategoryVM extends EntityBase {
id:number;
name:string;
displayOrder:number;

}

export class CategoryVMFilter extends FilterBase {

}