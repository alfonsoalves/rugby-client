import { Score } from './model/Score';

export class Scores {
    private _tries: Score[];
    private _penalties: Score[];
    private _conversions: Score[];
 
    public addScore(score: Score) {
        switch (score.scoreType) {
            case 0:
                this._tries.push(score);
                break;
            case 1:
                this._penalties.push(score);
                break;
            case 2:
                this._conversions.push(score);
                break;
        }
    }
    
    static fromName(name: String) {
      if (name == 'tries')
        return 0;
      else if (name == 'penalties')
        return 1;
      else if (name == 'conversions')
        return 2;
    }
    /**
     * Getter tries
     * @return {Score[]}
     */
    public get tries(): Score[] {
        return this._tries;
    }

    /**
     * Getter penalties
     * @return {Score[]}
     */
    public get penalties(): Score[] {
        return this._penalties;
    }

    /**
     * Getter conversions
     * @return {Score[]}
     */
    public get conversions(): Score[] {
        return this._conversions;
    }

    /**
     * Setter tries
     * @param {Score[]} value
     */
    public set tries(value: Score[]) {
        this._tries = value;
    }

    /**
     * Setter penalties
     * @param {Score[]} value
     */
    public set penalties(value: Score[]) {
        this._penalties = value;
    }

    /**
     * Setter conversions
     * @param {Score[]} value
     */
    public set conversions(value: Score[]) {
        this._conversions = value;
    }
    
    public getFromName(name: String): Score[] {
      if (name == 'tries')
        return this._tries;
      else if (name == 'conversions')
        return this._conversions;
      else if (name == 'penalties')
        return this._penalties;
    }
  
  }