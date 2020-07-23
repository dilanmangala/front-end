import { IDatePickerSelectionItem } from "./date-picker-selection.item";

export class MonthPicker {
  state: string;
  selectionItems: Array<IDatePickerSelectionItem>;
  selectedMonth: string;
  selectedMonthIndex: number;
  selectedYear: number;
  displayMonth: string;
  displayMonthIndex: number;
  displayYear: number;
  viewMode: string;
  months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  constructor() {
    this.state = "closed";
    this.viewMode = "m";
    this.fillMonthsInSelectionList();
    const currentDate = new Date();
    this.setCurrentdate(currentDate);
  }
  toggleState() {
    this.state = this.state === "closed" ? "open" : "closed";
  }

  fillMonthsInSelectionList() {
    this.selectionItems = [];
    this.months.forEach((v: string, i: number) =>
      this.selectionItems.push({ text: v, value: i, type: "m" })
    );
  }
  fillYearsInSelectionList() {
    this.selectionItems = [];
    for (
      let start = this.displayYear - 6;
      start <= this.displayYear ;
      start++
    ) {
      this.selectionItems.push({
        text: start.toString(),
        value: start,
        type: "y"
      });
    }
  }
  setCurrentdate(currentDate: Date) {
    this.displayMonth = this.months[currentDate.getMonth()];
    this.displayMonthIndex = currentDate.getMonth();
    this.displayYear = currentDate.getFullYear();

    this.selectedMonth = this.displayMonth;
    this.selectedMonthIndex = this.displayMonthIndex;
    this.selectedYear = this.displayYear;
  }
}
