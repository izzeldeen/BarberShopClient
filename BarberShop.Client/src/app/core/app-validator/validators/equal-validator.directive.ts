import {Directive, forwardRef, Attribute} from '@angular/core';
import {Validator, AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";


@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true}
    ]
})
export class EqualValidator implements Validator {
    constructor(@Attribute('validateEqual') public validateEqual: string,
                @Attribute('reverse') public reverse: string,
                public translationService: TranslateService) {
    }

    private get isReverse() {
        if (!this.reverse) return false;
        return this.reverse === 'true';
    }

    validate(c: AbstractControl): any {
        // self value
        let v = c.value;

        // control vlaue
        let e = c.root.get(this.validateEqual);

        const message = {
            'equal-validator': {
                'message': this.translationService.instant('validators.equalValidatorMessage')
            }
        };

        // value not equal
        if (e && v !== e.value && !this.isReverse) {
            return message
        }

        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            return message
        }

        // value equal and not reverse
        if (e && v === e.value && !this.isReverse) {
            if (!e.valid)
                delete e.errors['equal-validator'];
            e.setErrors(null)
            return null;
        }

        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            if (!e.valid)
                delete e.errors['equal-validator'];
            e.setErrors(null)
            return null;
        }
    }
}
