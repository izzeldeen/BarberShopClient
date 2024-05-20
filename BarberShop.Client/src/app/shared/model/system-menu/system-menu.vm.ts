import { EntityWithTranslation } from "../entity-with-translation";

export class SystemMenu extends EntityWithTranslation {
    constructor() {
        super();

        this.children = [];
    }

    code: string;
    route: string;
    parentCode: string;
    sequence: number;
    permissions: string;
    children: SystemMenu[];
    mainMenuCode: string;
    icon: string;
    secondaryMenuItems: SystemMenu[];
}
