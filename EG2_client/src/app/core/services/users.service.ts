import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }
  public find() {
    return this.http.get<any>(`${environment.apiUrl}/api/user-extended/find/?populate=deep`);
  }
  public findOne(id: string | number) {
    id = id.toString();
    return this.http.get<any>(`${environment.apiUrl}/api/user-extended/findOne/${id}?populate=deep`);
  }
  public update(id: string | number, formData: FormData) {
    id = id.toString();
    return this.http.post<any>(`${environment.apiUrl}/api/user-extended/update/${id}?populate=deep`, formData).pipe(map(result => {
      console.log(result);
      // TODO update connected user
      return result;
    }));;
  }
}
