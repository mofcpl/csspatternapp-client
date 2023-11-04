import { ValidatorFn, FormGroup, ValidationErrors, AbstractControl } from "@angular/forms";


export const confirmEmailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const email = control.get('email')?.value;
    const repeatEmail = control.get('repeatEmail')?.value;
    return (email == repeatEmail) ? null : { repeatEmail: true};
  };