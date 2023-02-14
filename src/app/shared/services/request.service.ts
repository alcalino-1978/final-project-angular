import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CatModelAPI } from '../../models/cat.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCats(): Observable<CatModelAPI[]> {
    return this.httpClient.get<any>(environment.url + 'breeds', {
      headers: {
        'X-Api-Key': environment.CATS_API_KEY
      }
    })
  }
  getCatId(id:any): Observable<CatModelAPI> {
    return this.httpClient.get<any>(environment.url + 'breeds/' + id, {
      headers: {
        'X-Api-Key': environment.CATS_API_KEY
      }
    })
  }

}