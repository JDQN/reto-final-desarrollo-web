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
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data //@Data es una anotación que permite generar automáticamente los getters y setters de una clase.
@Entity //@Entity es una anotación que indica que la clase representa una tabla en la base de datos.
@Table(name = "krl_board") //@Table es una anotación que indica el nombre de la tabla en la base de datos.
public class BoardDomain implements Serializable {

    /**
     *  serialVersionUID sirve para generar un serial de un objeto
     */
    private static final long serialVersionUID = 1L;

    /**
     * @Id es una anotación que indica que es una columna de la tabla.
     * @GeneratedValue es una anotación que indica que la columna es autoincremental.
     */
    @PreUpdate
    public void preUpdate() {
        if (this.updatedAt == null)
            this.updatedAt = Instant.now();
    }

    /**
     * @Id es una anotación que indica que es una columna de la tabla.
     * @GeneratedValue es una anotación que indica que la columna es autoincremental.
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brd_id", nullable = false)
    private Integer id;


    /**
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     */
    @Column(name = "brd_name", length = 100)
    private String name;


    /**
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     */
    @Column(name = "brd_created_at", updatable = false)
    private Instant createdAt = Instant.now();


    /**
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     */
    @Column(name = "brd_updated_at")
    private Instant updatedAt;


    /**
     * @OneToMany es una anotación que indica que una tabla tiene una relación con otra tabla.
     * @JsonBackReference es una anotación que indica que no se debe serializar el objeto.
     */
    @OneToMany(fetch = FetchType.LAZY, targetEntity = ColumnForBoardDomain.class, cascade = CascadeType.REMOVE, mappedBy = "board" )
    //@JsonIgnore
    @JsonManagedReference(value = "columnsForBoard")
    private List<ColumnForBoardDomain> columnsForBoard = new ArrayList<>();


    /**
     * @OneToMany es una anotación que indica que una tabla tiene una relación con otra tabla.
     * @JsonBackReference es una anotación que indica que no se debe serializar el objeto.
     */
    @OneToMany(fetch = FetchType.EAGER /*LAZY*/, targetEntity = TaskDomain.class, /*cascade = CascadeType.REMOVE,*/ mappedBy = "boardTask")
    //@JsonIgnore
    //@JsonManagedReference(value = "taskForBoard")
    @JsonBackReference(value = "taskForBoard")
    private List<TaskDomain> task = new ArrayList<>();

}
