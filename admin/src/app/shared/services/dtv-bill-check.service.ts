import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from "./../../../environments/api-url";
@Injectable()
export class DTVBillCheckService {
  constructor(private http: HttpClient) {}
  DownloadTemplate(path, model: any): Observable<any> {
    return new Observable(obs => {
      const oReq = new XMLHttpRequest();
      oReq.open("GET", path, true);
      oReq.setRequestHeader("content-type", 'application/json');
      oReq.responseType = 'arraybuffer';
      oReq.onload = function(oEvent) {
        const arrayBuffer = oReq.response;
        const byteArray = new Uint8Array(arrayBuffer);
        obs.next(byteArray);
      };
      const body = JSON.stringify(model);
      oReq.send(body);
    });
  }
  billCheck(model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Request-Id': 'Mon May 14 07:24:45 UTC 2018',
         'user': localStorage.getItem('userName').toString(),
        'Authorization': localStorage.getItem('userToken').toString()
      }),
      reportProgress: true
    };
    const formData: FormData = new FormData();
    formData.append('file', model.fileUploadRequest[ model.fileUploadRequest.length - 1].file);
    return this.http.post<any>(API_URL.DTVBILLCHECK + '/billcheck/dtv?yearMonth='
    + model.yearMonth + '&taskName=' + model.taskName,
    formData, httpOptions).map(response => response);
  }
//   billCheck1(model: {url: any,
//     fileUploadRequest: any[]
//   }): Observable<any> {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Request-Id': 'Mon May 14 07:24:45 UTC 2018',
//         'user': localStorage.getItem('userName').toString(),
//         'Authorization': localStorage.getItem('userToken').toString()
//       }),
//       reportProgress: true
//     };
//     const formData: FormData = new FormData();
//     if ( model.fileUploadRequest.length > 1 ) {
//     model.fileUploadRequest.forEach( item => {
//       formData.append(item.name, item.file);
//     });
// } else if (model.fileUploadRequest.length === 1 ) {
//   formData.append(model.fileUploadRequest[0].name, model.fileUploadRequest[0].file);
//  }
//     return this.http.post<any>( model.url,
//     formData, httpOptions).map(response => response);
//   }
}
