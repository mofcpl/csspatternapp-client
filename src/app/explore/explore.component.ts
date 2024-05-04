import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../core/services/api.service";
import { Observable, catchError, of, tap } from "rxjs";
import { IPattern } from "../core/models/pattern.model";
import { Store } from "@ngrx/store";
import { ProjectPreview } from "../core/models/projectPreview.model";
import { PatternActions } from "../core/action-types";

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss'],
    host: {'class': 'container-window'}
  })
export class ExploreComponent implements OnInit {
  list$!: Observable<ProjectPreview[] | null>;
  loading: boolean = false;
  error: string | null = null;
  
  constructor(private router: Router, private api: ApiService, private store: Store<{pattern: IPattern}>) {}

  ngOnInit() {
    this.loading = true;
    this.list$ = this.api.getAllProjectsPreview().pipe(
      tap(() => {
        this.loading = false;
      }),
      catchError((error) => {
        this.error = error.message;
        this.loading = false;
        return of(null)
      })
    )
  }

  cancel() {
    this.router.navigate([''])
  }

  load(index: number) {
    this.api.getProjectData(index).subscribe((data) =>{
      this.store.dispatch(PatternActions.loadPattern({payload: data}))
      this.router.navigate([''])
    })
    
  }

  confirmError() {
    this.error = null
  }
}