"use strict";
// Config
import { Config } from "../config.mjs";

// Views
import { TableroDentroView  } from "../view/tableroDentro.view.mjs";

// Services
import { TableroDentroService } from "../model/services/tableroDentro.service.mjs";



/**
 * @class TableroDentroController 
*/
export class TableroDentroController {

    #privateApiyURL;
    #privateView;
    

    /**
     * @constructor se encargar de inicializar el controlador 
     */
    constructor() {
        this.#privateApiyURL = Config.API_URL;        
        this.#privateView = new TableroDentroView();
    }


    /**
     * async init se encarga de inicializar el controlador
     * const servicio se encarga de inicializar el servicio
     * const tablero se encarga de inicializar el tablero
     * var obtenerIdBoard se encarga de obtener el id del tablero
     * var idTablero se encarga de obtener el id del tablero
     * const tasks se encarga de obtener las tareas
     * 
     * this.#privateView.init se encarga de inicializar la vista
     */
    async init() {
        const servicio = new TableroDentroService(this.#privateApiyURL);
        const tableros = await servicio.getColumnNames();
        var obtenerIdBoard = location.search;
        var idTablero = obtenerIdBoard.replace('?id=','');
        const tasks = await servicio.getTaskFoBoard(idTablero);
        this.#privateView.init(tableros,tasks,idTablero);

    }  
    

    /**
     * El async delete se encarga de eliminar una tarea
     * @param {*} id 
     */
    async delete(id){
        const servicio = new TableroDentroService(this.#privateApiyURL);
        await servicio.deleteTask(id);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tarea eliminada correctamente',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.reload()
        })

    }

    /**
     * async create se encarga de crear una tarea
     * @param nombreTarea 
     * @param descripcion 
     * @param idTablero 
     * @param idColumna 
     */
    async create(nombreTarea,descripcion,idTablero,idColumna){
        
        if(nombreTarea == ""){
            Swal.fire(
                'Error',
                'Por favor ingrese el nombre de la tarea',
                'error'
            )
        }else{
            const servicio = new TableroDentroService(this.#privateApiyURL);
            let data = {
                "idColumn":idColumna,
                "idBoard":idTablero,
                "name":nombreTarea,
                "description":descripcion,
                "create": new Date().toISOString()
            };

            /**
             * await servicio.createTask(data) se encarga de crear la tarea
             */
            await servicio.createTask(data);
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


    /**
     * async mover se encarga de mover una tarea a otra columna
     * @param {*} idColumn 
     * @param {*} idTablero 
     * @param {*} name 
     * @param {*} descripcion 
     * @param {*} fechaCreacion 
     * @param {*} id 
     */
    async mover(idColumn,idTablero,name,descripcion,fechaCreacion,id){
        const servicio = new TableroDentroService(this.#privateApiyURL);

        
        let data = {
            "idColumn":idColumn,
            "idBoard":idTablero,
            "name":name,
            "description":descripcion,
            "create": fechaCreacion
        };
        await servicio.editarTarea(data,id);
    
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


    /**
     * async updateTarea se encarga de actualizar una tarea
     * @param {*} idColumn 
     * @param {*} idTablero 
     * @param {*} name 
     * @param {*} descripcion 
     * @param {*} fechaCreacion 
     * @param {*} id 
     */
    async updateTarea (idColumn,idTablero,name,descripcion,fechaCreacion,id){
        const servicio = new TableroDentroService(this.#privateApiyURL);
        let data = {
            "idColumn":idColumn,
            "idBoard":idTablero,
            "name":name,
            "description":descripcion,
            "create": fechaCreacion
        };
        await servicio.editarTarea(data,id);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Tarea editada correctamente',
            showConfirmButton: false,
            timer: 1300
        }).then(() => {
            window.location.reload()
        })
    }
}

export const instance = new TableroDentroController();
instance.init();
