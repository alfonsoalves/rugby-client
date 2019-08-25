import { Utilities } from '../utilities';

export class Card {

    constructor(json?: any) {
        if (json) {
            this._id = json._id;
            this._fixtureId = json._fixtureId;
            this._playerId = json._playerId;
            this._cardType = Utilities.getCardTypeForValue(json._cardType);
        }
    }

    private _id:number;
    private _fixtureId:number;
    private _playerId:number;
    private _cardType:number;
    

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
     * Getter cardType
     * @return {number}
     */
	public get cardType(): number {
		return this._cardType;
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
     * Setter cardType
     * @param {number} value
     */
	public set cardType(value: number) {
		this._cardType = value;
	}


}
