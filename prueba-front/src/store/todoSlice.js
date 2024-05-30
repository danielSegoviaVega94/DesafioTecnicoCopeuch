import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tareas';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
    const response = await axios.post(API_URL, {
        descriptionTareaDTO: todo.description,
        activoTareaDTO: todo.activoTareaDTO,
        fechaCreacionTareaDTO: todo.fechaCreacionTareaDTO
    });
    return response.data;
});

export const editTodo = createAsyncThunk('todos/editTodo', async (todo) => {
    const response = await axios.put(`${API_URL}/${todo.idTareaDTO}`, todo);
    return response.data;
});

export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(editTodo.fulfilled, (state, action) => {
                const index = state.items.findIndex((todo) => todo.idTareaDTO === action.payload.idTareaDTO);
                state.items[index] = action.payload;
            })
            .addCase(removeTodo.fulfilled, (state, action) => {
                state.items = state.items.filter((todo) => todo.idTareaDTO !== action.payload);
            });
    },
});

export default todoSlice.reducer;
