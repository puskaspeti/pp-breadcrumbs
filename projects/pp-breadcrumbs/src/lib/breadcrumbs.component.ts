import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Breadcrumb } from './breadcrumb';
import { BreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: 'pp-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  crumbs: Breadcrumb[];
  subscriptions: Subscription[] = [];

  constructor(public service: BreadcrumbsService) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.service.crumbs$.subscribe(x => {
        this.crumbs = x;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
