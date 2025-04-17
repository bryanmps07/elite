import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string | number | null | undefined): string {
    if (!value) return '';

    const digits = value.toString().replace(/\D/g, '');

    if (digits.length !== 10) {
      console.warn('Formato de teléfono no válido:', value);
      return value.toString();
    }

    const area = digits.substring(0, 3);
    const first = digits.substring(3, 6);
    const second = digits.substring(6, 10);

    return `(${area}) ${first}-${second}`;
  }

}
