import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Breadcrumb} from './breadcrumb';
import {PpBreadcrumbsService} from './breadcrumbs.service';

@Component({
  selector: 'pp-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class PpBreadcrumbsComponent implements OnInit, OnDestroy {
  crumbs: Breadcrumb[];

  protected subscription?: Subscription;

  constructor(protected service: PpBreadcrumbsService) {}

  public ngOnInit(): void {
    this.subscription = this.service.crumbs$.subscribe((crumbs) => {
      this.crumbs = crumbs;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
