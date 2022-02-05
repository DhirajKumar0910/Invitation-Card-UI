import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateInvResp } from '../model/create-inv-resp';

@Injectable({
  providedIn: 'root'
})
export class CreateinvitationService {

  constructor(private http:HttpClient) { }

  createSingleInvitation(data:any, file:any, fontFileArr: File[]): Observable<CreateInvResp>{
    const formData = new FormData();
    formData.append("invitationDTO", new Blob([JSON.stringify(data)], {
      type: "application/json"
    }));
    formData.append("file", file);
    formData.append('fontFileArray', new Blob(fontFileArr));

    return this.http.post<CreateInvResp>(environment.localUrl + "createSingleInvitation", formData);
  }

  getFontTypes(): Observable<string[]>{ 
    return this.http.get<string[]>(environment.localUrl + "getFontTypes");
  }
}
