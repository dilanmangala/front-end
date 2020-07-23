import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Task } from "..";
import { API_URL } from "../../../environments/api-url";
import { TaskDetail } from "../models/task-detail/task-detail";

@Injectable()
export class MyTaskHistoryService {
  constructor(private http: HttpClient) {}
  public GetTaskHistory(param: any): Observable<Task[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Request-Id": "Mon May 14 07:24:45 UTC 2018",
        user: localStorage.getItem("userToken").toString()
      })
    };
    return this.http
      .get<Task[]>(
        API_URL.CPANAL +
          "/taskhistory/?status=" +
          param.status +
          "&providerTypes=" +
          param.providerTypes +
          "&addedFromDate=" +
          param.addedFromDate +
          "&addedToDate=" +
          param.addedToDate +
          "&completedFromDate=" +
          param.completedFromDate +
          "&completedToDate=" +
          param.completedToDate,
        httpOptions
      )
      .map(response => response);
  }
  public GetTaskHistoryDetail(param: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Request-Id": "Mon May 14 07:24:45 UTC 2018",
        user: localStorage.getItem("userToken").toString()
      })
    };
    return this.http.get<TaskDetail>(
      param.url + "/taskdetail/detail?taskId=" + param.taskId,
      // "&status=" +
      // param.status
      httpOptions
    );
  }

  download(param: {
    format: string;
    urlExt: string;
    status: string;
    addedToDate: string;
    addedFromDate: string;
    completedToDate: string;
    completedFromDate: string;
    providerType: string;
  }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: param.format,
        user: localStorage.getItem("userToken").toString()
      })
    };
    return this.http
      .post<any>(
        API_URL.CPANAL +
          "/taskhistory/" +
          param.urlExt +
          "?status=" +
          param.status +
          "&addedFromDate=" +
          param.addedFromDate +
          "&addedToDate=" +
          param.addedToDate +
          "&completedFromDate=" +
          param.completedFromDate +
          "&providerTypes=" +
          param.providerType +
          "&completedToDate=" +
          param.addedToDate,
        httpOptions,
        { responseType: "blob" as "json" }
      )
      .map(response => response);
  }
  DownloadDetail(type, url, taskId): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: type,
        user: localStorage.getItem("userToken").toString()
      })
    };
    return this.http
      .post<any>(url + "/download/download-result?id=" + taskId, httpOptions, {
        responseType: "blob" as "json"
      })
      .map(response => response);
  }

  DownloadTemplate(url, format): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: format,
        user: localStorage.getItem("userToken").toString()
      })
    };
    return this.http
      .post<any>(url + "/download/download-template", httpOptions, {
        responseType: "blob" as "json"
      })
      .map(response => response);
  }
}
