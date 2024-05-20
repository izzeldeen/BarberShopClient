import { EntityBase } from "../entity-base.vm";
import { FilterBase } from "../filter-base";
import { Driver } from "./driver.vm";


export class UserVM extends EntityBase {
    id: number;
    name: string;
    email: string;
    phoneNumber:string;
}

export class UsersFilterVM extends FilterBase {
    search: string;
    role:number;
}
