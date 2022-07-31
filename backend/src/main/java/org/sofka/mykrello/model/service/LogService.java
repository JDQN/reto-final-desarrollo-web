package org.sofka.mykrello.model.service;

import org.sofka.mykrello.controller.domain.LogDomain;
import org.sofka.mykrello.model.repository.LogRepository;
import org.sofka.mykrello.model.service.interfaces.LogServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service //@Service indica que esta clase es un servicio

/**
 *La clase LogService representa un servicio de log.
 * LogServiceInterface indica que la clase implementa el servicio de log.
 */
public class LogService implements LogServiceInterface {

    @Autowired
    private LogRepository logRepository;


    public List<LogDomain> logByIdTask(String idTask){
        var log = logRepository.findByIdLogbytask(idTask);
        return log;
    }


    /**
     * findById indica que el método busca un log por su id.
     * logRepository indica que el método busca un log en la base de datos.
     * @param id indica el id del log que se busca.
     * @return el log encontrado por su id.
     */
    @Override
    public LogDomain findById(Integer id) {
        var a = logRepository.findById(id);
        return a.get();
    }

    /**
     * create indica que el método crea un log.
     * logRepository indica que el método crea un log en la base de datos.
     * @param log el log a crear.
     * @return el log creado.
     */
    @Override
    public LogDomain create(LogDomain log) {
        var logDomain = logRepository.save(log);
        return logDomain;
    }

    @Override
    public LogDomain delete(Integer id) {
        var logDomain = logRepository.findById(id);
        logRepository.delete(logDomain.get());


        return logDomain.get();
    }

}
