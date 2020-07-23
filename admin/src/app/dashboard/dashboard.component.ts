import { DynamicForm } from './../shared/models/dynamic-form/dynamic-form';
import { MyTaskHistoryService } from "./../shared/services/my-task-history.service";
import { HomePageService } from "./../shared/services/home-page.service";
import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { DynamicFormService } from "../shared/services/dynamic-form.service";
import { StepperComponent } from "../shared/components/common/stepper/stepper.component";
import { Steps } from "../shared/models/common/steps";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  activeStep: number;
  data: any;
  @ViewChild(StepperComponent)
  stepper: StepperComponent;
  steps: Steps[];
  isMyTaskHistory: boolean;
  isViewSummary: boolean;
  taskDetail: any;
  taskForm: any;
  dynamicFormData: any;
  dropdownData: any;
  homePageDynamicData: any;
  isDynamicFormDataTable: boolean;
  formValue: any;
  allItemsfromDashboard: any[];
  constructor(
    private homePageService: HomePageService,
    private activeRoute: ActivatedRoute,
    private myTaskHistoryService: MyTaskHistoryService,
    private router: Router,
    private dynamicFormService: DynamicFormService
  ) {
    this.steps = [
      { id: 1, name: "My Task History", isActive: true, isEnabled: true },
      { id: 0, name: "", isActive: true, isEnabled: true },
      { id: 2, name: "View Summary", isActive: false, isEnabled: true }
    ];
  }

  ngOnInit() {
    let locationArr: any[] = [];
    locationArr = location.hash.split("/");
    this.isDynamicFormDataTable =
      locationArr[2] === "view-summary" || locationArr[2] === "my-task-history";

    this.homePageService.GetDynamicDashboardDetails().subscribe(data => {
      localStorage.setItem("permission", JSON.stringify(data));
    });
    this.isViewSummary = locationArr[2] === "view-summary";
    this.isMyTaskHistory = locationArr[2] === "my-task-history";
    if (this.isMyTaskHistory) {
      this.activeStep = 1;
    } else if (this.isViewSummary) {
      this.activeStep = 2;
    }
   this.loadData();

  }
  // Stepper Emit
  getDepName(data: any) {
    // localStorage.removeItem('taskForm');
    // localStorage.setItem('taskForm', JSON.stringify(data.taskForm));
    this.data = data.taskform;
  }

  //Stepper Emit
  onClickReset() {
    this.data = null;
    this.stepper.stepReset();
    this.activeStep = 1;
  }

  //Stepper Emit
  onSelectStep(stepId) {
    this.activeStep = stepId;
    if (stepId === "1") {
      this.taskForm = JSON.parse(localStorage.getItem("taskForm"));
      this.router.navigate(["/dashboard/my-task-history"]);
    } else if (stepId === "2") {
      this.taskDetail = JSON.parse(localStorage.getItem("taskDetail"));
      this.router.navigate([
        "/dashboard/view-summary/" +
          this.taskDetail.taskId +
          "/" +
          this.taskDetail.status +
          "/" +
          this.taskDetail.providerType
      ]);
      this.loadData();
    }
  }

  //Stepper Emit
  onClickNext(data: any) {
    this.activeStep = data.stepId + 1;
    this.taskDetail = data.task;
    this.taskForm = data.taskForm;
    localStorage.setItem("taskForm", JSON.stringify(this.taskForm));
    // localStorage.removeItem('taskDetail');
    localStorage.setItem("taskDetail", JSON.stringify(this.taskDetail));
    this.router.navigate([
      "/dashboard/view-summary/" +
        this.taskDetail.taskId +
        "/" +
        this.taskDetail.status +
        "/" +
        this.taskDetail.providerType
    ]);
    this.loadData();
  }
  loadData() {
    if (!this.isMyTaskHistory) {
      this.dynamicFormService.getForm("dropdown").subscribe(
        data => {
          this.dropdownData = data;
        },
        err => {}
      );

      if (this.isViewSummary) {
       let taskId = this.activeRoute.snapshot.params.id;
       if (taskId.includes("-")){
         taskId = taskId.split("-").pop();
       }
        this.myTaskHistoryService
          .GetTaskHistoryDetail({
            taskId: taskId ,
            url: JSON.parse(localStorage.getItem("permission")).find(
              data =>
                data.description ===
                this.activeRoute.snapshot.params.providerType
            ).url,
            status: this.activeRoute.snapshot.params.status
          })
          .subscribe(data => {
            this.DynamicFormData();
            this.allItemsfromDashboard = data.detailResponseDtos;
            data.detailResponseDtos = [];
            this.formValue = data;

          });
      } else {
        this.formValue = null;
        this.DynamicFormData();
      }
    }
  }
  DynamicFormData() {
    let locationArr: any[] = [];
    locationArr = location.hash.split("/");
    this.dynamicFormService.getForm(locationArr[2]).subscribe(
      data => {
        this.dynamicFormData = data.description;
      },
      err => {
        return err;
      }
    );
  }
}