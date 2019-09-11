import {observable,runInAction,action} from 'mobx';
import {CALL_CLASSES} from './../constant/axios'

class classesStore {
    @observable classes = [] ;

    @action stateData = async () => {
        const response = await CALL_CLASSES()   
        const data = await response.data;
        runInAction(() => {
            console.log(data)
            if (response.status === 200) {
                this.classes = data
            }
        })   
    } 
}

const ClassesStore = new classesStore();

export default ClassesStore;