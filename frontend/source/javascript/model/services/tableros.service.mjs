import { tablerosModel } from "../Tableros.model.mjs";

/**
 * @class TablerosService
 */
export class TablerosService {

    #privateUrl;
    
    constructor(url) {
        this.#privateUrl = url;
    }
    
    /**
     * Metodo gatTableros se encarga de obtener los tableros
     * @returns {Promise<Array>}
     */
    async  getTableros() {
        const tablerosData = await this.#getData();
        const arrayTableros = new Array();
        tablerosData.data.forEach((element)=>{
            arrayTableros.push(new tablerosModel(element.id,element.name));
        });    
        return arrayTableros;
    }

    #getData(){
        return fetch(`${this.#privateUrl+'/board'}`).then(response => response.json());
    }


    /**
     * Metodo create se encarga de crear un nuevo tablero
     * @param {*} data 
     */
    async create(data)
    {     
        await fetch(
            `${this.#privateUrl+'/board'}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }
        ).then(response => response.json());
    }


    /**
     * Metodo editar se encarga de editar un tablero existente
     * @param {*} data 
     * @param {*} id 
     */
    async editar(data,id)
    {     
        await fetch(
            `${this.#privateUrl+'/board'}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }
        ).then(response => response.json());
    }


    /**
     * Metodo delete se encarga de eliminar un tablero existente
     * @param {*} id 
     */
    async delete(id) {
        await fetch(
            `${this.#privateUrl+'/board'}/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        ).then(response => response.json());
    }
}


