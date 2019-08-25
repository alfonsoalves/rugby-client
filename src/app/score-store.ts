import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from 'immutable';
import { Score } from './model/Score';
import { ScoreService } from './services/score.service';
import { Scores } from './scores';

@Injectable({
    providedIn: 'root'
})
export class ScoreStore {
    
    private _scores: BehaviorSubject<List<Score>> = new BehaviorSubject(List([]));

    constructor(private scoreService: ScoreService) {
        
    }

    get scores():Observable<List<Score>> {
        return this._scores.asObservable();
    }
    getScores():Observable<List<Score>> {
        return this._scores.asObservable();
    }


    public loadInitialData(fixtureId: number, playerId:number) {
        this.scoreService.getScoresForPlayerAndFixture(fixtureId, playerId)
        .subscribe(scores => {
            this._scores.next(List(scores));
        },
        err => console.log("Error retrieving Scores", err)
        );

    }


    addScoreForPlayerAndFixture(newScore:Score):Observable<any> {
        let obs = this.scoreService.addScoreForPlayerAndFixture(newScore);
        obs.subscribe(newScore => {
            this._scores.next(this._scores.getValue().push(newScore));
        },
        err => console.log("Error adding new score")
        );
        return obs;
    }

    deleteScoreForPlayerAndFixture(scoreType: number): Observable<Score> {
        let deleted = <Score>this._scores.getValue().filter(score => score.scoreType == scoreType).last();
        let obs: Observable<Score> = this.scoreService.deleteScoreForPlayerAndFixture(deleted);

        obs.subscribe(res => {
            let scores: List<Score> = this._scores.getValue();
            let index = scores.findIndex((score) => score.id === deleted.id);
            this._scores.next(scores.delete(index));
        },
        err => console.log("Error deleting score")
        );

        return obs;
    }
}
