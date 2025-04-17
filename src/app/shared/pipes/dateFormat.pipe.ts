import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleDateString(); // Cambia formato si necesitas
  }
}
