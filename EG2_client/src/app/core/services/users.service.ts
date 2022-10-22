import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  public count() {
    return this.http.get<any>(`${environment.apiUrl}/api/user-extended/user/count`);
  }
  public find(query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/user-extended/user?${query}`);
  }
  public findOne(id: string | number) {
    id = id.toString();
    return this.http.get<any>(`${environment.apiUrl}/api/user-extended/user/${id}?populate=deep`);
  }
  public update(id: string | number, formData: FormData) {
    id = id.toString();
    return this.http.put<any>(`${environment.apiUrl}/api/user-extended/user/${id}?populate=deep`, formData).pipe(map(result => {
      console.log(result);
      // TODO update connected user
      return result;
    }));
  }

  public create(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/api/user-extended/user/?populate=deep`, formData);
  }
}
