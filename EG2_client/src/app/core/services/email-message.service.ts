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

  public get(id: string, query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/emailengine/message/${id}?${query}`);
  }
  public update(id: string, data: any) {
    return this.http.put<any>(`${environment.apiUrl}/api/emailengine/message/${id}`, { data });
  }

  public downloadAttachment(id: string) {
    return this.http.get(`${environment.apiUrl}/api/email-engine/attachment/${id}`, { responseType: 'blob' })
  }

}
