import { tableroDentroModel } from "../TableroDentro.model.mjs";

export class TableroDentroService {
    #privateUrl;
    constructor(url) {
        this.#privateUrl = url;
    }
    
    ///////////Tareas

    async  getColumnNames() {
        const tablerosData = await fetch(`${this.#privateUrl+'/column'}`).then(response => response.json());
        const arrayTableros = new Array();
        
        tablerosData.data.forEach((element)=>{
            arrayTableros.push(new tableroDentroModel(element.id,element.name));
        });    

        return arrayTableros;
    }

    //getTaskFoBoard
    async  getTaskFoBoard(idBoard) {
        const tablerosData = await fetch(`${this.#privateUrl+'/taskbyidboard/'+idBoard}`).then(response => response.json());
        const arrayTableros = new Array();
        
        tablerosData.data.forEach((element)=>{
            arrayTableros.push(new tableroDentroModel(element.id,element.name,element.idColumn,element.description,element.create));
        });    

        return arrayTableros;
    }
    
    async createTask(data)
    {     
        await fetch(
            `${this.#privateUrl+'/task'}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }
        ).then(response => response.json());
    }

   

    async editarTarea(data,id)
    {     
        await fetch(
            `${this.#privateUrl+'/task'}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }
        ).then(response => response.json());
    }

    
    async deleteTask(id) {
      
        await fetch(
            `${this.#privateUrl+'/task'}/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        ).then(response => response.json());
    }
}


