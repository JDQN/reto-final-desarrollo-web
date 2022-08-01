"use strict";
// Config
import { Config } from "../config.mjs";

// Views
import { TablerosView  } from "../view/tableros.view.mjs";

// Services
import { TablerosService } from "../model/services/tableros.service.mjs";



/**
 * @class TablerosController
 */
export class TablerosController {
    
    #privateApiyURL;
    #privateView;


    constructor() {
        this.#privateApiyURL = Config.API_URL;        
        this.#privateView = new TablerosView();
    }

    /**
     * El metodo initi()  se encarga de inicializar el controlador
     * const servicio se encarga de inicializar el servicio
     * const tableros se encarga de inicializar el tablero
     * this.#privateView.init se encarga de inicializar la vista
     */
    async init() {
        const servicio = new TablerosService(this.#privateApiyURL);
        const tableros = await servicio.getTableros();
        this.#privateView.init(tableros);
    }  


    /**
     * create se encarga de crear un nuevo tablero
     * @param {*} text 
     */
    async create(text){
        
        if(text == ""){
            Swal.fire(
                'Error',
                'Ingresar un nombre al tablero que desea crear',
                'error'
            )
        }else{
            const servicio = new TablerosService(this.#privateApiyURL);
            let data = { "name":text,"createdAt": new Date().toISOString() };
            await servicio.create(data);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Tablero creado correctamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload()
            })
        }
    }

    /**
     * delete se encarga de eliminar un tablero
     * @param {*} id 
     */
    async delete(id){
        const servicio = new TablerosService(this.#privateApiyURL);
        await servicio.delete(id);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Tablero eliminado correctamente',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.reload()
        })
        
    }


    /**
     * editar se encarga de editar un tablero para cambiar el nombre del tablero
     * @param {*} text 
     * @param {*} id 
     */
    async editar(text,id){
        if(text == ""){
            Swal.fire(
                'Error',
                'Ingresar un nombre nuevo al tablero que desea editar',
                'error'
            )
        }else{
            const servicio = new TablerosService(this.#privateApiyURL);
            let data = {"name":text,
                "updatedAt":  new Date().toISOString()
            };
            await servicio.editar(data,id);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Tablero Editado correctamente',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload()
            })
        }
    }
}

export const instance = new TablerosController();
instance.init();