import { Injectable, Injector } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from "@angular/router";
import { Observable, BehaviorSubject, of, concat, from } from "rxjs";

import { PpBreadcrumbsResolver } from "./breadcrumbs.resolver";
import { filter, mergeMap, distinct, toArray, first } from "rxjs/operators";
import { Breadcrumb } from "./breadcrumb";

@Injectable({
  providedIn: "root",
})
export class PpBreadcrumbsService {
  postProcess: (
    crumbs: Breadcrumb[]
  ) => Promise<Breadcrumb[]> | Observable<Breadcrumb[]> | Breadcrumb[];

  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  private defaultResolver = new PpBreadcrumbsResolver();

  get crumbs$(): Observable<Breadcrumb[]> {
    return this.breadcrumbs;
  }

  constructor(
    private router: Router,
    route: ActivatedRoute,
    private injector: Injector
  ) {
    this.router.events
      .pipe(filter((x) => x instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.resolveCrumbs(router.routerState.snapshot.root)
          .pipe(
            mergeMap((breadcrumbs) => breadcrumbs),
            distinct((breadcrumb) => breadcrumb.text),
            toArray(),
            mergeMap((breadcrumbs) => {
              return this.postProcess
                ? this.wrapIntoObservable(this.postProcess(breadcrumbs)).pipe(
                    first()
                  )
                : of(breadcrumbs);
            })
          )
          .subscribe((breadcrumbs) => {
            this.breadcrumbs.next(breadcrumbs);
          });
      });
  }

  private resolveCrumbs(
    route: ActivatedRouteSnapshot
  ): Observable<Breadcrumb[]> {
    let crumbs$: Observable<Breadcrumb[]> = of([]);
    const data = route.routeConfig && route.routeConfig.data;

    if (data && data.breadcrumbs) {
      const resolver: PpBreadcrumbsResolver =
        data.breadcrumbs.prototype instanceof PpBreadcrumbsResolver
          ? this.injector.get<PpBreadcrumbsResolver>(data.breadcrumbs)
          : this.defaultResolver;

      const result = resolver.resolve(route, this.router.routerState.snapshot);
      crumbs$ = this.wrapIntoObservable<Breadcrumb[]>(result).pipe(first());
    }

    return route.firstChild
      ? concat(crumbs$, this.resolveCrumbs(route.firstChild))
      : crumbs$;
  }

  private wrapIntoObservable<T>(
    value: T | Promise<T> | Observable<T>
  ): Observable<T> {
    return value instanceof Observable
      ? value
      : this.isPromise(value)
      ? from(Promise.resolve(value))
      : of(value as T);
  }

  private isPromise(value: any): boolean {
    return value && typeof value.then === "function";
  }
}
