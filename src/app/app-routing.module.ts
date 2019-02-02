import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ListComponent} from './list/list.component';
import {ItemComponent} from './list/item/item.component';
import {SubitemComponent} from './list/item/subitem/subitem.component';
import {ItemResolver} from './resolvers/item.resolver';
import {AnotherItemResolver} from './resolvers/another-item.resolver';

const routes: Routes = [
  {
    path: 'items',
    data: { breadcrumbs: 'Items' },
    children: [
      { path: '', component: ListComponent },
      {
        path: ':id',
        resolve: { item: ItemResolver },
        data: { breadcrumbs: '{{ item.name }}' },
        children: [
          { path: '', component: ItemComponent },
          { path: 'subitem', component: SubitemComponent, data: { breadcrumbs: 'Subitem' } }
        ]
      }
    ]
  },
  {
    path: 'another-items',
    data: { breadcrumbs: 'Another items' },
    children: [
      { path: '', component: ListComponent },
      {
        path: ':id',
        data: { breadcrumbs: AnotherItemResolver },
        children: [
          { path: '', component: ItemComponent },
          { path: 'subitem', component: SubitemComponent, data: { breadcrumbs: 'Subitem' } }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
