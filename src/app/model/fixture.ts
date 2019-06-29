import { SquadId } from './Squad-id';
import { Squad } from './Squad';

export class Fixture {
    
    private _id: number;
    private _squad: Squad[];
    private _opposition: string;
    private _level: number;
    private _date: number;
    private _notes: string;

    constructor(private _time: string = "15:00"){}

    public fromJson() {

    }
    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter squad
     * @return {Squad[]}
     */
	public get squad(): Squad[] {
		return this._squad;
	}

    /**
     * Getter opposition
     * @return {string}
     */
	public get opposition(): string {
		return this._opposition;
	}

    /**
     * Getter level
     * @return {number}
     */
	public get level(): number {
		return this._level;
	}

    /**
     * Getter date
     * @return {number}
     */
	public get date(): number {
		return this._date;
	}

    /**
     * Getter notes
     * @return {string}
     */
	public get notes(): string {
		return this._notes;
	}

    /**
     * Getter time
     * @return {string }
     */
	public get time(): string  {
		return this._time;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter squad
     * @param {Squad[]} value
     */
	public set squad(value: Squad[]) {
		this._squad = value;
	}

    /**
     * Setter opposition
     * @param {string} value
     */
	public set opposition(value: string) {
		this._opposition = value;
	}

    /**
     * Setter level
     * @param {number} value
     */
	public set level(value: number) {
		this._level = value;
	}

    /**
     * Setter date
     * @param {number} value
     */
	public set date(value: number) {
		this._date = value;
	}

    /**
     * Setter notes
     * @param {string} value
     */
	public set notes(value: string) {
		this._notes = value;
	}

    /**
     * Setter time
     * @param {string } value
     */
	public set time(value: string ) {
		this._time = value;
	}

}
