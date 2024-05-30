// AddTodoForm.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { toast } from 'react-toastify';
import AddTodoForm from "../AddTodoForm";
import todoSlice, {addTodo} from "../../store/todoSlice";


jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

jest.mock('../../store/todoSlice', () => ({
    ...jest.requireActual('../../store/todoSlice'),
    addTodo: jest.fn((todo) => ({
        type: 'todos/addTodo',
        payload: todo,
    })),
}));

const mockStore = configureStore([thunk]);

describe('AddTodoForm', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            todos: {
                items: [],
                status: 'idle',
                error: null,
            },
        });

        store.dispatch = jest.fn();
    });

    test('debería renderizar correctamente', () => {
        const { getByText, getByPlaceholderText } = render(
            <Provider store={store}>
                <AddTodoForm />
            </Provider>
        );

        expect(getByText('Agregar Nueva Tarea')).toBeInTheDocument();
        expect(getByPlaceholderText('Descripción de la Tarea')).toBeInTheDocument();
    });

    test('debería mostrar un error si la descripción está vacía al guardar', () => {
        const { getByText } = render(
            <Provider store={store}>
                <AddTodoForm />
            </Provider>
        );

        fireEvent.click(getByText('Guardar Tarea'));
        expect(toast.error).toHaveBeenCalledWith('La descripción de la tarea es obligatoria');
    });

    test('debería despachar la acción addTodo con los datos correctos', () => {
        const { getByPlaceholderText, getByText, getByLabelText } = render(
            <Provider store={store}>
                <AddTodoForm />
            </Provider>
        );

        const descriptionInput = getByPlaceholderText('Descripción de la Tarea');
        const activeCheckbox = getByLabelText('Activo');

        fireEvent.change(descriptionInput, { target: { value: 'Nueva tarea' } });
        fireEvent.click(activeCheckbox); // Cambia el estado del checkbox
        fireEvent.click(getByText('Guardar Tarea'));

        expect(store.dispatch).toHaveBeenCalledWith(addTodo({
            description: 'Nueva tarea',
            completed: false,
            fechaCreacionTareaDTO: expect.any(String),
            activoTareaDTO: false,
        }));
    });
});