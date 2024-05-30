import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoItem from "../TodoItem";
import todoSlice, {editTodo , removeTodo} from "../../store/todoSlice";
import {thunk} from "redux-thunk";


jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

jest.mock('../../store/todoSlice', () => ({
    ...jest.requireActual('../../store/todoSlice'),
    removeTodo: jest.fn((id) => ({
        type: 'todos/removeTodo',
        payload: id,
    })),
    editTodo: jest.fn((todo) => ({
        type: 'todos/editTodo',
        payload: todo,
    })),
}));

const mockStore = configureStore([thunk]);

const todo = {
    idTareaDTO: 1,
    descriptionTareaDTO: 'Tarea de prueba',
    activoTareaDTO: true,
    fechaCreacionTareaDTO: '2023-01-01',
};

describe('TodoItem', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            todos: { items: [todo], status: 'idle', error: null },
        });

        store.dispatch = jest.fn();
    });

    test('renderiza el componente TodoItem', () => {
        render(
            <Provider store={store}>
                <TodoItem todo={todo} />
            </Provider>
        );

        expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
        expect(screen.getByText('Activo')).toBeInTheDocument();
    });

    test('maneja la funcionalidad de edición', () => {
        render(
            <Provider store={store}>
                <TodoItem todo={todo} />
            </Provider>
        );

        fireEvent.click(screen.getByText('Editar'));

        const input = screen.getByPlaceholderText('Descripción de la Tarea');
        fireEvent.change(input, { target: { value: 'Tarea actualizada' } });
        fireEvent.click(screen.getByText('Guardar'));

        expect(store.dispatch).toHaveBeenCalledWith(
            editTodo({
                idTareaDTO: 1,
                descriptionTareaDTO: 'Tarea actualizada',
                activoTareaDTO: true,
            })
        );
    });

    test('maneja la funcionalidad de eliminación', () => {
        render(
            <Provider store={store}>
                <TodoItem todo={todo} />
            </Provider>
        );

        fireEvent.click(screen.getByText('Eliminar'));
        fireEvent.click(screen.getByText('Sí'));

        expect(store.dispatch).toHaveBeenCalledWith(removeTodo(1));
    });
});