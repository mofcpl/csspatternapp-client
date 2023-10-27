import { Component, Input } from '@angular/core';
import { Ray } from 'src/app/core/models/radial.model';

@Component({
  selector: 'app-radius',
  templateUrl: './radius.component.html',
  styleUrls: ['./radius.component.scss'],
  host: {'class': 'control-module'}
})
export class RadiusComponent {
  @Input() radius!: Ray;
}
