import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeDocument',
})
export class FormatDocumentPipe implements PipeTransform {

  transform(value: string | number | null | undefined): string {
    if (!value) return '';

    const str = value.toString().replace(/\D/g, ''); // elimina todo lo que no sea número

    // Validamos longitud exacta de 10 dígitos
    if (str.length !== 11) {
      console.warn('Formato no válido para pipe formatDocument:', str);
      return value.toString();
    }

    const part1 = str.substring(0, 3);
    const part2 = str.substring(3, 10);
    const part3 = str.substring(10);

    return `${part1}-${part2}-${part3}`;
  }

}
