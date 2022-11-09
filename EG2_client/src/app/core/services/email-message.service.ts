import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailMessagesService {

  constructor(
    private http: HttpClient,
  ) { }

  public search(data, query: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/emailengine/messages?${query}`, { data });
  }

}
