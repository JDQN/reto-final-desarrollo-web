package org.sofka.mykrello.controller;

import org.sofka.mykrello.controller.domain.LogDomain;
import org.sofka.mykrello.model.service.LogService;
import org.sofka.mykrello.utilities.MyResponseUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController //@RestController anotacion que indica que esta clase es un controlador de rest
@CrossOrigin(value = "*") //@CrossOrigin anotacion que indica que esta clase se puede llamar desde cualquier origen
public class LogController {

    @Autowired
    private MyResponseUtility response;
    @Autowired
    private LogService logService;


    @GetMapping(path = "/api/v1/logByIdTask/{id}")
    public ResponseEntity<MyResponseUtility>getLogByIdTask(@PathVariable(value = "id") String id){
        response.data = logService.logByIdTask(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Metodo que permite obtener todos los logs de la base de datos
     * @return ResponseEntity<LogDomain>
     */
    @GetMapping(path = "/api/v1/log/{id}")
    public ResponseEntity<MyResponseUtility> getLogById(@PathVariable(value = "id") Integer id) {
        response.data = logService.findById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Metodo que permite obtener todos los logs de la base de datos
     * @return ResponseEntity<LogDomain>
     */
    @PostMapping(path = "/api/v1/log")
    public ResponseEntity<MyResponseUtility> create(@RequestBody LogDomain log) {
        response.data = logService.create(log);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    /*@PutMapping(path = "/api/v1/log/{id}")
    public ResponseEntity<MyResponseUtility> put(@PathVariable(value = "id") Integer id,
            @RequestBody LogDomain log) {
        response.data = logService.update(id, log);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }*/

   @DeleteMapping(path = "/api/v1/log/{id}")
    public ResponseEntity<MyResponseUtility> delete(@PathVariable(value = "id") Integer id) {
       response.data = logService.delete(id);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /* @GetMapping(path = "/api/v1/log")
    public ResponseEntity<MyResponseUtility> index() {
        response.data = logService.getAll();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }*/

}
