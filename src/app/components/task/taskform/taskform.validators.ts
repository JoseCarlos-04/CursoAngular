import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customValidatorDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let valorCampo = control.value;

      if(!valorCampo){
        return null;
      }

      let expirationDate = new Date(valorCampo);
      let today = new Date();
      
      if(expirationDate >= today){
        return null;
      }else{
        return {invalidDate : true};
      }
    };
}

export function customValidatorPriority(): ValidatorFn {
  return  (control: AbstractControl): ValidationErrors | null => {
    let valorSelect = control.value;

    if(!valorSelect){
      return null;
    }

    if(valorSelect == "L" || valorSelect == "M" || valorSelect == "H"){
      return null;
    }else{
      return {invalidSelect : true};
    }
  };
}