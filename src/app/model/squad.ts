import { SquadId } from './Squad-id'
import { Player } from './Player';
export class Squad {

    private _squadId: SquadId;
    private _level: number;
    private _sub_prop: number;
    private _sub_hooker: number;
    private _player: Player;
    private _position: number;

    constructor(json?: any) {
        if (json) {
            this._squadId = new SquadId();
            this._squadId.fromJSON(json._squadId._fixtureId, json._squadId._playerId);
            this._level = json._level;
            this._sub_prop = json._sub_prop;
            this._sub_hooker = json._sub_hooker;
            this._position = json._position;
        }
    }

    /**
     * Getter position
     * @param {number} value
     */
	public get position() {
		return this._position;
	}

    /**
     * Setter position
     * @param {number} value
     */
	public set position(value: number) {
		this._position = value;
	}

    /**
     * Getter squadId
     * @return {SquadId}
     */
	public get squadId(): SquadId {
		return this._squadId;
	}

    /**
     * Getter level
     * @return {number}
     */
	public get level(): number {
		return this._level;
	}

    /**
     * Getter sub_prop
     * @return {number}
     */
	public get sub_prop(): number {
		return this._sub_prop;
	}

    /**
     * Getter sub_hooker
     * @return {number}
     */
	public get sub_hooker(): number {
		return this._sub_hooker;
	}

    /**
     * Setter squadId
     * @param {SquadId} value
     */
	public set squadId(value: SquadId) {
		this._squadId = value;
	}

    /**
     * Setter level
     * @param {number} value
     */
	public set level(value: number) {
		this._level = value;
	}

    /**
     * Setter sub_prop
     * @param {number} value
     */
	public set sub_prop(value: number) {
		this._sub_prop = value;
	}

    /**
     * Setter sub_hooker
     * @param {number} value
     */
	public set sub_hooker(value: number) {
		this._sub_hooker = value;
	}

    /**
     * Getter player
     * @return {Player}
     */
	public get player(): Player {
		return this._player;
	}

    /**
     * Setter player
     * @param {Player} value
     */
	public set player(value: Player) {
		this._player = value;
	}

}
