import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {BreadcrumbsResolver} from 'pp-breadcrumbs';
import {Breadcrumb} from 'pp-breadcrumbs';

@Injectable()
export class AnotherItemResolver extends BreadcrumbsResolver {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breadcrumb[]> | Promise<Breadcrumb[]> | Breadcrumb[] {
    return of([{
      text: 'Another item ' + route.params.id,
      path: this.getFullPath(route)
    }]);
  }

}
