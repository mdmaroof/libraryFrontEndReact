import { observable, runInAction, action } from 'mobx';
import { POST_STUDENT, GET_STUDENTS, GET_STUDENTS_AS_PER_BOOKS, GET_STUDENTS_DOESNT_RETURN_BOOK, SELECTED_STUDENT } from './../constant/axios';

class studentStore {

    @observable allStudents = [];
    @observable studentAsPerBooks = []
    @observable studentNoReturnBook = []
    @observable selectedStudent = []

    @action getStudents = async() => {
        const response = await GET_STUDENTS()
        const data = await response.data.result;
        runInAction(async () => {
            if (response.status === 200) {
                this.allStudents = await data;
            }
        })
    }

    @action getStudentAsPerBooks = async(value)=> {
        const response = await GET_STUDENTS_AS_PER_BOOKS(value)
        const data = await response.data.result;
        runInAction(async () => {
            if (response.status === 200) {
                this.studentAsPerBooks = await data;
            }
        })
    }

    @action postStudent = async (payload,header) => {
        const response = await POST_STUDENT(payload,header)
        return response;
    }

    @action studentBookNotReturn = async () => {
        const response = await GET_STUDENTS_DOESNT_RETURN_BOOK()
        const data = await response.data.result;
        runInAction(async () => {
            if (response.status === 200) {
                this.studentNoReturnBook = data.map(x => {
                    return (
                        { value: x.studentId, label: x.studentName }
                    ) 
                });
            }
        })
    }

    @action selectedStudentCall = async (value) => {
        const response = await SELECTED_STUDENT(value)
        const data = await response.data.result;
        runInAction(async () => {
            if (response.status === 200) {
                this.selectedStudent = await data;
            }
        })
    }

    @action emptySelectedStudent = () => {
        this.selectedStudent = []
    }

}

const StudentStore = new studentStore();

export default StudentStore;