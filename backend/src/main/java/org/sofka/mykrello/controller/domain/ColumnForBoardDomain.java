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
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

@Data //@Data es una anotación que permite generar automáticamente los getters y setters de los atributos de la clase.
@Entity //@Entity es una anotación que indica que la clase representa una tabla en la base de datos.
@Table(name = "krl_column_for_board") //@Table es una anotación que indica el nombre de la tabla en la base de datos.

/**
 * La clase ColumnForBoardDomain representa una columna de un tablero.
 * serializable es una anotación que indica que la clase puede ser serializada.
 */
public class ColumnForBoardDomain implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * @PreUpdate es una anotación que se ejecuta antes de que se actualice un registro en la base de datos.
     * preUpdate es un método que se ejecuta antes de que se actualice un registro en la base de datos.
     */
    @PreUpdate
    public void preUpdate() {
        if (this.updatedAt == null)
            this.updatedAt = Instant.now();
    }


    /**
     * @Id es una anotación que indica que un atributo es la llave primaria de una tabla.
     * @GeneratedValue es una anotación que indica que el valor de un atributo es generado por la base de datos.
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     * id es un atributo que representa la llave primaria de una tabla.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cfb_id", nullable = false)
    private Integer id;


    /**
     * @ManyToOne es una anotación que indica que un atributo es una relación de uno a uno con otra tabla.
     * @JoinColumn es una anotación que indica el nombre de la columna en la tabla de referencia.
     * @JsonBackReference es una anotación que indica que la clase no debe serializarse.
     */
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = BoardDomain.class, optional = false ,cascade = CascadeType.REMOVE)
    @JoinColumn(name = "brd_id_board", nullable = false)
    @JsonBackReference(value = "columnsForBoard")
    private BoardDomain board;


    @ManyToOne(fetch = FetchType.LAZY, targetEntity = ColumnDomain.class, optional = false )
    @JoinColumn(name = "clm_id_column", nullable = false)
    @JsonBackReference(value = "columnForBoards")
    private ColumnDomain column;


    /**
     * @Column es una anotación que indica el nombre de la columna en la base de datos.
     * createdAt es un atributo que representa la fecha de creación de un registro.
     * createdAt es un atributo que representa la fecha de creación de un registro.
     */
    @Column(name = "cfb_created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();


    @Column(name = "cfb_updated_at")
    private Instant updatedAt;

}
