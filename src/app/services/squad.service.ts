import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Squad } from '../model/Squad';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SquadId } from '../model/Squad-id';
import { Player } from '../model/Player';
@Injectable({
  providedIn: 'root'
})
export class SquadService {

  private squadsUrl: string;
 
  constructor(private http: HttpClient) {
    this.squadsUrl = 'https://skylight-riddle-thistle.herokuapp.com/squads';
  }
 
  public findAll(): Observable<Squad[]> {
    return this.http.get<Squad[]>(this.squadsUrl).pipe(map(data => {
      let tempArray = new Array<Squad>();
      data.forEach(squadData => {
        let s = new Squad(squadData);
        tempArray.push(s);
      });
      return tempArray;
    }));
  }
 
  public save(squad: Squad) {
    return this.http.post<Squad>(this.squadsUrl, squad);
  }

  public removePlayer(squad: Squad) {
    return this.http.post<Squad>(this.squadsUrl + '/' + squad.squadId.fixtureId + '/' + squad.squadId.playerId, {});
  }
  public updateSubHooker(squad: Squad) {
    return this.http.post<Squad>(this.squadsUrl + '/sub_hooker/' + squad.squadId.fixtureId + '/' + squad.squadId.playerId, squad.squadId);
  }
  public updateSubProp(removeSubPropStatusFrom:Squad, squad: Squad) {
    let params = new HttpParams();
    if (removeSubPropStatusFrom) {
      params = params.append('idToSetToZero', removeSubPropStatusFrom.player.id.toString());
    }
    return this.http.post<Squad>(this.squadsUrl + '/sub_prop/' + squad.squadId.fixtureId + '/' + squad.squadId.playerId, squad.squadId, {params: params});
  }

  public removeSubProp(squad: Squad) {
    return this.http.delete(this.squadsUrl + '/sub_prop/' + squad.squadId.fixtureId + '/' + squad.squadId.playerId);
  }

  public deleteSquad(fixtureId: number) {
    return this.http.delete(this.squadsUrl + '/' + fixtureId);
  }
}
