package org.sofka.mykrello.controller;


import org.sofka.mykrello.controller.domain.TaskDomain;
import org.sofka.mykrello.model.service.TaskService;
import org.sofka.mykrello.utilities.MyResponseUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController //@RestController anotacion que indica que esta clase es un controlador de rest
@CrossOrigin(value = "*")  //@CrossOrigin anotacion que indica que esta clase se puede llamar desde cualquier origen
public class TaskController {

    @Autowired
    private MyResponseUtility response;
    @Autowired
    private TaskService taskService;


    /**
     * Metodo que permite obtener todas las tareas de un proyecto
     * @return ResponseEntity<TaskDomain>
     */
    @GetMapping(path = "/api/v1/taskbyidboard/{id}")
    public ResponseEntity<MyResponseUtility> getTaskByIdBoard(@PathVariable(value = "id") Integer id) {
        response.data = taskService.taskByIdBoard(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Metodo que permite obtener todas las tareas de un proyecto
     * @return ResponseEntity<TaskDomain>
     */
    @GetMapping(path = "/api/v1/task/{id}")
    public ResponseEntity<MyResponseUtility> getTaskById(@PathVariable(value = "id") Integer id) {
        response.data = taskService.findById(id);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    /**
     * Metodo que permite crear una tarea
     * @return ResponseEntity<TaskDomain>
     */
    @PostMapping(path = "/api/v1/task")
    public ResponseEntity<MyResponseUtility> create(@RequestBody TaskDomain task) {
        response.data = taskService.create(task);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    /**
     * Metodo que permite actualizar una tarea
     * @return ResponseEntity<TaskDomain>
     */
    @PutMapping(path = "/api/v1/task/{id}")
    public ResponseEntity<MyResponseUtility> put(@PathVariable(value = "id") Integer id, @RequestBody TaskDomain task) {
        response.data = taskService.update(id, task);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    /**
     * Metodo que permite eliminar una tarea
     * @return ResponseEntity<TaskDomain>
     */
    @DeleteMapping(path = "/api/v1/task/{id}")
    public ResponseEntity<MyResponseUtility> delete(@PathVariable(value = "id") Integer id) {
        try {
            response.data = taskService.delete(id);
        }catch (Exception e){
            Integer x =0;
        }
        return new ResponseEntity<>(response, HttpStatus.OK);



    }
}
