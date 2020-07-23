import {GetModificationTypeResponse} from './../models/get-modification-type/get-modification-type.response';
import {AddModifiedReason} from './../models/modified-reason/add-modified-reason';
import {Observable} from 'rxjs/Observable';
import {API_URL} from './../../../environments/api-url';
import {ModificationType} from './../models/modification-type/modification-type';
import {Injectable} from '@angular/core';
// import { FileUploadResponse, FileUploadRequest } from '..';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
// import { AnonymousSubscription } from 'rxjs/Subscription';
import {AddModifiedReasonResponse} from '../models/modified-reason/add-modified-reson.response';


@Injectable()
export class CommonService {

  constructor(private http: HttpClient) {
    //   this.getJSON().subscribe(data => {
    //     console.log(data) ;
    // });
  }
  public GetJSON(): Observable<any> {
    return this.http.get<any>('./assets/dropdownData.json').map(response => response);
  }

  public GetModificationType(): Observable<ModificationType[]> {
    const res = this.http.get<ModificationType[]>(API_URL.ADMIN_SERVICE + '/modificationtype/').map(response => response);
    return res;
  }

  public AddModifiedReason(body: AddModifiedReason): Observable<AddModifiedReasonResponse> {
    return this.http.post<AddModifiedReasonResponse>(API_URL.ADMIN_SERVICE + '/reasoncode/', body).map(response => response);
  }

  public GetModificationTypeForDropdown(modificationTypeid: number): Observable<GetModificationTypeResponse[]> {
    return this.http.get<GetModificationTypeResponse[]>(API_URL.ADMIN_SERVICE + '/reasoncode/filterbymodifyid/' + modificationTypeid)
    // return this.http.get<GetModificationTypeResponse[]>('./assets/test.json')
      .map(response => response);
  }

  public GetTaken(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<any>('https://13.251.157.229:8443/auth/realms/master/protocol/openid-connect/token',
      {
        'client_id': 'admin-cli',
        'username': 'admin',
        'password': '1234',
        'grant_type': 'password'
      }, httpOptions).map(response => response);
  }
}
