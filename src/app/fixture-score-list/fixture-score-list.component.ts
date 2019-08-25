import { Component, OnInit, Input } from '@angular/core';
import { List } from 'immutable';
import { Score } from '../model/Score';
import { Fixture } from '../model/Fixture';
import { Observable } from 'rxjs';
import { Utilities } from '../utilities';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'fixture-score-list',
  templateUrl: './fixture-score-list.component.html',
  styleUrls: ['./fixture-score-list.component.css'],
  providers: [DatePipe]
})
export class FixtureScoreListComponent implements OnInit {

  @Input() scoresList: Observable<List<Score>>;
  @Input() fixture: Fixture;
  public scores: Score[];
  public entries: List<Entry>;
  constructor(private datePipe: DatePipe) {
    this.entries = List();
  }

  ngOnInit() {
    this.scoresList.subscribe(data => {
      this.scores = data.toArray()
      this.entries = (List(this.scores)).map(s => new Entry(this.getNameFromType(s.scoreType) + ' - ' + this.transformDate(s.time), this.getPlayerName(s)));
    });
  }

  private getPlayerName(score: Score) {
    if (score) {
      let filteredPlayers = this.fixture.squad.filter(s => s.player.id == score.playerId);
      if (filteredPlayers.length)
        return filteredPlayers[0].player.name
      else 
        return null;
    } else {
      return ''
    }
  }

  public getNameFromType(scoreType:number) {
    return Utilities.getNameFromType(scoreType);
  }

  public getScores(scoreType:number, home: boolean):number {
    if (home) {
      return this.scores.filter(s => Utilities.includeScoreType(s.scoreType) && s.playerId != null).filter(s => s).length;
    }
    return this.scores.filter(s => Utilities.includeScoreType(s.scoreType) && s.playerId == null).filter(s => s).length;
  }


  private getTeam(score: Score) {
    if (score.playerId) {
      return 'UCD';
    } else {
      return this.fixture.opposition;
    }
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'h:mm a');
  }
}
export class Entry {
  private _header: string;
  private _content: string;
  
  public constructor(header: string, content: string) {
    this._header = header;
    this._content = content;
  }

  public get header():string {
    return this._header;
  }

  /**
   * Setter header
   * @param {string} value
   */
  public set header(value: string) {
    this._header = value;
  }
      
  public get content():string {
    return this._content;
  }


  /**
   * Setter content
   * @param {string} value
   */
	public set content(value: string) {
		this._content = value;
	}


}