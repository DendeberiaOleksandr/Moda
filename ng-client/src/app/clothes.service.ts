import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Clothes} from "./clothes";

@Injectable({
  providedIn: 'root'
})
export class ClothesService {

  clothesUrl: string = 'http://localhost:8081/api/v1/clothes';

  constructor(private http: HttpClient) { }

  getClothes(): Observable<Clothes[]> {
    return this.http.get<Clothes[]>(this.clothesUrl);
  }

  getClothesById(id: string): Observable<Clothes>{
    return this.http.get<Clothes>(this.clothesUrl + '/' + id);
  }

  deleteAllClothes(): Observable<any>{
    return this.http.delete(this.clothesUrl);
  }

  deleteClothesById(id: string): Observable<any>{
    return this.http.delete(this.clothesUrl + '/' + id);
  }

  saveClothes(clothes: Clothes): Observable<any>{
    return this.http.post(this.clothesUrl, clothes);
  }
}
