package org.sofka.mykrello.model.service;

import java.util.List;
import java.util.Optional;

import org.sofka.mykrello.controller.domain.BoardDomain;
import org.sofka.mykrello.controller.domain.ColumnForBoardDomain;
import org.sofka.mykrello.controller.domain.LogDomain;
import org.sofka.mykrello.controller.domain.TaskDomain;
import org.sofka.mykrello.model.repository.*;
import org.sofka.mykrello.model.service.interfaces.BoardServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service//@Service es una anotación que indica que la clase es un servicio.

/**
 * La clase BoardService implementa el servicio de la entidad BoardDomain.
 * BoardServiceInterface es una interfaz que contiene los métodos que se
 */
public class BoardService implements BoardServiceInterface {

    @Autowired//@Autowired es una anotación que indica que la clase depende de otra clase.
    private BoardRepository boardRepository;
    @Autowired
    private ColumnRepository columnRepository;
    @Autowired
    private ColumnForBoardRepository columnForBoardRepository;
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private LogRepository logRepository;


    /**
     * Método que permite obtener todos los registros de la tabla BoardDomain.
     * @return List<BoardDomain>
     */
    @Override
    @Transactional(readOnly = true)
    public List<BoardDomain> getAll() {
        return boardRepository.findAll();
    }


    /**
     * Método que permite obtener un registro de la tabla BoardDomain.
     * @param id
     * @return BoardDomain
     */
    @Override
    @Transactional(readOnly = true)
    public BoardDomain findById(Integer id) {
        Optional<BoardDomain> board = boardRepository.findById(id);
        return board.isPresent() ? board.get() : null;
    }


    /**
     * Método que permite crear un registro en la tabla BoardDomain.
     * @param board
     * @return BoardDomain
     */
    @Override
    @Transactional
    public BoardDomain create(BoardDomain board) {
        var newBoard = boardRepository.save(board);
        var columns = columnRepository.findAll();
        if (!columns.isEmpty()) {
            columns.forEach(column -> {
                var columnForBoard = new ColumnForBoardDomain();
                columnForBoard.setColumn(column);
                columnForBoard.setBoard(newBoard);
                columnForBoardRepository.save(columnForBoard);
            });
        }
        return newBoard;
    }


    /**
     * Método que permite actualizar un registro en la tabla BoardDomain.
     * @param board
     * @return BoardDomain
     */
    @Override
    @Transactional
    public BoardDomain update(Integer id, BoardDomain board) {
        board.setId(id);
        return boardRepository.save(board);
    }


    /**
     * Método que permite eliminar un registro en la tabla BoardDomain.
     * @param id
     * @return BoardDomain
     */
    @Override
    @Transactional
    public BoardDomain delete(Integer id) {

        List<TaskDomain> listTask = taskRepository.findByIdBoard(id);

        for(Integer i = 0; i < listTask.size(); i++) {
            Integer idTask = listTask.get(i).getId();

            Optional<TaskDomain> taskDomain = taskRepository.findById(idTask);
            List<LogDomain> listLog = logRepository.findByIdLogbytask(idTask.toString());

            for(Integer j = 0; j < listLog.size(); j++) {
                Integer idLog = listLog.get(j).getId();
                logRepository.deleteById(idLog);
            }
            taskRepository.deleteById(idTask);
        }

        Optional<BoardDomain> optionalBoard = boardRepository.findById(id);
        if (optionalBoard.isPresent()) {
            BoardDomain board = optionalBoard.get();
            List<ColumnForBoardDomain> columnsForBoard = board.getColumnsForBoard();
            if (!columnsForBoard.isEmpty()) {
                columnsForBoard.forEach((column) -> {
                    columnForBoardRepository.delete(column);
                });
            }
            boardRepository.delete(optionalBoard.get());
            return optionalBoard.get();
        }
        return null;
    }
}
