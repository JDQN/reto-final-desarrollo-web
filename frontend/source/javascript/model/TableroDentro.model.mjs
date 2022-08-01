'use strict';

/**
 * @class TableroDentroController 
 */
export class tableroDentroModel {
    

    #privateId;
    #privateName;
    #privateIdColumn;
    #privateDescripcionTarea;
    #privateFechaCreacionTarea;

    constructor(id,name,idColumn,descripcion,fecha) {
        this.#privateId = id;
        this.#privateName = name;
        this.#privateIdColumn = idColumn;
        this.#privateDescripcionTarea = descripcion;
        this.#privateFechaCreacionTarea = fecha;
    }

    get Name() {
        return this.#privateName;
    }

    set Name(name) {
        this.#privateName = name;
    }

    get IdColumn() {
        return this.#privateIdColumn;
    }

    set IdColumn(idColumn) {
        this.#privateIdColumn = idColumn;
    }

    get Id() {
        return this.#privateId;
    }

    set Id(id) {
        this.#privateId = id;
    }

    get DescripcionTarea() {
        return this.#privateDescripcionTarea;
    }

    set DescripcionTarea(descripcionTarea) {
        this.#privateDescripcionTarea = descripcionTarea;
    }

    get FechaCreacionTarea(){
        return this.#privateFechaCreacionTarea;
    }

    set FechaCreacionTarea(fechaCreacionTarea) {
        this.#privateFechaCreacionTarea = fechaCreacionTarea;
    }

    toString() {
        return `${this.#privateName} ${this.#privateIdColumn}${this.#privateId}${this.#privateDescripcionTarea}${this.#privateFechaCreacionTarea}`;
    }
}