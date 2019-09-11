import axios from 'axios';

const URL ='http://localhost:9000';


export const CALL_CLASSES = () => axios.get(`${URL}/class`)
export const ADD_BOOK = ( payload, headers ) => axios.post(`${URL}/addbooks`, payload, headers)
export const BOOK_RECORD = ( className ) => axios.get(`${URL}/books/${className}`)