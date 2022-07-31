package org.sofka.mykrello.model.service.interfaces;
import org.sofka.mykrello.controller.domain.LogDomain;

import java.util.List;


/**
 * LogServiceInterface una interface que contiene
 * los metodos que se utilizan para el manejo de las tareas.
 */
public interface LogServiceInterface {

    public List<LogDomain>  logByIdTask(String idTask);
    public  LogDomain findById(Integer id);
    public LogDomain create(LogDomain log);
    public LogDomain delete(Integer id);

}
