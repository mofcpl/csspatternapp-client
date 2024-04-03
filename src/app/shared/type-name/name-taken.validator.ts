import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Observable, map, take } from "rxjs";
import { Layer } from "src/app/core/models/layer.model";

export const nameTakenValidator = (layers: Observable<Layer[]>):AsyncValidatorFn => {
  return (control: AbstractControl) => {
      return layers.pipe(
        map((layers: Layer[]) => {
          let duplicated = layers.filter((layer: Layer) => {
            return layer.name === control.value
          })
          return  duplicated.length > 0 ? {taken: true} : null
        }),
        take(1)
      )
  }
}