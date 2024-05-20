import { EntityBase } from "./entity-base.vm";
import { Translation } from "./lookup/translation.vm";

export class EntityWithTranslation extends EntityBase {
    constructor() {
        super();

        this.translations = [];
    }

    translations: Translation[];
    translation: string;
}