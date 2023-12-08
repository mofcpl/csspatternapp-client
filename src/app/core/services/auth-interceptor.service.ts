import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Observable, exhaustMap, take } from "rxjs";
import { selectUser } from "../store/auth/auth.selectors";
import { authState } from "../store/auth/auth.reducer";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private store: Store<{auth: authState}>) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(selectUser).pipe(
            exhaustMap((user) => {
                let requestWithToken;
                if(user && user.token && !(req.method == "GET" || (req.method == "POST" && req.url=="http://127.0.0.1:8080/author"))) {
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