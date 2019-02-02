import {Injectable} from '@angular/core';
import {Item} from '../item';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable()
export class ItemResolver implements Resolve<Item> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> | Promise<Item> | Item {
    return of({
      name: 'Item ' + route.params.id
    });
  }

}
