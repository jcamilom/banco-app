import { Directive, Input } from '@angular/core';
import { ValidatorFn, AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

/** A client must be of legal age.
 * This function evaluates if the input date for which the directive
 * is applied, generates an age bigger than the legalAge passed.
 */
export function legalAgeValidator(legalAge: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if ((control.value !== undefined && control.value !== '' && control.value != null)) {
      // TODO: check for number type of legalAge
      let bdate: any = new Date(control.value);
      let today: any = new Date();
      //console.log(bdate);
      //console.log(today);
      let diffDate: any = new Date(today - bdate);
      //console.log(diffDate);
      // This means legalAge years (prob. 18, time in milliseconds)
      let legalDate: any = new Date(1970 + Number(legalAge), 0);
      //console.log(legalDate);
      const legal = diffDate >= legalDate;
      return legal ? null : {'legalAge': {value: control.value}};      
    }
    return null;
  };
}

@Directive({
  selector: '[appLegalAge]',
  providers: [{provide: NG_VALIDATORS, useExisting: LegalAgeDirective, multi: true}]
})
export class LegalAgeDirective implements Validator {
  @Input('appLegalAge') legalAge: number;

  validate(control: AbstractControl): {[key: string]: any} {
    return this.legalAge ? legalAgeValidator(this.legalAge)(control) : null;
  }

}
