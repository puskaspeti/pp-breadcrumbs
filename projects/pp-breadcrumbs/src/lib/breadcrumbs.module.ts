import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import { PpBreadcrumbsComponent } from './breadcrumbs.component';

@NgModule({
  declarations: [PpBreadcrumbsComponent],
  imports: [CommonModule, RouterModule],
  exports: [PpBreadcrumbsComponent]
})
export class PpBreadcrumbsModule { }
