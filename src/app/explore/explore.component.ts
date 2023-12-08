import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService, IProject } from "../core/services/api.service";
import { Observable } from "rxjs";
import { IPattern } from "../core/models/pattern.model";
import { Store } from "@ngrx/store";
import { loadPattern, setPattern } from "../core/store/pattern/pattern.actions";

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss'],
    host: {'class': 'container-window'}
  })
export class ExploreComponent implements OnInit{
  list$!: Observable<IProject[]>;
  
  constructor(private router: Router, private api: ApiService, private store: Store<{pattern: IPattern}>) {}

  ngOnInit() {
    this.list$ = this.api.getAllProjects();
    this.list$.subscribe( (list) => {
      console.log(list[0].style)
    })
  }

  cancel() {
    this.router.navigate([''])
  }

  load(data: IPattern) {
    this.store.dispatch(setPattern({value: data}))
    this.router.navigate([''])
  }
}