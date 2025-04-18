import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noOnlySpaceValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  return value.trim().length === 0 ? { onlySpace: true } : null;
}
