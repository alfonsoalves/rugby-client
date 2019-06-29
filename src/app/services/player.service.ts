import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from '../model/Player';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersUrl: string;
 
  constructor(private http: HttpClient) {
    this.playersUrl = 'https://skylight-riddle-thistle.herokuapp.com/players';
  }
 
  public findAll(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl).pipe(map(data => {
      let tempArray = new Array<Player>();
      data.forEach(player => {
        let p = new Player();
        p.id = (<any>player)._id;
        p.name = (<any>player)._name;
        tempArray.push(p);
      });
      return tempArray;
    }), map(players => players.sort(Player.sort)));
  }
 
  public save(player: Player) {
    return this.http.post<Player>(this.playersUrl, player);
  }
}
