import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Observable, exhaustMap, take } from "rxjs";
import { selectUser } from "../store/auth/auth.selectors";
import { authState } from "../store/auth/auth.reducer";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private store: Store<{auth: authState}>) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(selectUser).pipe(
            exhaustMap((user) => {
                let requestWithToken;
                const url = environment.api + "author";
                if(user && user.token && !(req.method == "GET" || (req.method == "POST" && req.url==url))) {
                    requestWithToken = req.clone({
                        setHeaders: {
                            Authorization: "Bearer " + user.token
                        }
                    })
                    return next.handle(requestWithToken);
                }
                return next.handle(req);
            })
        )
       
    }
}