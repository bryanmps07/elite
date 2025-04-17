import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    // Si el valor es vacío o solo contiene caracteres de la máscara, retornar error
    if (value === '' || value === '000-0000000-0') {
      return { 'empty': true };  // Campo vacío con la máscara
    }
    return null; // Valor válido
  };
}
