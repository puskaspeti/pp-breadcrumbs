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
    // Uses static text (Home)
    data: { breadcrumbs: 'Items' },
    children: [
      { path: '', component: ListComponent },
      {
        path: ':id',
        // Interpolates values resolved by the router
        data: { breadcrumbs: '{{ item.name }}' },
        resolve: { item: ItemResolver },
        children: [
          { path: '', component: ItemComponent },
          { path: 'subitem', component: SubitemComponent, data: { breadcrumbs: `<i class="fas fa-user"></i> Subitem` } }
        ]
      }
    ]
  },
  {
    path: 'another-items',
    // Uses last urlfragment (about) as text
    data: { breadcrumbs: 'Another items' },
    children: [
      { path: '', component: ListComponent },
      {
        path: ':id',
        // Resolves the breadcrumbs for this route by extending the PpBreadcrumbsResolver class.
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
