import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions, PatternActions } from 'src/app/core/action-types';
import { LayerType } from 'src/app/core/models/layer.model';
import { IPattern } from 'src/app/core/models/pattern.model';
import { addLinear } from 'src/app/core/store/pattern/pattern.actions';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  isnamePopupOpen: boolean = false;
  popupLayerType: LayerType | undefined;

  constructor(private store: Store<{pattern: IPattern}>){}

  openAddLinearForm() {
    this.popupLayerType = LayerType.Linear;
    this.isnamePopupOpen = true;
  }

  openAddRadialForm() {
    this.popupLayerType = LayerType.Radial;
    this.isnamePopupOpen = true;
  }

  popupClose(closed: boolean) {
    if(closed == true) {
      this.isnamePopupOpen = false
    }
  }

  addLayer(name: string) {
    switch(this.popupLayerType) {
      case LayerType.Linear: this.store.dispatch(PatternActions.addLinear({payload: name})); break;
      case LayerType.Radial: this.store.dispatch(PatternActions.addRadial({payload: name})); break;
    }
    this.isnamePopupOpen = false;
  }

  clone() {
    
  }

}
