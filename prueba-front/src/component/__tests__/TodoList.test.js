import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { toast } from 'react-toastify';
import TodosList from "../TodosList";
import {fetchTodos} from "../../store/todoSlice";

jest.mock('../../store/todoSlice', () => ({
    ...jest.requireActual('../../store/todoSlice'),
    fetchTodos: jest.fn(() => ({
        type: 'todos/fetchTodos',
    })),
}));

const mockStore = configureStore([thunk]);

const todos = [
    {
        idTareaDTO: 1,
        descriptionTareaDTO: 'Tarea activa',
        activoTareaDTO: true,
        fechaCreacionTareaDTO: '2023-01-01',
    },
    {
        idTareaDTO: 2,
        descriptionTareaDTO: 'Tarea inactiva',
        activoTareaDTO: false,
        fechaCreacionTareaDTO: '2023-01-02',
    },
];

describe('TodosList', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            todos: { items: [], status: 'idle', error: null },
        });

        store.dispatch = jest.fn();
    });

    test('renderiza el componente TodosList y realiza fetch de tareas', async () => {
        render(
            <Provider store={store}>
                <TodosList />
            </Provider>
        );

        expect(screen.getByText('Lista de Tareas')).toBeInTheDocument();
        await waitFor(() => expect(store.dispatch).toHaveBeenCalledWith(fetchTodos()));
    });

    test('muestra un spinner mientras se cargan las tareas', () => {
        store = mockStore({
            todos: { items: [], status: 'loading', error: null },
        });

        render(
            <Provider store={store}>
                <TodosList />
            </Provider>
        );

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('muestra tareas activas e inactivas cuando la carga es exitosa', () => {
        store = mockStore({
            todos: { items: todos, status: 'succeeded', error: null },
        });

        render(
            <Provider store={store}>
                <TodosList />
            </Provider>
        );

        expect(screen.getByText('Tareas Activas')).toBeInTheDocument();
        expect(screen.getByText('Tarea activa')).toBeInTheDocument();
        expect(screen.getByText('Tareas Inactivas')).toBeInTheDocument();
        expect(screen.getByText('Tarea inactiva')).toBeInTheDocument();
    });

    test('muestra un mensaje de error si la carga falla', () => {
        store = mockStore({
            todos: { items: [], status: 'failed', error: 'Error al cargar las tareas' },
        });

        render(
            <Provider store={store}>
                <TodosList />
            </Provider>
        );

        expect(screen.getByText('Error al cargar las tareas')).toBeInTheDocument();
    });
});