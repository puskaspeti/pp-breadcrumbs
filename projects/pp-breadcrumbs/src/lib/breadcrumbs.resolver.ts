import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Breadcrumb} from './breadcrumb';
import {Injectable} from '@angular/core';
import {template} from 'lodash';

@Injectable()
export class PpBreadcrumbsResolver implements Resolve<Breadcrumb[]> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breadcrumb[]> | Promise<Breadcrumb[]> | Breadcrumb[] {
    const data = route.routeConfig.data;
    const path = this.getFullPath(route);
    const rawText = typeof data.breadcrumbs === 'string' ? data.breadcrumbs : data.breadcrumbs.text || data.text || path;

    return of([
      {
        path: path,
        text: this.stringFormat(rawText, route.data)
      }
    ]);
  }

  protected getFullPath(route: ActivatedRouteSnapshot): string {
    const relativePath = (segments: UrlSegment[]) => segments.reduce((a, v) => (a += '/' + v.path), '');
    const fullPath = (routes: ActivatedRouteSnapshot[]) => routes.reduce((a, v) => (a += relativePath(v.url)), '');
    return fullPath(route.pathFromRoot);
  }

  protected stringFormat(templateString: string, binding: any): string {
    const compiled = template(templateString, { interpolate: /{{(.+?)}}/g });
    return compiled(binding);
  }
}
