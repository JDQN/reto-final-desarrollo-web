'use strict';
import { TableroDentroController} from "../controller/tableroDentro.controler.mjs";
import { Config } from "../config.mjs";

export class TableroDentroView {

    #privateBody;

    constructor() {
        document.title = "Tareas tablero";
        this.#privateBody = document.querySelector('body');
    }

    /**
     * 
     * @param {} tableros 
     */
    init(columnas,tasks,idTablero) {
        const controlador = new TableroDentroController();

        var numeroColumnas = columnas.length;
        this.#privateMostroarColumnas(columnas,idTablero);

        tasks.forEach((task)=>{
            var idColumn = task.IdColumn;
            var divColumna = document.getElementById(idColumn);

            const tareaDiv = document.createElement("section");
            tareaDiv.id = "tarea"+task.Id;
            tareaDiv.classList.add('task');
            
            
            this.#privatemostrarInformacionGeneralTarea(tareaDiv, task);
            
            /// opciones que permiten edtitar la tarea e inicialmente estan ocultos
            const buttonAbrir =this.#privateCreacionElementosEditarTarea(tareaDiv, task,idColumn,idTablero);

            

            /* grupo de botones */
            const divBotones = document.createElement("div");
            divBotones.classList.add("divBotones","btn-group", "btn-group-md");

            /* Boton Eliminar Tarea */
            const buttonEliminar = this.#privateCreateButton();
            buttonEliminar.classList.add('btn', 'btn-danger');
            buttonEliminar.innerHTML = `<i class="bi bi-trash"></i>`;
            buttonEliminar.addEventListener("click",() => {controlador.delete(task.Id);});


            this.#privateMoverTarea(divBotones,buttonAbrir,buttonEliminar,task,idColumn,idTablero,numeroColumnas);
            
            tareaDiv.append(divBotones);
            divColumna.append(tareaDiv);
        });             
    }


