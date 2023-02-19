import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CatModelAPI, CatModelUnsplashAPI } from '../../models/cat.model';
import { environment } from 'src/environments/environment';
import { UserModelAPI } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CatApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCats(): Observable<CatModelAPI[]> {
    return this.httpClient.get<any>(environment.url + 'breeds')
  }
  getCatId(id:any): Observable<CatModelAPI> {
    return this.httpClient.get<any>(environment.url + 'breeds/' + id)
  }
  getCatRandom(): Observable<CatModelUnsplashAPI> {
    return this.httpClient.get<any>(environment.urlUnsplash)
  }
  // postUserLogin(urlUserLogin:urlUserLogin): Observable<UserModelAPI> {
  //   return this.httpClient.post<UserModelAPI>(environment.urlUserLogin, urlUserLogin)
  // }

}
