import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fixture } from '../model/Fixture';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {

  private fixturesUrl: string;
 
  constructor(private http: HttpClient) {
    this.fixturesUrl = 'https://skylight-riddle-thistle.herokuapp.com/fixtures';
  }
 
  public findAll(): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(this.fixturesUrl).pipe(map(data => {
      let tempArray = new Array<Fixture>();
      data.forEach(fixture => {
        let f = new Fixture();
        f.date = (<any>fixture)._date;
        f.id = (<any>fixture)._id;
        f.level = (<any>fixture)._level;
        f.notes = (<any>fixture)._notes;
        f.opposition = (<any>fixture)._opposition;
        f.time = (<any>fixture)._time;
        f.squad = new Array();
        tempArray.push(f);
      });
      return tempArray;
    }));
  }
  
  public getNextSquadId(): Observable<number> {
    return this.http.get<number>(this.fixturesUrl + '/nextSquadId')
  }

  public save(fixture: Fixture) {
    return this.http.post<Fixture>(this.fixturesUrl, fixture);
  }

  public postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http
      .post<File>('https://skylight-riddle-thistle.herokuapp.com/upload-team-sheet', formData);
  }
}
