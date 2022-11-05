import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from '../authentification/authentification.service';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,

    private authentificationService: AuthentificationService,
  ) { }
  public find(query: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/event-sources?${query}`);
  }

  public create(source: any) {
    source.owner = this.authentificationService.connectedUser.id;
    return this.http.post<any>(`${environment.apiUrl}/api/event-sources`, { data: source });
  }

  public update(source: any) {
    return this.http.put<any>(`${environment.apiUrl}/api/event-sources/${source.id}`, { data: source });
  }
  public delete(sourceId: string | number) {
    return this.http.delete<any>(`${environment.apiUrl}/api/event-sources/${sourceId}`);
  }
}
