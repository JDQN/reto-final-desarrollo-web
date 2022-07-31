package org.sofka.mykrello.controller.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

@Data//@Data es una anotación que permite que los atributos de la clase sean accesibles desde el exterior.
@Entity//@Entity es una anotación que indica que la clase representa una entidad de persistencia.
@Table(name = "krl_task")//@Table es una anotación que indica la tabla de la base de datos a la que pertenece la clase.

/**
 * La clase TaskDomain representa una tarea.
 * Serializable indica que la clase puede ser serializada.
 */
public class TaskDomain implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * @Id indica que la propiedad representa una llave primaria.
     * @GeneratedValue indica que la propiedad es una llave primaria autoincrementable.
     * @Column indica que la propiedad es una columna de la tabla.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tsk_id", nullable = false)
    private Integer id;


    /**
     * @ManyToOne indica que la propiedad es una relación de muchos a uno.
     * @JoinColumn indica que la propiedad es una columna de la tabla.
     * @JsonBackReference indica que la propiedad no se serializa.
     * @JsonIgnore indica que la propiedad no se serializa.
     */
    @ManyToOne(targetEntity = ColumnDomain.class, optional = false ,cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "taskForColumn")
    @JsonIgnore
    @JoinColumn( name = "clm_id_column",insertable =false, updatable=false ) //@JoinColumn indica la columna de la tabla a la que se relaciona la propiedad la llave primaria de la clase.
    private ColumnDomain columnTask; // tipo de clase dentro de springboot


   @ManyToOne(targetEntity = BoardDomain.class, optional = false, fetch = FetchType.EAGER)
    @JsonManagedReference(value = "taskForBoard")
    @JsonIgnore
    @JoinColumn( name = "brd_id_board", insertable =false, updatable=false)
    private BoardDomain boardTask;

    /**
     * @Column indica que la propiedad es una columna de la tabla.
     * name = "clm_id_column" indica el nombre de la columna en la tabla.
     * private Integer idColumn indica que la propiedad es una llave primaria.
     */
    @Column( name = "clm_id_column",insertable =true, updatable=true)
    private Integer idColumn;

    @Column( name = "brd_id_board", insertable =true, updatable=true)
    private Integer idBoard;


    @Column( name = "tsk_name", nullable = false)
    private String name;

    @Column(name = "tsk_description", nullable = false)
    private String description;

    @Column(name="tsk_delivery_date")
    private Instant deliveryDate;

    @Column(name="tsk_created_at")
    private Instant create;

    @Column(name="tsk_updated_at")
    private Instant updated;

}