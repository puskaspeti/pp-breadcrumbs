import {Component, OnInit} from '@angular/core';
import {BreadcrumbsService, Breadcrumb} from 'pp-breadcrumbs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private breadcrumbsService: BreadcrumbsService) {}

  ngOnInit() {
    this.breadcrumbsService.postProcess = (breadcrumbs: Breadcrumb[]) => {
      if (breadcrumbs.length) {
        breadcrumbs.unshift({ text: `<i class="fas fa-home" title="Home"></i>`, path: '/' });
      }
      return breadcrumbs;
    };
  }
}
