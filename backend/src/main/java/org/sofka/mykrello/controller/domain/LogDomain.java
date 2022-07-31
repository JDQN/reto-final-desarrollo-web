package org.sofka.mykrello.controller.domain;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

@Data //@Data es una anotación que permite generar automáticamente los getters y setters de los atributos de la clase.
@Entity //@Entity es una anotación que indica que la clase representa una tabla en la base de datos.
@Table(name = "krl_log") //@Table es una anotación que indica el nombre de la tabla en la base de datos.

/**
 *La clase LogDomain representa un registro de log en la base de datos.
 * Serializable indica que la clase puede ser serializada.
 */
public class LogDomain implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * @Id indica que la columna es la clave primaria de la tabla.
     * @GeneratedValue indica que la clave primaria será generada por el sistema.
     * @Column indica que la columna es una columna de la tabla.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id", nullable = false, updatable = false)
    private Integer id;


    /**
     * @ManyToOne indica que la columna es una clave foranea de la tabla.
     * @JoinColumn indica que la columna es una clave foranea de la tabla.
     * @JsonBackReference indica que la clase no se serializará.
     * value="logPrevious" indica que la clase se serializará como logPrevious.
     */
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = ColumnDomain.class, optional = false/*, cascade = CascadeType.REMOVE *//*,cascade = CascadeType.REMOVE*/)
    @JoinColumn(name = "clm_id_previous",  updatable = false, insertable = false)
    @JsonBackReference(value = "logPrevious")
    private ColumnDomain previous;


    @ManyToOne(fetch = FetchType.LAZY, targetEntity = ColumnDomain.class, optional = false/*,cascade = CascadeType.REMOVE*/)
    @JoinColumn(name = "clm_id_current", updatable = false, insertable = false)
    @JsonBackReference(value = "logCurrent")
    private ColumnDomain current;

   // @ManyToOne(targetEntity = TaskDomain.class, optional = false/*, cascade = CascadeType.REMOVE*/, fetch = FetchType.EAGER)
    //@JsonManagedReference(value = "logForTask")
    //@JsonIgnore
    //@JoinColumn( name = "tsk_id_task", insertable =false, updatable=false)
     //private TaskDomain taskLog;


    /**
     * @Column indica que la columna es una columna de la tabla.
     * name="log_created_at" indica el nombre de la columna en la base de datos.
     * createdAt indica el valor de la columna.
     */
    @Column(name = "log_created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();


    @Column(name = "tsk_id_task", nullable = true, updatable = true, insertable =true)
    private String idTask;


    @Column(name = "clm_id_previous", nullable = true, updatable = true, insertable =true)
    private String idPrevious;


    @Column(name = "clm_id_current", nullable = true, updatable = true , insertable =true)
    private String idCurrent;

}
