export interface MenuItem {
    id?: number;
    label?: any;
    icon?: string;
    link?: string;
    subItems?: any;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
    code?:string;
}
