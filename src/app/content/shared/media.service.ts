import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseObject, Lookup } from 'src/app/shared/common-entities.model';
import { Media, MediaQuery} from './media.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  fetchLanguages() {
    return this.http.get<ResponseObject<Lookup[]>>(`${environment.baseUrl}/language`)
    .pipe(
      map(res => {
        if (res.success) { return res.data; }
      })
    );
  }

  fetchTags() {
    return this.http.get<ResponseObject<Lookup[]>>(`${environment.baseUrl}/tags`)
    .pipe(
      map(res => {
        if (res.success) { return res.data; }
      })
    );
  }

  fetchMedia() {
    return this.http.get<ResponseObject<Media[]>>(`${environment.baseUrl}/medialibrary`)
      .pipe(
        map(res => {
          if (res.success) { return res.data; }
        })
      );
  }

  queryMedia(params: MediaQuery) {
    return this.http.post<ResponseObject<Media[]>>(`${environment.baseUrl}/medialibrary/query`, params)
      .pipe(
        map(res => {
          if (res.success) { return res.data; }
        })
      );
  }

  findMedia(id: number) {
    return this.http.get<ResponseObject<Media>>(`${environment.baseUrl}/medialibrary/get/${id}`);
  }

  deleteMedia(id: number) {
    return this.http.delete<ResponseObject<Media>>(`${environment.baseUrl}/medialibrary/delete/${id}`);
  }

  saveMedia(params: Media) {
    if (params.id) { return this.http.put<ResponseObject<Media>>(`${environment.baseUrl}/medialibrary`, params); }
    return this.http.post<ResponseObject<Media>>(`${environment.baseUrl}/medialibrary`, params);
  }

  activateMedia(id: number) {
    return this.http.get<ResponseObject<Media>>(`${environment.baseUrl}/medialibrary/activate?id=${id}`);
  }

  deactivateMedia(id: number) {
    return this.http.get<ResponseObject<Media>>(`${environment.baseUrl}/medialibrary/deactivate?id=${id}`);
  }

  queryDefaultAudio(params: any) {
    return this.http.post<ResponseObject<any[]>>(`${environment.baseUrl}/defaultaudio/query`, params)
      .pipe(
        map(res => {
          if (res.success) { return res.data; }
        })
      );
  }

  findDefaultAudio(id: number) {
    return this.http.get<ResponseObject<any>>(`${environment.baseUrl}/defaultaudio/get/${id}`);
  }

  deleteDefaultAudio(id: number) {
    return this.http.delete<ResponseObject<any>>(`${environment.baseUrl}/defaultaudio/delete/${id}`);
  }

  saveDefaultAudio(params: any) {
    if (params.id) { return this.http.put<ResponseObject<any>>(`${environment.baseUrl}/defaultaudio`, params); }
    return this.http.post<ResponseObject<any>>(`${environment.baseUrl}/defaultaudio`, params);
  }

}
