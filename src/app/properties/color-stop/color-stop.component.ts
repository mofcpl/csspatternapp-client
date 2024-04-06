import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColorStop } from 'src/app/core/models/colorStop.model';

@Component({
  selector: 'app-color-stop',
  templateUrl: './color-stop.component.html',
  styleUrls: ['./color-stop.component.scss'],
  host: {'class': 'control-module'}
})
export class ColorStopComponent {

  @Input() colorStop!: ColorStop;
  @Output() colorStopChange = new EventEmitter<ColorStop>;
  @Output() delete = new EventEmitter<boolean>;

  constructor() {}

  deleteColorStop() {
    this.delete.emit(true);
  }

  changePosition(position: number) {
    this.colorStopChange.emit({...this.colorStop, position})
  }
  changeSize(size: number) {
    this.colorStopChange.emit({...this.colorStop, size})
  }
  changeColor(color: string) {
    this.colorStopChange.emit({...this.colorStop, color})
  }
  changeOpacity(opacity: number) {
    this.colorStopChange.emit({...this.colorStop, opacity})
  }
  changeBlur(blur: number) {
    this.colorStopChange.emit({...this.colorStop, blur})
  }


}