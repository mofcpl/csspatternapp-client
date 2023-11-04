import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'publish',
    templateUrl: './publish.component.html',
    styleUrls: ['./publish.component.scss'],
    host: {'class': 'container-window'}
  })
export class PublishComponent {

  constructor(private router: Router) {}

  cancel() {
    this.router.navigate([''])
  }
    
}