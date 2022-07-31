package org.sofka.mykrello.controller.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data //@Data es una anotación que permite generar automáticamente los getters y setters de los atributos de la clase.
@Entity //@Entity es una anotación que indica que la clase representa una tabla en la base de datos.
@Table(name = "krl_column") //@Table es una anotación que indica el nombre de la tabla en la base de datos.

/**
 * La clase ColumnDomain representa una columna de una lista de un proyecto.
 * Serializable indica que la clase puede ser serializada.
 */
public class ColumnDomain implements Serializable {

    /**
     * serialVersionUID es una clave de serialización que identifica una clase cuando se serializa.
     */
    private static final long serialVersionUID = 1L;

    /**
     * @PreUpdate es una anotación que se ejecuta antes de que se actualice una entidad.
     * preUpdate sirve para actualizar el campo fechaModificacion.
     */
    @PreUpdate
    public void preUpdate() {
        if (this.updatedAt == null)
            this.updatedAt = Instant.now();
    }


    /**
     * @Id es una anotación que indica que un atributo es la llave primaria de una tabla.
     * @GeneratedValue es una anotación que indica que el valor de la llave primaria es autogenerado.
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clm_id")
    private Integer id;


    /**
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     */
    @Column(name = "clm_name",  length = 100)
    private String name;


    /**
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     */
    @Column(name = "clm_created_at",  updatable = false)
    private Instant createdAt = Instant.now();


    /**
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     */
    @Column(name = "clm_updated_at")
    private Instant updatedAt;


    /**
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     */
    @OneToMany(fetch = FetchType.LAZY, targetEntity = LogDomain.class, cascade = CascadeType.REMOVE, mappedBy = "previous")
    @JsonManagedReference(value = "logPrevious")
    @JsonIgnore
    private List<LogDomain> logPrevious = new ArrayList<>();


    /**
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     */
    @OneToMany(fetch = FetchType.LAZY, targetEntity = LogDomain.class,mappedBy = "current")
    @JsonManagedReference(value = "logCurrent")
    @JsonIgnore
    private List<LogDomain> logCurrent = new ArrayList<>();


    /**
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     */
    @OneToMany(fetch = FetchType.LAZY, targetEntity = ColumnForBoardDomain.class, mappedBy = "column")
    @JsonManagedReference(value = "columnForBoards")
    @JsonIgnore
    private List<ColumnForBoardDomain> columnForBoards = new ArrayList<>();


    /**
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     */
    @OneToMany(fetch = FetchType.LAZY, targetEntity = TaskDomain.class, mappedBy = "columnTask")
    @JsonBackReference(value = "taskForColumn")
    private List<TaskDomain> task = new ArrayList<>();

}
