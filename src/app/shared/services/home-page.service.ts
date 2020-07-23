import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LineChartResponse } from '../models/line-chart/line-chart.response';
 import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../environments/api-url';
@Injectable()
export class HomePageService {

  constructor(private http: HttpClient) { }
public GetErrornousRecords(): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({
      // 'Authorization': localStorage.getItem("userToken"),
      "Access-Control-Allow-Origin": "*",
    })
  };
  return this.http
  .get<LineChartResponse>(
    API_URL.DTVBILLCHECK + '/analytic/error?userName=' + localStorage.getItem("userName").toString(),
    httpOptions
  )
  .map(response => response);
}
public GetAllRecords(): Observable<LineChartResponse> {
  const httpOptions = {
    headers: new HttpHeaders({
      // 'Authorization': localStorage.getItem("userToken"),
      "Access-Control-Allow-Origin": "*",
    })
  };
  return this.http
    .get<LineChartResponse>(
      API_URL.DTVBILLCHECK + '/analytic/all?userName=' + localStorage.getItem('userName').toString(),
      httpOptions
    )
    .map(response => response);
}
  GetDynamicDashboardDetails() {
    const httpOptions = {
      headers: new HttpHeaders({
         'Authorization': localStorage.getItem('userToken'),
        'Access-Control-Allow-Origin': '*',
      })
    };
    return this.http
    .get<any[]>(
      API_URL.CPANAL + '/dynamicui/dashboard',
      httpOptions
    )
    .map(response => response);
  }
}

