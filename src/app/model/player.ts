export class Player {
    private _id: number;
    private _name: string;


    /**
     * Getter id
     * @return {string}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Setter id
     * @param {string} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

    static sort(a:Player, b:Player) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0
    }

}
