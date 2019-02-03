# PP-Breadcrumbs

PP-Breadcrumbs is an Angular 7 module generating breadcrumbs based on the routing state.

**Demo**: [Stackblitz](https://stackblitz.com/edit/pp-breadcrumbs)

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

Rendering with `pp-breadcrumbs` is optional, and uses [Bootstrap 4](https://getbootstrap.com/) CSS classes. If a different markup output is desired, a custom component can be created that subscribes to the `PpBreadcrumbsService.crumbs$` observable.

#### Routing Configuration

Breadcrumb links are generated based on the route configuration. If a route entry contains a data.breadcrumbs property the breadcrumbs service assumes breadcrumbs should be created whenever this route or one its child routes are active.
```
const routes: Routes = [
  {
    path: 'items',
    // Uses static text (Items)
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
    // Uses last urlfragment (another-items) as text
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

#### Breadcrumb

Represents a breadcrumb. HTML content in the `text` property is allowed.
```
export interface Breadcrumb {
  text: string;
  path: string;
}
```

#### PpBreadcrumbsComponent
Selector: `[pp-breadcrumbs]`

Renders the `Breadcrumb[]` provided by the `PpBreadcrumbsService`. The HTML output is based on the [Bootstrap 4 breadcrumbs](https://getbootstrap.com/docs/4.2/components/breadcrumb/).

##### Properties

| Name | Description |
| --- | --- |
| crumbs: Breadcrumb[] | Actually rendered breadcrumbs |

#### PpBreadcrumbsService

##### Properties

| Name | Description |
| --- | --- |
| crumbs$: Observable<Breadcrumb[]> | Observable stream of `Breadcrumb[]`, which is updated after each route change |
| postProcess: (crumbs: Breadcrumb[]) => Promise<Breadcrumb[]> &#124; Observable<Breadcrumb[]> &#124; Breadcrumb[] | Callback function, which allows to modify the fully created breadcrumbs |

#### PpBreadcrumbsResolver

Resolving `Breadcrumb[]` from the route, `PpBreadcrumbsService` uses this resolver by default.
There are two ways to resolve breadcrumbs:
- use a resolver, which implements the `Resolve<T>` (regular resolver), and use like this:
  ```
  const routes: Routes = [
    ..
    { path: ':id', data: { breadcrumbs: '{{ item.name }}' }, resolve: { item: ItemResolver } },
    ..
  ];
  ```
- use a resolver, which extends from `PpBreadcrumbsResolver` and return the created breadcrumb. Then use like this:
  ```
  const routes: Routes = [
    ..
    { path: ':id', data: { breadcrumbs: AnotherItemResolver } },
    ..
  ];
  ```

You can see examples for both ways in the demo app.

##### Methods

| Name | Description |
| --- | --- |
| resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Breadcrumb[]> &#124; Promise<Breadcrumb[]> &#124; Breadcrumb[] | Resolve function to create custom breadcrumbs for the given routes |
| getFullPath(route: ActivatedRouteSnapshot): string | Returns the full path for the provided route snapshot |
