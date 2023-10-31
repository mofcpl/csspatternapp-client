import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Line } from 'src/app/core/models/linear.model';
import { PropertiesService } from '../properties.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
  host: {'class': 'control-module'}
})
export class LineComponent implements OnChanges {
  @Input() line!: Line;
  @Input() linearIndex!: number;
  @Input() lineIndex!: number;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: PropertiesService) {
    this.form = formBuilder.group({
      position: [''],
      size: [''],
      color: [''],
      opacity: [''],
      blur: [''],
    });

    this.form.valueChanges.subscribe((value: Line) => {
      service.lineChanges.next({
        line: value,
        linearIndex: this.linearIndex,
        lineIndex: this.lineIndex
      })
    })
  }

  ngOnChanges() {
    this.form.patchValue(this.line, {emitEvent: false})
  }

  deleteLine() {
    this.service.deleteLine.next({
      linearIndex: this.linearIndex,
      lineIndex: this.lineIndex
    })
  }

}
