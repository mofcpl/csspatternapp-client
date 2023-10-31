import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Linear } from 'src/app/core/models/linear.model';
import { PropertiesService } from '../properties.service';
import { Type } from 'src/app/core/models/pattern.model';

@Component({
  selector: 'app-linear',
  templateUrl: './linear.component.html',
  styleUrls: ['./linear.component.scss'],
  host: {'class': 'control-module'}
})
export class LinearComponent implements OnChanges{
  @Input() linear!: Linear;
  @Input() index!: number;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: PropertiesService) {
    this.form = formBuilder.group({
      direction: [''],
      autoSize: [''],
      width: [''],
      height: [''],
      vertical: [''],
      horizontal: ['']
    });

    
    this.form.valueChanges.subscribe((value: Linear) => {
      service.linearChanges.next({
        linear: {...value, lines: this.linear.lines},
        index: this.index 
        });
    })
  }

  ngOnChanges() {
    this.form.patchValue(this.linear, {emitEvent: false})
  }

  addLine() {
    this.service.addLine.next({
      linearIndex: this.index
    })
  }
}
