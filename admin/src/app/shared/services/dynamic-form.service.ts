import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from "../../../environments/api-url";


@Injectable()
export class DynamicFormService {
  constructor(private http: HttpClient) {}
  billCheck(model: {url: any,
    fileUploadRequest: any[]
  }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Request-Id': 'Mon May 14 07:24:45 UTC 2018',
        'user': localStorage.getItem('userName').toString(),
        'Authorization': localStorage.getItem('userToken').toString()
      }),
      reportProgress: true
    };
    const formData: FormData = new FormData();
    if ( model.fileUploadRequest.length > 1 ) {
    model.fileUploadRequest.forEach( item => {
      formData.append(item.name, item.file);
    });
} else if (model.fileUploadRequest.length === 1 ) {
  formData.append(model.fileUploadRequest[0].name, model.fileUploadRequest[0].file);
 }
    return this.http.post<any>( model.url,
    formData, httpOptions).map(response => response);
  }
  DownloadDetail(type, apiurl): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: type,
        user: localStorage.getItem("userToken").toString()
      })
    };
    return this.http
      .post<any>(
        apiurl,
        httpOptions,
        { responseType: "blob" as "json" }
      )
      .map(response => response);
  }
  getForm(control): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        user: localStorage.getItem("userToken").toString()
      })
    };
   const apiurl = API_URL.CPANAL + "/dynamicui/getform?controlName=" + control;
    return this.http
      .get<any>(
        apiurl,
        httpOptions
      )
      .map(response => response);
  }
}
