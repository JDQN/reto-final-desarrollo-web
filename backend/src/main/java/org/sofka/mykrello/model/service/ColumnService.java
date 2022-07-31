package org.sofka.mykrello.model.service;


import org.sofka.mykrello.controller.domain.ColumnDomain;
import org.sofka.mykrello.controller.domain.DTO.ColumnOutDomain;
import org.sofka.mykrello.model.repository.ColumnRepository;
import org.sofka.mykrello.model.service.interfaces.ColumnServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service//@Service es una anotación que indica que la clase representa un servicio.

/**
 * La clase ColumnService implementa el servicio de la clase ColumnServiceInterface
 * ColumnaServiceInterface es una interfaz que contiene los métodos que se implementan en la clase ColumnService
 */
public class ColumnService implements ColumnServiceInterface {

    @Autowired
    private ColumnRepository columnRepository;


    /**
     * ColumnOutDomain es una clase que representa una columna de la base de datos.
     *  una clase que representa una columna de la base de datos.
     * @return  ListColumnOutDomain es una lista de ColumnOutDomain.
     */
    @Override
    public List<ColumnOutDomain> findAll() {
        List<ColumnDomain> infoColumnas = columnRepository.findAll();
        List<ColumnOutDomain> ListColumnOutDomain = new ArrayList<>();

        for(Integer i = 0; i<infoColumnas.size(); i++ ){
            ColumnOutDomain columnOutDomain = new ColumnOutDomain();

            Integer Id = infoColumnas.get(i).getId();
            String  name = infoColumnas.get(i).getName();
            columnOutDomain.setId(Id);
            columnOutDomain.setName(name);

            ListColumnOutDomain.add(columnOutDomain);
        }
        return  ListColumnOutDomain;
    }
}
