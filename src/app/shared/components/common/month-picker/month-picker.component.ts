import { PubSubService } from './../../../services/pub-sub/pub-sub.service';

import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ElementRef,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";
import { ImonthPickerConfig } from "./month-picker.config";
import { IDatePickerSelectionItem } from "./date-picker-selection.item";
import { MonthPicker } from "./month-picker";

@Component({
  moduleId: module.id,
  selector: "fdms-month-picker",
  templateUrl: "./month-picker.component.html",
  styleUrls: ["./month-picker.component.css"]
})
export class MonthPickerComponent implements OnInit, OnChanges {
  @Input() model: any;
  @Input() config: ImonthPickerConfig;
  @Output() modelChange = new EventEmitter();
  monthPicker: MonthPicker;
  constructor(private _elementRef: ElementRef, private pubsub: PubSubService) {
    this.monthPicker = new MonthPicker();
  }
  ngOnInit() {
    this.pubsub.$sub("resetMonthYear", data => {
      this.model = new Date();
    });
    if (!this.model) {
    this.model = new Date();
    }
  }
  ngOnChanges(changes: any) {
    if (this.model) {
      this.monthPicker.setCurrentdate(new Date(this.model));
    }
  }
  onCalendarIconClick() {
    this.switchToMonthMode();
    this.monthPicker.setCurrentdate(
      this.model ? new Date(this.model) : new Date()
    );
    this.monthPicker.toggleState();
  }
  switchToYearMode() {
    // this.monthPicker.viewMode = "y";
    // this.monthPicker.fillYearsInSelectionList();
  }
  switchToMonthMode() {
    this.monthPicker.viewMode = "m";
    this.monthPicker.fillMonthsInSelectionList();
  }
  onselectionItemClick(item: IDatePickerSelectionItem) {
      if (item.type === "y") {
      this.monthPicker.displayYear = item.value;
      this.monthPicker.selectedYear = item.value;
      this.switchToMonthMode();
    } else if (item.type === "m") {
      this.onSelectMonth(item);
    }
  }
  onSelectMonth(item: IDatePickerSelectionItem) {
    this.monthPicker.displayMonth = item.text;
    this.monthPicker.displayMonthIndex = item.value;

    this.monthPicker.selectedMonth = item.text;
    this.monthPicker.selectedMonthIndex = item.value;
    this.monthPicker.selectedYear = this.monthPicker.displayYear;

    this.model =
      this.monthPicker.selectedMonthIndex +
      1 +
      "/01/" +
      this.monthPicker.selectedYear;
    this.model = new Date(
      this.monthPicker.selectedYear,
      this.monthPicker.selectedMonthIndex,
      1
    );
    this.monthPicker.state = "closed";
    this.modelChange.next({
      month: this.monthPicker.selectedMonthIndex + 1,
      year: this.monthPicker.selectedYear
    });
  }

  onPrevYearSelection() {
   if(this.monthPicker.displayYear.toString() !== '2000' ){
    this.monthPicker.displayYear--;
  }
    // if (this.monthPicker.viewMode === "y") {
    //   this.monthPicker.fillYearsInSelectionList();
    // }
  // }
  }
  onNextYearSelection() {
    //    if(this.monthPicker.selectionItems.indexOf((this.monthPicker.displayYear)+1)>-1){
 if (this.monthPicker.displayYear.toString() !== new Date().getFullYear().toString()){
  this.monthPicker.displayYear++;
}
  // }
    if (this.monthPicker.viewMode === "y") {
     // this.monthPicker.fillYearsInSelectionList();
    }
  }


  onCancel() {
    this.monthPicker.state = "closed";
  }

  @HostListener("document:click", ["$event", "$event.target"])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this._elementRef.nativeElement.contains(
      targetElement
    );
    if (!clickedInside) {
      this.monthPicker.state = "closed";
    }
  }
}
