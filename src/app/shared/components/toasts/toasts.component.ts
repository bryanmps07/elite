import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toasts',
  standalone: false,
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.css'],
})
export class ToastsComponent {
  position = 'top-end';
  visible = false;
  percentage = 0;

  @Input()
  public color: string = '';

  @Input()
  public txtToats: string = '';

  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }
}
