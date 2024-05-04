import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  host: {'class': 'container-window pop-up-background'}
})
export class ErrorComponent {
  @Input() errorMessage!: string;
  @Output() confirm = new EventEmitter<boolean>;

  confirmOk() {
    this.confirm.emit(true)
  }
  
}
