import { observable, runInAction, action } from 'mobx';
import { BOOK_RECORD,ALL_BOOKS,RETURN_BOOK,CALL_RETURND_DATA } from './../constant/axios';

class bookStore {
    @observable bookDataForId = [];
    @observable allBooks = [];
    @observable bookReturnData = [];

    @action allBooksCall = async () => {
        const response = await ALL_BOOKS()
        const data = await response.data.result;
        runInAction(async () => {
            // console.log(data)
            if (response.status === 200) {
                this.allBooks = await data;
            }
        })
    }

    @action bookDataForIdFunction = async (classId) => {
        const response = await BOOK_RECORD(classId)
        const data = await response.data.result;
        runInAction(async () => {
            if (response.status === 200) {
                this.bookDataForId = await data;
            }
        })
    }

    @action emptyBookStore = () => {
        this.bookDataForId = []
    }

    @action bookReturn = async(payload,header) => {
        const response = await RETURN_BOOK(payload,header)
        return response;
    }

    @action callBookReturnData = async() => {
        const response = await CALL_RETURND_DATA()
        const data = await response.data.result;
        runInAction(async () => {
            if (response.status === 200) {
                this.bookReturnData = await data;
            }
        })
    }

}

const BookStore = new bookStore();

export default BookStore;