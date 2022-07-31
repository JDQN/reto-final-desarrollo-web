'use strict';
import { TablerosController} from "../controller/tableros.controler.mjs";
import { Config } from "../config.mjs";

export class TablerosView {

    #privateBody;

    constructor() {
        document.title = "Lista de tableros";
        this.#privateBody = document.querySelector('body');
    }

    init(tableros) {
        var card = this.#privateMenuCrearTableros();
        this.#privateBody.append(card);


        tableros.forEach((tablero)=>{
            
            var card = this.#privateMostrarTableros(tablero);
            this.#privateBody.append(card);

        });
    }

    #privateMenuCrearTableros(){
        const controlador = new TablerosController();
        
        const card = this.#privateCreateCard();
        const title = this.#privateCreateTitle();
        title.textContent = "Crear Tablero";


        //se crea input para ingresar el nombre del tablero.Id
        const input = document.createElement('input');
        input.type = "text";
        input.classList.add("form-control");
        input.id = "create";
        input.placeholder = "Nombre del Tablero:";
        input.required = true;


        //se crea boton
        const buttonCreate = document.createElement('a');
        buttonCreate.classList.add('btn', 'btn-primary', 'd-grid', 'gap-2', 'col-9', 'mx-auto');
        buttonCreate.textContent = 'Crear Tablero';
        buttonCreate.addEventListener("click",() => {const text = document.getElementById("create").value; controlador.create(text); })

        card.append(title,input,buttonCreate);

        return card;
        
    }

    #privateMostrarTableros(tablero){
        const controlador = new TablerosController();

        const card = this.#privateCreateCard();
        card.id = tablero.Id;

        const title = this.#privateCreateTitle();
        title.textContent = tablero.Name;

        const inputEditar = document.createElement('input');
        inputEditar.type = "text";
        inputEditar.classList.add("form-control");
        inputEditar.id = "editar"+tablero.Id;
        inputEditar.placeholder = "Editar nombre del tablero:";
        inputEditar.required = true;

        const container = document.createElement('container');
        container.classList.add("btn-group", "btn-group-md");

        /* Boton Abrir tablero */
        const buttonAbrir = this.#privateCreateButton();
        buttonAbrir.classList.add('btn', 'btn-outline-success');
        buttonAbrir.textContent = 'Abrir';
        buttonAbrir.addEventListener("click",() => location.href = Config.FrontendURL+"/tableroDentro.html?id="+tablero.Id);


        /* Boton Editar tablero */
        const buttonEditar = this.#privateCreateButton();
        buttonEditar.classList.add('btn', 'btn-outline-primary');
        buttonEditar.textContent = 'Editar';
        buttonEditar.addEventListener("click",() => {const text = document.getElementById("editar"+tablero.Id).value; controlador.editar(text,tablero.Id); })


        /* Boton Elimianr tablero */
        const buttonEliminar = this.#privateCreateButton();
        buttonEliminar.classList.add('btn', 'btn-outline-danger');
        buttonEliminar.textContent = 'Eliminar';
        buttonEliminar.addEventListener("click",() => { controlador.delete(tablero.Id); })

        
        container.append(buttonAbrir, buttonEditar, buttonEliminar);
        card.append(title, inputEditar, container); 
        return card;
    }



    #privateCreateCard() {
        return document.createElement('section');
    }

    #privateCreateButton() {
        return document.createElement('button');
    }

    #privateCreateTitle() {
        return document.createElement('h1');
    }   
}