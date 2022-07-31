import { tablerosModel } from "../Tableros.model.mjs";

export class TablerosService {
    #privateUrl;
    constructor(url) {
        this.#privateUrl = url;
    }
    // tableros 
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


