import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static passwordsMatching(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (
      password === passwordConfirm &&
      password !== null &&
      passwordConfirm !== null
    ) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}

export function lessThanToday(control: AbstractControl) {
  let today: Date = new Date();

  if (new Date(control.value) > today)
    return { lessThanToday: true } as ValidationErrors;

  return null;
}

export function greaterThanZeroValidator(control: AbstractControl) {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputValue = +control.value; 
    if (isNaN(inputValue) || inputValue <= 0) {
      return { greaterThanZero: true }; 
    }
    return null; 
  };
}