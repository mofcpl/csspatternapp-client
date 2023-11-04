import { ValidatorFn, FormGroup, ValidationErrors, AbstractControl } from "@angular/forms";


export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const repeatPassword = control.get('repeatPassword')?.value;
    return (password == repeatPassword) ? null : { repeatPassword: true};
  };