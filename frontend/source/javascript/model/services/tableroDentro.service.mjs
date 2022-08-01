import { tableroDentroModel } from "../TableroDentro.model.mjs";


/**
 * @class TableroDentroService
 */
export class TableroDentroService {

    #privateUrl;

    constructor(url) {
        this.#privateUrl = url;
    }
    

    /**
     * El metodo getColumnNames se encarga de obtener los nombres de las columnas
     * @returns {Promise<Array>}
     */
    async  getColumnNames() {
        const tablerosData = await fetch(`${this.#privateUrl+'/column'}`).then(response => response.json());
        const arrayTableros = new Array();
        
        tablerosData.data.forEach((element)=>{
            arrayTableros.push(new tableroDentroModel(element.id,element.name));
        });    

        return arrayTableros;
    }

    /**
     * Metodo getTaskForBoard se encarga de obtener las tareas de un tablero
     * @param {*} idBoard 
     * @returns 
     */
    async  getTaskFoBoard(idBoard) {
        const tablerosData = await fetch(`${this.#privateUrl+'/taskbyidboard/'+idBoard}`).then(response => response.json());
        const arrayTableros = new Array();
        
        tablerosData.data.forEach((element)=>{
            arrayTableros.push(new tableroDentroModel(element.id,element.name,element.idColumn,element.description,element.create));
        });    

        return arrayTableros;
    }
    
    /**
     * Metodo create se encarga de crear un nuevo tablero
     * @param {*} data 
     */
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


    /**
     * El metodo editarTask se encarga de editar una tarea
     * @param {*} data 
     * @param {*} id 
     */
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

    
    /**
     * El deleteTask se encarga de eliminar una tarea por hay
     * @param {*} id 
     */
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


