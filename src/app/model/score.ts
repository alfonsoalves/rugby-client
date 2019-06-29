export class Score {

    private _id: number;
    private _fixtureId: number;
    private _playerId: number;
    private _scoreType: number;


    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter fixtureId
     * @return {number}
     */
	public get fixtureId(): number {
		return this._fixtureId;
	}

    /**
     * Getter playerId
     * @return {number}
     */
	public get playerId(): number {
		return this._playerId;
	}

    /**
     * Getter scoreType
     * @return {number}
     */
	public get scoreType(): number {
		return this._scoreType;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter fixtureId
     * @param {number} value
     */
	public set fixtureId(value: number) {
		this._fixtureId = value;
	}

    /**
     * Setter playerId
     * @param {number} value
     */
	public set playerId(value: number) {
		this._playerId = value;
	}

    /**
     * Setter scoreType
     * @param {number} value
     */
	public set scoreType(value: number) {
		this._scoreType = value;
	}
    
    

}
