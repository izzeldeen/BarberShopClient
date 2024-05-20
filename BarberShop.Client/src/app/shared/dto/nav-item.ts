export class NavItem {
    constructor() {
        this.children = [];
    }

    displayName: string;
    iconName: string;
    styleClass: string;
    parentCode?: string;
    parentId?: string;
    route?: string;
    children?: NavItem[];
    code: string;
    id: string;
    mainMenuCode?: string;
    badge?: any;
    secondaryMenuItems?: NavItem[];
}
