import axios from 'axios';

const URL ='http://localhost:9000';


export const CALL_CLASSES = () => axios.get(`${URL}/class`)
export const ALL_BOOKS = () => axios.get(`${URL}/books`)
export const ADD_BOOK = ( payload, headers ) => axios.post(`${URL}/addbooks`, payload, headers)
export const BOOK_RECORD = ( className ) => axios.get(`${URL}/books/${className}`)
export const POST_STUDENT = ( payload, headers) => axios.post(`${URL}/student`, payload, headers)
export const GET_STUDENTS = () => axios.get(`${URL}/students`)
export const GET_STUDENTS_AS_PER_BOOKS = (bookId) => axios.get(`${URL}/student/${bookId}`)
export const GET_STUDENTS_DOESNT_RETURN_BOOK = () => axios.get(`${URL}/bookNotReturnStudents`)
export const SELECTED_STUDENT = (studentId) => axios.get(`${URL}/studentSelected/${studentId}`)
export const RETURN_BOOK = ( payload, headers) => axios.post(`${URL}/bookReturn`, payload, headers)
export const CALL_RETURND_DATA = () => axios.get(`${URL}/returnBookData`)

