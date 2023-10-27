import { Component, Input } from '@angular/core';
import { Linear } from 'src/app/core/models/linear.model';

@Component({
  selector: 'app-linear',
  templateUrl: './linear.component.html',
  styleUrls: ['./linear.component.scss'],
  host: {'class': 'control-module'}
})
export class LinearComponent {
  @Input() linear!: Linear;
}
