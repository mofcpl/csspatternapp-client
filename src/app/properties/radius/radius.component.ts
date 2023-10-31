import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Radius } from 'src/app/core/models/radial.model';
import { PropertiesService } from '../properties.service';

@Component({
  selector: 'app-radius',
  templateUrl: './radius.component.html',
  styleUrls: ['./radius.component.scss'],
  host: {'class': 'control-module'}
})
export class RadiusComponent {
  @Input() radius!: Radius;
  @Input() radialIndex!: number;
  @Input() radiusIndex!: number;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: PropertiesService) {
    this.form = formBuilder.group({
      position: [''],
      size: [''],
      color: [''],
      opacity: [''],
      blur: ['']
    })

    this.form.valueChanges.subscribe((value) => {
      service.radiusChanges.next({
        radius: value,
        radiusIndex: this.radiusIndex,
        radialIndex: this.radialIndex
      })
    })
  }

  ngOnChanges() {
    this.form.patchValue(this.radius, {emitEvent: false})
  }

  deleteRadius() {
    this.service.deleteRadius.next({
      radialIndex: this.radialIndex,
      radiusIndex: this.radiusIndex
    })
  }
}
