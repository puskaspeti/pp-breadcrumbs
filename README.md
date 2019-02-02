# PP-Breadcrumbs

PP-Breadcrumbs is an Angular 7 module generating breadcrumbs based on the routing state. This solution is inspired by [ngx-breadcrumbs](https://github.com/peterbsmith2/ngx-breadcrumbs).

### Installation

Install via npm:
```
npm install pp-breadcrumbs --save 
```
Once you installed, you need to import the module:
```
import { PpBreadcrumbsModule } from 'pp-breadcrumbs';

@NgModule({
  ...
  imports: [PpBreadcrumbsModule, ...],
  ...
})
export class AppModule {
}
```

### Usage

Use the `pp-breadcrumbs` component to render the breadcrumbs:
```
@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <pp-breadcrumbs></pp-breadcrumbs>
      <router-outlet></router-outlet>
    </div>`
})
export class AppComponent {}
```

Rendering with `pp-breadcrumbs` is optional, and uses [Bootstrap 4](https://getbootstrap.com/) classes. If a different markup output is desired, a custom component can be created that subscribes to the `PpBreadcrumbsService.crumbs$` observable.

#### Routing Configuration

Breadcrumb links are generated based on the route configuration. If a route entry contains a data.breadcrumbs property the breadcrumbs service assumes breadcrumbs should be created whenever this route or one its child routes are active.
```
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
    data: { breadcrumbs: true },
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
```

### API reference

TODO
