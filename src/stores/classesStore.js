import { observable, runInAction, action } from 'mobx';
import { CALL_CLASSES } from './../constant/axios'

class classesStore {
    @observable classes = [];
    @observable classesOption = [];

    @action classesData = async () => {
        const response = await CALL_CLASSES()
        const data = await response.data.result;
        runInAction(async () => {
            if (response.status === 200) {
                this.classes = await data;
                this.classesOption = data.map(x => {
                    return (
                        { value: x.class_name, label: x.class_name }
                    ) 
                });
            }
        })
    }
}

const ClassesStore = new classesStore();

export default ClassesStore;