import { Directive } from '@angular/core';
import { Validator, ValidatorFn, AbstractControl } from '@angular/forms';

export function maxTodayValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    // TODO: take into account time zone
    let selectedDate = new Date(control.value);
    let today = new Date();
    today.setUTCHours(0,0,0,0);
    //console.log(selectedDate);
    //console.log(today);
    const allowed = selectedDate < today;
    return allowed ? null : {'maxToday': {value: control.value}};
  }
}

@Directive({
  selector: '[appMaxToday]'
})
export class MaxTodayDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} {
    return maxTodayValidator()(control);
  }

}
