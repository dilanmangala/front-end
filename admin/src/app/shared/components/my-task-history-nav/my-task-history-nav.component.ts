import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-task-history-nav",
  templateUrl: "./my-task-history-nav.component.html",
  styleUrls: ["./my-task-history-nav.component.scss"]
})

export class MyTaskHistoryNavComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
  }
  exportToExcel() {
    this.router.navigate(['/dashboard/my-task-history']);
  }
}
