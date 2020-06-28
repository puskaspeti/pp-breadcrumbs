import { Component, OnInit } from "@angular/core";
import {
  PpBreadcrumbsService,
  Breadcrumb,
} from "projects/pp-breadcrumbs/src/public_api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private breadcrumbsService: PpBreadcrumbsService) {}

  ngOnInit() {
    this.breadcrumbsService.postProcess = (breadcrumbs: Breadcrumb[]) => {
      if (breadcrumbs.length) {
        breadcrumbs.unshift({
          text: `<i class="fas fa-home" title="Home"></i>`,
          path: "/",
        });
      }
      return breadcrumbs;
    };
  }
}
