'use strict';

export class tablerosModel {
    #privateId;
    #privateName;

    constructor(id,name) {
        this.#privateId = id;
        this.#privateName = name;
    }
    get Name() {
        return this.#privateName;
    }
    set Name(name) {
        this.#privateName = name;
    }
    get Id() {
        return this.#privateId;
    }
    set Id(id) {
        this.#privateId = id;
    }
    toString() {
        return `${this.#privateId}${this.#privateName}`;
    }
}