import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss'],
    host: {'class': 'container-window'}
  })
export class ExploreComponent {
  constructor(private router: Router) {}

  cancel() {
    this.router.navigate([''])
  }
}