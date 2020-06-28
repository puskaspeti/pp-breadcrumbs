import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { ListComponent } from "./list/list.component";
import { ItemComponent } from "./list/item/item.component";
import { SubitemComponent } from "./list/item/subitem/subitem.component";
import { ItemResolver } from "./resolvers/item.resolver";
import { AnotherItemResolver } from "./resolvers/another-item.resolver";
import { PpBreadcrumbsModule } from "projects/pp-breadcrumbs/src/public_api";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    ItemComponent,
    SubitemComponent,
  ],
  imports: [BrowserModule, PpBreadcrumbsModule, AppRoutingModule],
  providers: [ItemResolver, AnotherItemResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
