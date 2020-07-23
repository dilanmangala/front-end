import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,OnDestroy,SimpleChanges,OnChanges,
  Input
} from "@angular/core";
// import { PubSubEvent } from "../../../../environments/pub-sub-event";
// import { PubSubService } from "../../../shared/services/pub-sub/pub-sub.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as FileSaver from "file-saver";
@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit ,OnDestroy,OnChanges{
  @Input()  errorMsg: any;
    @ViewChild("content") modalContent: TemplateRef<any>;
  constructor(private modalService: NgbModal, 
    // private pubsub: PubSubService
  ) {}
  errorLog: string;
  open2(content) {
    this.modalService.open(content, { windowClass: "dark-modal" });
  }

  ngOnInit() {
    this.errorLog = undefined;

  }
  downloadButtonClick() {
    let err = this.errorLog.replace('/,/g', '/n');
    err = err.replace('.', '/n');
    const blob = new Blob([err], {
      type: "text/plain"
    });
    FileSaver.saveAs(blob, "Incorrect_Line_Numbers.txt");
  }
  copy() {
    const val = this.errorLog;
    let selBox = document.createElement("textarea");
    selBox.style.position = "fixed";
    selBox.style.left = "0";
    selBox.style.top = "0";
    selBox.style.opacity = "0";
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }
  ngOnDestroy() {
   this.errorMsg = undefined;
    this.errorLog = undefined;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes. errorMsg) {
        if (changes. errorMsg.currentValue !== undefined) {
          this.errorLog = changes. errorMsg.currentValue;
          this.open2(this.modalContent);
          }
        }
      }
}
}

