import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Radial, Shape, Size } from 'src/app/core/models/radial.model';
import { PropertiesService } from '../properties.service';

@Component({
  selector: 'app-radial',
  templateUrl: './radial.component.html',
  styleUrls: ['./radial.component.scss'],
  host: {'class': 'control-module'}
})
export class RadialComponent {
  @Input() radial!: Radial;
  @Input() index!: number;
  form: FormGroup;
  Size = Size;
  Shape = Shape;

  constructor(private formBuilder: FormBuilder, private service: PropertiesService) {
    this.form = formBuilder.group({
      shape: [''],
      autoSize: [''],
      width: [''],
      height: [''],
      size: [''],
      posx: [''],
      posy: [''],
      vertical: [''],
      horizontal: ['']
    });

    this.form.valueChanges.subscribe((value) => {
      service.radialChanges.next({
        radial: {...value, rays: this.radial.rays},
        index: this.index
      })
    })
  }

  ngOnChanges() {
    this.form.patchValue(this.radial, {emitEvent: false})
  }

  addRadius() {
    this.service.addRadius.next({
      radialIndex: this.index
    })
  }
}
