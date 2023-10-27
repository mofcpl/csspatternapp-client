import { Component, Input } from '@angular/core';
import { Radial, Shape, Size } from 'src/app/core/models/radial.model';

@Component({
  selector: 'app-radial',
  templateUrl: './radial.component.html',
  styleUrls: ['./radial.component.scss'],
  host: {'class': 'control-module'}
})
export class RadialComponent {
  @Input() radial!: Radial;
  Size = Size;
  Shape = Shape;
}
