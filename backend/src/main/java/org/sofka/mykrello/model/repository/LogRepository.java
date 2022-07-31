package org.sofka.mykrello.model.repository;

import org.sofka.mykrello.controller.domain.LogDomain;
import org.sofka.mykrello.controller.domain.TaskDomain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


/**
 * La interface LogRepository es una interfaz que
 * extiende de JpaRepository y se encarga de realizar las operaciones
 * CRUD sobre la tabla krl_log.
 */
public interface LogRepository extends JpaRepository<LogDomain, Integer>{

    @Query(value = "SELECT task FROM LogDomain task WHERE task.idTask = :idTask")
    public List<LogDomain> findByIdLogbytask(@Param(value = "idTask") String idTask);

}
