package com.dsegovia.prueba.exception;

public class TareaException extends RuntimeException {
    public TareaException(Long id) {
        super("No se pudo encontrar la tarea con el id: " + id);
    }

    public TareaException(String message) {
        super(message);
    }

}
