import {Injectable, Injector, OnDestroy, Type} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, concat, from, isObservable, Observable, of, Subscription} from 'rxjs';

import {PpBreadcrumbsResolver} from './breadcrumbs.resolver';
import {concatMap, distinct, filter, first, mergeMap, tap, toArray} from 'rxjs/operators';
import {Breadcrumb} from './breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class PpBreadcrumbsService implements OnDestroy {

  postProcess: (crumbs: Breadcrumb[]) => Promise<Breadcrumb[]> | Observable<Breadcrumb[]> | Breadcrumb[];

  protected breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  protected defaultResolver = new PpBreadcrumbsResolver();
  protected subscription?: Subscription;

  get crumbs$(): Observable<Breadcrumb[]> {
    return this.breadcrumbs.asObservable();
  }

  constructor(protected router: Router, protected injector: Injector) {
    this.subscription = this.router.events.pipe(
      filter(x => x instanceof NavigationEnd),
      concatMap(() => this.onNavigationEnd())
    ).subscribe();

    this.onNavigationEnd().subscribe();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.breadcrumbs.complete();
  }

  protected onNavigationEnd() {
    return this.resolveCrumbs(this.router.routerState.snapshot.root).pipe(
      mergeMap((breadcrumbs) => breadcrumbs),
      distinct((breadcrumb) => breadcrumb.text),
      toArray(),
      mergeMap((breadcrumbs) => {
        return this.postProcess ? this.wrapIntoObservable(this.postProcess(breadcrumbs)).pipe(first()) : of(breadcrumbs);
      }),
      tap((breadcrumbs) => this.breadcrumbs.next(breadcrumbs))
    );
  }

  protected resolveCrumbs(route: ActivatedRouteSnapshot): Observable<Breadcrumb[]> {
    let crumbs$: Observable<Breadcrumb[]> = of([]);
    const data = route.routeConfig?.data;

    if (data?.breadcrumbs) {
      const resolver = this.getBreadcrumbResolver(data.breadcrumbs);
      const result = resolver.resolve(route, this.router.routerState.snapshot);
      crumbs$ = this.wrapIntoObservable(result).pipe(first());
    }

    return route.firstChild ? concat(crumbs$, this.resolveCrumbs(route.firstChild)) : crumbs$;
  }

  protected getBreadcrumbResolver(breadcrumbs: string | Type<PpBreadcrumbsResolver>): PpBreadcrumbsResolver {
    return typeof breadcrumbs === 'function' && breadcrumbs.prototype instanceof PpBreadcrumbsResolver
      ? this.injector.get<PpBreadcrumbsResolver>(breadcrumbs)
      : this.defaultResolver;
  }

  protected wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
    return isObservable(value) ? value : from(Promise.resolve(value));
  }
}
