import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminUser} from '../models/create-user/admin-user';
import {
  DepartmentRequest,
  Department,
  DepartmentResponse,
  CreateUserRoleRequest
  , CreateUserRequest
} from '..';
import {API_URL} from './../../../environments/api-url';

@Injectable()
export class DepartmentService {

  userListToSave: any;

  constructor(private http: HttpClient) {
  }

  public GetRolesPermission(): Observable<Department[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http
      .get<Department[]>(
        API_URL.ROLES_PERMISSIONS + '/rolespermission/',
        httpOptions
      )
      .map(response => response);
  }

  public AddDepartment(postRequest: DepartmentRequest): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('userToken'),
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http
      .post<any>(
        API_URL.ROLES_PERMISSIONS + '/department/',
        postRequest,
        httpOptions
      )
      .map(response => response);
  }

  public GetUserRole(department: string): Observable<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http
      .get<DepartmentResponse[]>(
        API_URL.ROLES_PERMISSIONS + '/userrole/' + department,
        httpOptions
      )
      .map(response => response);
  }

  public GetDepartment(): Observable<DepartmentResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http
      .get<DepartmentResponse[]>(
        API_URL.ROLES_PERMISSIONS + '/department/',
        httpOptions
      )
      .map(response => response);
  }

  public GetPermissionListByDepartmentId(
    department: string
  ): Observable<DepartmentResponse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .get<DepartmentResponse[]>(
        API_URL.ROLES_PERMISSIONS + '/department/' + department,
        httpOptions
      )
      .map(response => response);
  }

  public UpdateDepartment(body: DepartmentRequest): Observable<any> {
     const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json'

      })
    };
    return this.http.post<any>(API_URL.ROLES_PERMISSIONS + '/department/update/', body,
      httpOptions
    )
      .map(response => response);
  }

  public CreateUserRole(roleDetail: { postrequest: CreateUserRoleRequest, department: string }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      })
    };
    return this.http.post<any>(API_URL.ROLES_PERMISSIONS + '/userrole/' + roleDetail.department,
      roleDetail.postrequest,
      httpOptions).map(response => response);
  }

  public GetUserRolePermission(roleName: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      })
    };
    return this.http.get<any>(API_URL.ROLES_PERMISSIONS + '/userrole/permissions/' + roleName,
      httpOptions).map(response => response);
  }

  CreateAdminUser(postRequest: CreateUserRequest): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      })
    };
    return this.http.post<any>(API_URL.ROLES_PERMISSIONS + '/adminuser/', postRequest, httpOptions).map(response => response);
  }

  GetUserByUserName(userName: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      })
    };
    return this.http.get<any>(API_URL.ROLES_PERMISSIONS + '/adminuser/' + userName, httpOptions).map(response => response);
  }

  getLdapAdminUserByUserName(userName: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      })
    };
    return this.http.get<any>(API_URL.ROLES_PERMISSIONS + '/adminuser/ldap/' + userName, httpOptions).map(response => response);
  }

  getLdapUserByUserName(user: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      })
    };
    return this.http.get<any>(API_URL.ROLES_PERMISSIONS + '/adminuser/unique/' + user, httpOptions).map(response => response);
  }

  UpdateAdminUser(postRequest: CreateUserRequest): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      })
    };
    return this.http.post<any>(API_URL.ROLES_PERMISSIONS + '/adminuser/update', postRequest, httpOptions).map(response => response);
  }

  public UpdateUserRole(roleDetail: { postrequest: CreateUserRoleRequest, department: string }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      })
    };
    return this.http.put<any>(API_URL.ROLES_PERMISSIONS + '/userrole/',
      roleDetail.postrequest,
      httpOptions).map(response => response);
  }
}
