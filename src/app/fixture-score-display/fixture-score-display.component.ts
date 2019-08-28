import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Score } from '../model/Score';
import { Utilities } from '../utilities';
import { Fixture } from '../model/Fixture';
import { ScoreService } from '../services/score.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from 'immutable';

@Component({
  selector: 'fixture-score-display',
  templateUrl: './fixture-score-display.component.html',
  styleUrls: ['./fixture-score-display.component.css']
})
export class FixtureScoreDisplayComponent implements OnInit {

  @Input() fixture: Fixture;
  @Input() refresh: boolean;
  private _scores: BehaviorSubject<List<Score>> = new BehaviorSubject(List());
  constructor(private scoreService: ScoreService, private cd: ChangeDetectorRef) {
    
  }

  ngOnChanges () {
      // this.scoreService.getScoresForFixture(this.fixture.id)
      // .subscribe(data => this._scores.next(List(data)));
  }

  ngOnInit() {
  }

  get scores() {
    return this._scores.asObservable();
  }

  private getNameFromType(scoreType) {
    return Utilities.getNameFromType(scoreType);
  }

  private getPlayerName(score: Score) {
    let filteredPlayers = this.fixture.squad.filter(s => s.player.id == score.playerId);
    if (filteredPlayers.length)
      return filteredPlayers[0].player.name
    else 
      return null;
  }

  public addScore(scoreType: number) {
    let score = new Score();
    score.fixtureId = this.fixture.id;
    score.scoreType = scoreType;
    // this.scoreService.addScoreForFixture(score)
    //   .subscribe(data => {
    //     this._scores.next(this._scores.getValue().push(data));
    //   });
  }

  public deleteLastScore() {
    const scoreToDelete: Score = this._scores.getValue().filter(score => {
      return score.playerId == undefined || score.playerId == null;
    }).last();
  //   this.scoreService.deleteScoreForPlayerAndFixture(scoreToDelete)
  //     .subscribe(data => {
  //       const idxOfRemovedElement: number = this._scores.getValue().lastIndexOf(scoreToDelete);
  //       this._scores.next(this._scores.getValue().remove(idxOfRemovedElement));
  //   });
  }
}
