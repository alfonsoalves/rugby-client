import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Card } from '../model/card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardType } from '../model/card-type.enum';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  baseUrl = environment.baseUrl;
  url:string;

  constructor(private http: HttpClient) {
    this.url = this.baseUrl + 'cards';
  }

  public getCardsByFixture(fixtureId:number):Observable<Card[]> {
    return this.http.get<Card[]>(this.url + '/' + fixtureId).pipe(
      map(data => {
        let tempArray = new Array<Card>();
        data.forEach(card => {
          tempArray.push(new Card(card));
        });
        return tempArray;
        })
    )
  }

  public deleteCardById(id:number) {
    return this.http.delete(this.url + '/' + id);
  }

  public addCard(fixtureId: number, playerId: number, cardType: CardType) {
    return this.http.post(this.url + '/' + fixtureId + '/' + playerId, cardType).pipe(
      map(data => {
        return new Card(data);
        })
    );
  }

}
