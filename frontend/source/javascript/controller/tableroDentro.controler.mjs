"use strict";
// Config
import { Config } from "../config.mjs";

// Views
import { TableroDentroView  } from "../view/tableroDentro.view.mjs";

// Services
import { TablerosService } from "../model/services/tableros.service.mjs";



export class TableroDentroController {
    #privateApiyURL;
    #privateView;
    

    constructor() {
        this.#privateApiyURL = Config.API_URL;        
        this.#privateView = new TableroDentroView();
    }

    async init() {
        
        const servicio = new TablerosService(this.#privateApiyURL);
        const tableros = await servicio.getColumnNames();
        var ga = location.search;
        debugger;
        var id = ga.replace('?id=','');
        var idTablero = id;
        const tasks = await servicio.getTaskFoBoard(idTablero);
        this.#privateView.init(tableros,tasks,idTablero);

    }  
    
    async delete(id){
        debugger;
        const servicio = new TablerosService(this.#privateApiyURL);
        await servicio.deleteTask(id);
        alert("Tarea Eliminada correctamente");
        window.location.reload();

    }
    async create(nombreTarea,descripcion,idTablero,idColumna){
        
        if(nombreTarea == ""){
            Swal.fire(
                'Error',
                'Por favor ingrese el nombre de la tarea',
                'error'
            )
        }else{
            const servicio = new TablerosService(this.#privateApiyURL);
            let nombre = {
                "idColumn":idColumna,
                "idBoard":idTablero,
                "name":nombreTarea,
                "description":descripcion,
                "create": new Date().toISOString()
            };
            await servicio.createTask(nombre);
            //const tableros = await servicio.getTableros();
            //this.#privateView.init(tableros);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Tarea Creada correctamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload()
            })
        }
    }

    async mover(idColumn,idTablero,name,descripcion,fechaCreacion,id){
        const servicio = new TablerosService(this.#privateApiyURL);

        let nombre = {
            "idColumn":idColumn,
            "idBoard":idTablero,
            "name":name,
            "description":descripcion,
            "create": fechaCreacion
        };
        await servicio.editarTarea(nombre,id);
        //const tableros = await servicio.getTableros();
        //this.#privateView.init(tableros);

        const movimiento = idColumn == 1 || idColumn == 2 || idColumn == 3;
        if(movimiento){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Tarea Movida correctamente',
                showConfirmButton: false,
                timer: 1300
            }).then(() => {
                window.location.reload()
            })
        }
    }
}

export const instance = new TableroDentroController();
instance.init();
