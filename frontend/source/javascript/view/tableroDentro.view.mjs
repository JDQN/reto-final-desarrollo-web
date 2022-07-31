'use strict';
import { TableroDentroController} from "../controller/tableroDentro.controler.mjs";
import { Config } from "../config.mjs";

export class TableroDentroView {

    #privateBody;

    constructor() {
        document.title = "Lista de tableros";
        this.#privateBody = document.querySelector('body');
    }

    /**
     * 
     * @param {} tableros 
     */
    init(columnas,tasks,idTablero) {
        const description = new TableroDentroController();

        let nombreColumnas = ["Por realizar","En progreso","Terminado"];
        var numeroColumnas = columnas.length;

        columnas.forEach((element)=>{

            const div = document.createElement("section");
            div.classList.add("columnasTask");

            div.id = element.Id;//element.Name.replace(' ','');

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
                
                description.create(nombre,descripcion,idTablero,idColumna);
            });
            div.append(titulo,inputNombre,inputDescripcion,buttonCrearTarea);
            this.#privateBody.append(div);
        });

        tasks.forEach((task)=>{
            var idColumn = task.Image;
            var h = document.getElementById(idColumn);

            const pruebaDiv = document.createElement("section");
            pruebaDiv.id = "tarea"+task.Id;
            pruebaDiv.classList.add('task');
            
            
            /* Contenido de la Crad */
            const p1 = document.createElement("h5");
            p1.classList.add("card-title");
            p1.textContent = "Tarea: "+task.Name; 
    

            const p2 = document.createElement("h6");
            p2.classList.add("card-text");
            p2.textContent = "Descripcion: "+task.DescripcionTarea; 
    

            const p3 = document.createElement("p");
            p3.classList.add("card-text");
            p3.textContent = "Fecha de creacion: "+task.FechaCreacionTarea; 
        
            pruebaDiv.append(p1,p2,p3);
    

            /* Brupo de botones */
            const divBotones = document.createElement("div");
            divBotones.classList.add("divBotones","btn-group", "btn-group-md");

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
                        description.updateTarea(idColumn,idTablero,nombre,descripcion,fechaCreacion,task.Id);



                });


            /* Boton Abrir Tareas*/
            const buttonAbrir = this.#privateCreateButton();
            buttonAbrir.classList.add('btn', 'btn-success');
            buttonAbrir.textContent = 'Editar';
            buttonAbrir.addEventListener("click",() => {
                debugger;
                inputNombreTarea.style.display="block";

                inputDescripcionTarea.style.display="block";
                buttonGuardar.style.display="block";


            });



    
            /* Boton Eliminar Tarea */
            const buttonEliminar = this.#privateCreateButton();
            buttonEliminar.classList.add('btn', 'btn-danger');
            buttonEliminar.innerHTML = `<i class="bi bi-trash"></i>`;
            buttonEliminar.addEventListener("click",() => {description.delete(task.Id);});
            
            //debugger;
            if(idColumn-1 == 0)
            {
                const buttonMoverDerecha = this.#privateCreateButton();
                buttonMoverDerecha.classList.add('btn', 'btn-primary');
                buttonMoverDerecha.innerHTML = `<i class="bi bi-arrow-return-right"></i>`;

                buttonMoverDerecha.addEventListener("click",() => {
                    var name=task.Name;
                    var descripcion = task.DescripcionTarea;
                    var fechaCreacion = task.FechaCreacionTarea;
                    description.mover(idColumn+1,idTablero,name,descripcion,fechaCreacion,task.Id);
                
                });
                divBotones.append(buttonAbrir,buttonEliminar,buttonMoverDerecha);
            }
            else if(idColumn == numeroColumnas){
                const buttonMoverIzquierda = this.#privateCreateButton();
                buttonMoverIzquierda.classList.add('btn', 'btn-primary');
                buttonMoverIzquierda.innerHTML = `<i class="bi bi-arrow-return-left"></i>`;

                buttonMoverIzquierda.addEventListener("click",() => {
                    var name=task.Name;
                    var descripcion = task.DescripcionTarea;
                    var fechaCreacion = task.FechaCreacionTarea;
                    description.mover(idColumn-1,idTablero,name,descripcion,fechaCreacion,task.Id);
                });
                divBotones.append(buttonMoverIzquierda,buttonAbrir,buttonEliminar);
            }
            else{
                const buttonMoverDerecha = this.#privateCreateButton();
                buttonMoverDerecha.classList.add('btn', 'btn-primary');
                buttonMoverDerecha.innerHTML = `<i class="bi bi-arrow-return-right"></i>`;;

                const buttonMoverIzquierda = this.#privateCreateButton();
                buttonMoverIzquierda.classList.add('btn', 'btn-primary');
                buttonMoverIzquierda.innerHTML = `<i class="bi bi-arrow-return-left"></i>`;

                buttonMoverDerecha.addEventListener("click",() => {
                    var name=task.Name;
                    var descripcion = task.DescripcionTarea;
                    var fechaCreacion = task.FechaCreacionTarea;
                    description.mover(idColumn+1,idTablero,name,descripcion,fechaCreacion,task.Id);
                });

                buttonMoverIzquierda.addEventListener("click",() => {
                    var name=task.Name;
                    var descripcion = task.DescripcionTarea;
                    var fechaCreacion = task.FechaCreacionTarea;
                    description.mover(idColumn-1,idTablero,name,descripcion,fechaCreacion,task.Id);
                });
                divBotones.append(buttonMoverIzquierda,buttonAbrir,buttonEliminar,buttonMoverDerecha);
            }

            //container.append(div)
            pruebaDiv.append(inputNombreTarea, inputDescripcionTarea,buttonGuardar,divBotones);
            h.append(pruebaDiv);
        });             
    }

    #privateCreateCard() {
        return document.createElement('div');
    }

    #privateCreateButton() {
        return document.createElement('button');
    }
    #privateCreateImage() {
        return document.createElement('img');
    }

    #privateCreateTitle() {
        return document.createElement('h1');
    }   

  

}