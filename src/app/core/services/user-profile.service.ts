import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface ISubmitDataInput {
  name: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  mobile_phone?: string;
}

type data = { [key: string]: any };

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  /** Submit data */
  submitData(data: ISubmitDataInput): Observable<data> {
    return this.http.post<data>('https://reqres.in/api/users', data);
  }

  /** Load foo */
  loadFoo(fooID: number): Observable<data> {
    return this.http.get<data>(`https://reqres.in/api/users/${fooID}`);
  }
}
