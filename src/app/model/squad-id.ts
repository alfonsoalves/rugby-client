export class SquadId {

    private _fixtureId: number;
    private _playerId: number;

	public fromJSON( _fixtureId: number, _playerId: number) {
        this._fixtureId = _fixtureId;
        this._playerId = _playerId;
	}   
    /**
     * Getter fixtureId
     * @return {number}
     */
	public get fixtureId(): number {
		return this._fixtureId;
	}

    /**
     * Getter $playerId
     * @return {number}
     */
	public get playerId(): number {
		return this._playerId;
	}

    /**
     * Setter fixtureId
     * @param {number} value
     */
	public set fixtureId(value: number) {
		this._fixtureId = value;
	}

    /**
     * Setter $playerId
     * @param {number} value
     */
	public set playerId(value: number) {
		this._playerId = value;
	}


}