    #privateMostroarColumnas(columnas,idTablero){
        columnas.forEach((element)=>{
            const controlador = new TableroDentroController();

            const div = document.createElement("section");
            div.classList.add("columnasTask");

            div.id = element.Id;

            const titulo = document.createElement("h3");
            titulo.textContent =  element.Name;


            const inputNombre = document.createElement("input");
            inputNombre.placeholder = "Nombre de la tarea:";
            inputNombre.id = "nombre_"+element.Name;

            const inputDescripcion = document.createElement("input");
            inputDescripcion.placeholder = "Descripcion tarea:";
            inputDescripcion.id = "descripcion"+element.Name;

            const buttonCrearTarea = this.#privateCreateButton();
            buttonCrearTarea.classList.add('btn', 'btn-primary', 'd-grid', 'gap-2', 'col-9', 'mx-auto');
            buttonCrearTarea.textContent = 'Crear tarea';

            buttonCrearTarea.id = "btn"+element.Name.replace(' ','');
            buttonCrearTarea.addEventListener("click",() => {
                const nombre = document.getElementById("nombre_"+element.Name).value;
                const descripcion = document.getElementById("descripcion"+element.Name).value;
                const idColumna = element.Id;
                
                controlador.create(nombre,descripcion,idTablero,idColumna);
            });
            div.append(titulo,inputNombre,inputDescripcion,buttonCrearTarea);
            this.#privateBody.append(div);
        });
    }
    #privatemostrarInformacionGeneralTarea(tareaDiv, task){

        /* Contenido de la Crad */
        const nombreTarea = document.createElement("h5");
        nombreTarea.classList.add("card-title");
        nombreTarea.textContent = "Tarea: "+task.Name; 


        const descripcionTarea = document.createElement("h6");
        descripcionTarea.classList.add("card-text");
        descripcionTarea.textContent = "Descripcion: "+task.DescripcionTarea; 


        const fechaCreacionTarea = document.createElement("p");
        fechaCreacionTarea.classList.add("card-text");
        fechaCreacionTarea.textContent = "Fecha de creacion: "+task.FechaCreacionTarea; 

        tareaDiv.append(nombreTarea,descripcionTarea,fechaCreacionTarea);
    }

    #privateCreacionElementosEditarTarea(tareaDiv, task,idColumn,idTablero){
        const controlador = new TableroDentroController();

        const inputNombreTarea =document.createElement("input");
        inputNombreTarea.placeholder= "Nuevo nombre de la tarea";
        inputNombreTarea.id = "nombreInputTarea"+task.Id;
        inputNombreTarea.style.display="none";


        const inputDescripcionTarea =document.createElement("input");
        inputDescripcionTarea.placeholder= "Nueva descripcion de la tarea";
        inputDescripcionTarea.id = "descripcionInputTarea"+task.Id;
        inputDescripcionTarea.style.display="none";

        const buttonGuardar = document.createElement("button");
        buttonGuardar.id= "guardar"+task.Id;
        buttonGuardar.classList.add('btn', 'btn-success');
        buttonGuardar.style.display="none";
        buttonGuardar.textContent = 'Guardar';

        buttonGuardar.addEventListener("click",() => {

                var nombre = document.getElementById("nombreInputTarea"+task.Id).value;

                var descripcion = document.getElementById("descripcionInputTarea"+task.Id).value;

                var fechaCreacion = task.FechaCreacionTarea;
                controlador.updateTarea(idColumn,idTablero,nombre,descripcion,fechaCreacion,task.Id);
        });

        const buttonAbrir = this.#privateCreateButton();
        buttonAbrir.classList.add('btn', 'btn-success');
        buttonAbrir.textContent = 'Editar';
        buttonAbrir.addEventListener("click",() => {
            inputNombreTarea.style.display="block";

            inputDescripcionTarea.style.display="block";
            buttonGuardar.style.display="block";
        });

        tareaDiv.append(inputNombreTarea, inputDescripcionTarea,buttonGuardar);
        return buttonAbrir;
    }

    #privateMoverTarea(divBotones, buttonAbrir,buttonEliminar,task,idColumn,idTablero, numeroColumnas){
        if(idColumn-1 == 0)
        {
            const buttonMoverDerecha = this.#privateMoverDerecha(task, idColumn,idTablero);
            divBotones.append(buttonAbrir,buttonEliminar,buttonMoverDerecha);
        }
        else if(idColumn == numeroColumnas){
            const buttonMoverIzquierda = this.#privateMoverIzquierda(task, idColumn,idTablero);            
            divBotones.append(buttonMoverIzquierda,buttonAbrir,buttonEliminar);
        }
        else{
            const buttonMoverDerecha = this.#privateMoverDerecha(task, idColumn,idTablero);
            const buttonMoverIzquierda = this.#privateMoverIzquierda(task, idColumn,idTablero);            
            divBotones.append(buttonMoverIzquierda,buttonAbrir,buttonEliminar,buttonMoverDerecha);
        }

    }

    #privateMoverIzquierda(task, idColumn,idTablero){
        const controlador = new TableroDentroController();
        const buttonMoverIzquierda = this.#privateCreateButton();
        buttonMoverIzquierda.classList.add('btn', 'btn-primary');
        buttonMoverIzquierda.innerHTML = `<i class="bi bi-arrow-return-left"></i>`;

        buttonMoverIzquierda.addEventListener("click",() => {
            var name=task.Name;
            var descripcion = task.DescripcionTarea;
            var fechaCreacion = task.FechaCreacionTarea;
            controlador.mover(idColumn-1,idTablero,name,descripcion,fechaCreacion,task.Id);
        });
        return buttonMoverIzquierda;
    }
    #privateMoverDerecha(task, idColumn,idTablero){
        const controlador = new TableroDentroController();
        const buttonMoverDerecha = this.#privateCreateButton();
            
        buttonMoverDerecha.classList.add('btn', 'btn-primary');
        buttonMoverDerecha.innerHTML = `<i class="bi bi-arrow-return-right"></i>`;

        buttonMoverDerecha.addEventListener("click",() => {
            var name=task.Name;
            var descripcion = task.DescripcionTarea;
            var fechaCreacion = task.FechaCreacionTarea;
            controlador.mover(idColumn+1,idTablero,name,descripcion,fechaCreacion,task.Id);
        
        });
        return buttonMoverDerecha;

    }

    #privateCreateCard() {
        return document.createElement('div');
    }
    #privateCreateButton() {
        return document.createElement('button');
    }
    #privateCreateTitle() {
        return document.createElement('h1');
    }
}