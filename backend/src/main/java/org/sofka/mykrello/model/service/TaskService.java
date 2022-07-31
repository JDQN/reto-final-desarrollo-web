package org.sofka.mykrello.model.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.sofka.mykrello.controller.domain.LogDomain;
import org.sofka.mykrello.controller.domain.TaskDomain;
import org.sofka.mykrello.model.repository.LogRepository;
import org.sofka.mykrello.model.repository.TaskRepository;
import org.sofka.mykrello.model.service.interfaces.TaskServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service //@Service indica que esta clase es un servicio y sirve para indicarle a Spring que es un servicio

/**
 * La clase TaskService implementa la interfaz TaskServiceInterface
 * y es un servicio que se encarga de realizar las operaciones de la entidad TaskDomain.
 */
public class TaskService implements TaskServiceInterface {

    @Autowired
    private TaskRepository taskRepository;
@Autowired
     private LogRepository logRepository;
    @Autowired
    private LogService logService;


    /**
     * TaskDomain es una entidad que se encarga de mapear la tabla krl_task
     * taskByIdBoard es una funcion que se encarga de buscar una tarea por su idBoard
     * taskRepository es una variable que se encarga de realizar las operaciones de la entidad TaskDomain.
     * @return List<TaskDomain> retorna una lista de tareas
     */
    @Override//@Override indica que esta funcion es una sobreescritura de la funcion de la interfaz TaskServiceInterface
    public List<TaskDomain> taskByIdBoard(Integer idBoard) {
        var tarea = taskRepository.findByIdBoard(idBoard);
        return tarea;
    }


    /**
     * taskById es una funcion que se encarga de buscar una tarea por su id
     * findById es una funcion que se encarga de buscar una tarea por su id
     * taskRepository es una variable que se encarga de realizar las operaciones de la entidad TaskDomain.
     * @return Optional<TaskDomain> retorna una tarea
     */
    @Override
    @Transactional(readOnly = true) //@Transactional indica que esta funcion es una transaccion
    public TaskDomain findById(Integer id) {
        Optional<TaskDomain> tarea = taskRepository.findById(id);
        return tarea.isPresent() ? tarea.get() : null;
    }


    /**
     * TaskDomain es una entidad que se encarga de mapear la tabla krl_task
     * create es una funcion que se encarga de crear una tarea
     * taskRepository es una variable que se encarga de realizar las operaciones de la entidad TaskDomain.
     * @return TaskDomain retorna una tarea creada
     */
    @Override
    public TaskDomain create(TaskDomain task) {
        var a = taskRepository.save(task);

        Integer idTask = a.getId();
        Integer idColumnTask = a.getIdColumn();

        LogDomain logdomain = new LogDomain();

        logdomain.setIdTask(idTask.toString());
        logdomain.setIdCurrent(idColumnTask.toString());
        logdomain.setIdPrevious(idColumnTask.toString());
        logdomain.setCreatedAt(Instant.now());

        logRepository.save(logdomain);

       return a;
    }


    /**
     * TaskDomain es una entidad que se encarga de mapear la tabla krl_task
     * update es una funcion que se encarga de actualizar una tarea
     * taskRepository es una variable que se encarga de realizar las operaciones de la entidad TaskDomain.
     * @return una tarea actualizada
     */
    @Override
    public TaskDomain update(Integer id, TaskDomain task) {

        var taskPrevius = taskRepository.findById(id);
        Integer columnPrevius = taskPrevius.get().getIdColumn();

        task.setId(id);
        task.setUpdated(Instant.now());
        var a = taskRepository.save(task);


        Integer idTask = a.getId();
        Integer idColumnTask = a.getIdColumn();

        LogDomain logdomain = new LogDomain();

        logdomain.setIdTask(idTask.toString());
        logdomain.setIdCurrent(idColumnTask.toString());
        logdomain.setIdPrevious(columnPrevius.toString());
        logdomain.setCreatedAt(Instant.now());

        logRepository.save(logdomain);

        return a;
    }


    /**
     * TaskDomain es una entidad que se encarga de mapear la tabla krl_task
     * delete es una funcion que se encarga de eliminar una tarea
     * taskRepository es una variable que se encarga de realizar las operaciones de la entidad TaskDomain.
     * @return una tarea eliminada
     */
    @Override
    public TaskDomain delete(Integer id) {
        try {
            var taskDomain = taskRepository.findById(id);
            var a = logRepository.findByIdLogbytask(id.toString());

            for(Integer i = 0; i < a.size(); i++) {
                var idLog = a.get(i).getId();
                logRepository.deleteById(idLog);


            }


            taskRepository.deleteById(id);
            return taskDomain.get();
        }catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }
}

