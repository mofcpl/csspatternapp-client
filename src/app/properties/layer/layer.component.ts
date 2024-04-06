import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Layer, LayerPropertyType, LayerType } from 'src/app/core/models/layer.model';
import { Linear } from 'src/app/core/models/linear.model';
import { Radial, Shape, Size } from 'src/app/core/models/radial.model';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
  host: {'class': 'control-module'}
})
export class LayerComponent {
  
  Size = Size;
  Shape = Shape;

  @Input() layer!: Layer;
  @Output() layerChange = new EventEmitter<Layer>;
  @Output() add = new EventEmitter<boolean>;
  
  // @Output() direction = new EventEmitter<number>;
  // @Output() shape = new EventEmitter<Shape>;
  // @Output() autoSize = new EventEmitter<boolean>;
  // @Output() width = new EventEmitter<number>;
  // @Output() height = new EventEmitter<number>;
  // @Output() size = new EventEmitter<Size>;
  // @Output() posx = new EventEmitter<number>;
  // @Output() posy = new EventEmitter<number>;
  // @Output() vertical = new EventEmitter<number>;
  // @Output() horizontal = new EventEmitter<number>;

  constructor() {}

  addColorStop() {
    this.add.emit(true)
  }
  changeDirection(direction: number) {
    this.layerChange.emit({...this.layer, direction})
  }
  changeShape(shape: Shape) {
    this.layerChange.emit({...this.layer, shape})
  }
  changeAutoSize(autoSize: boolean) {
    this.layerChange.emit({...this.layer, autoSize})
  }
  changeWidth(width: number) {
    this.layerChange.emit({...this.layer, width})
  }
  changeHeight(height: number) {
    this.layerChange.emit({...this.layer, height})
  }
  changeSize(size: Size) {
    this.layerChange.emit({...this.layer, size})
  }
  changePosX(posx: number) {
    this.layerChange.emit({...this.layer, posx})
  }
  changePosY(posy: number) {
    this.layerChange.emit({...this.layer, posy})
  }
  changeVertical(vertical: number) {
    this.layerChange.emit({...this.layer, vertical})
  }
  changeHorizontal(horizontal: number) {
    this.layerChange.emit({...this.layer, horizontal})
  }

  // emitDirection(direction: number) {
  //   this.direction.emit(direction)
  // }
  // emitShape(shape: Shape) {
  //   this.shape.emit(shape)
  // }
  // emitAutoSize(autoSize: boolean) {
  //   this.autoSize.emit(autoSize)
  // }
  // emitWidth(width: number) {
  //   this.width.emit(width)
  // }
  // emitHeight(height: number) {
  //   this.height.emit(height)
  // }
  // emitSize(size: Size) {
  //   this.size.emit(size)
  // }
  // emitPosX(posx: number) {
  //   this.posx.emit(posx)
  // }
  // emitPosY(posy: number) {
  //   this.posy.emit(posy)
  // }
  // emitVertical(vertical: number) {
  //   this.vertical.emit(vertical)
  // }
  // emitHorizontal(horizontal: number) {
  //   this.horizontal.emit(horizontal)
  // }

}