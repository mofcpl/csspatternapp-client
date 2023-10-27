import { Component, Input } from '@angular/core';
import { Line } from 'src/app/core/models/linear.model';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
  host: {'class': 'control-module'}
})
export class LineComponent {
@Input() line!: Line;
}
