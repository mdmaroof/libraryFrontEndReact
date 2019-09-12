import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Select from 'react-select';
import {inject,observer} from 'mobx-react';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'

@inject('classesStore','bookStore','studentStore')
@observer

class Home extends Component {
    state = {
        studentName:'',
        className:null,
        booksName:'',
        selectedBooks:[],
        fromDate:'',
        toDate:''
    }

    changeValue = e => {
        e.preventDefault();
        const value = e.target.name
        this.setState({[value]: e.target.value});
    }
    componentDidMount = () =>{
        this.props.bookStore.emptyBookStore()
        this.props.classesStore.classesData()
    }
    handleChange = selectedOption => {
        this.props.bookStore.bookDataForIdFunction(selectedOption.value)
        this.setState({
            className:selectedOption,
            selectedBooks:[],

        })
    }
    selectBooks = async(e) => {
        const value = e.target.value;
        const valueIn = this.state.selectedBooks.includes(value);
        if(valueIn === true){
            const selectValue = await this.state.selectedBooks.filter(arrayItem => arrayItem !== value);
            this.setState({selectedBooks:selectValue})
        }
        else{
            const valueAdded =  await this.state.selectedBooks.concat(value)
            this.setState({selectedBooks:valueAdded})
        }
    }

    addStudent = ()=> {
        if(this.state.studentName === ''){
            toast.error("Please Provide Student Name ", { closeButton: false })
        }
        else if(this.state.className === null){
            toast.error("Please Select Class", { closeButton: false })
        }
        else if(this.state.selectedBooks.length <= 0){
            toast.error("Please Select atleast One Book", { closeButton: false })
        }
        else if(this.state.fromDate === ''){
            toast.error("Please Select Allocated Date From", { closeButton: false })
        }
        else if(this.state.toDate === ''){
            toast.error("Please Select Allocated Date To", { closeButton: false })
        }
        else{
            const payload = {
                studentName:this.state.studentName,
                className:this.state.className.value,
                selectedBooks:this.state.selectedBooks,
                fromDate:this.state.fromDate,
                toDate:this.state.toDate
    
            }
            const headers = {
                'Content-Type': 'application/json'
            }
            this.props.studentStore.postStudent(payload,headers)
            .then(res=>{
                if(res.status === 200){
                    toast.success("Succesfully Added", { closeButton: false })
                    this.setState({
                        studentName:'',
                        className:null,
                        selectedBooks:[],
                        fromDate:'',
                        toDate:''
                    })
                }
                else{
                    toast.error("Something Went Wrong", { closeButton: false })
                }
            })
            .catch(err=>{
                toast.error("Something Went Wrong", { closeButton: false })
            })
        }

    }
    render() {
        return (
            <div className="content">
                <Row>
                    <Col xs={8}>
                        <h1>Allocate Books to Student</h1>
                    </Col>
                    <Col xs={4}>
                        <Link className="buttonNew" to="/returnBook">Return Book</Link>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>
                        <div className="homePageForm">
                            <label>Student Name</label>
                            <input className="inputType" placeholder="Student Name" name="studentName" value={this.state.studentName} onChange={this.changeValue} />

                            <Row>
                                <Col xs={6}>
                                <label>Book Allocated From Date</label>
                                <input type="date" className="inputType"name="fromDate" value={this.state.fromDate} onChange={this.changeValue} />
                                </Col>
                                <Col xs={6}>
                                <label>Book Allocated To Date</label>
                                <input type="date" className="inputType" name="toDate" value={this.state.toDate} onChange={this.changeValue} />
                                </Col>
                            </Row>

                            <label>Class Name</label>

                            <Select
                                value={this.state.className}
                                onChange={this.handleChange}
                                options={this.props.classesStore.classesOption}
                                placeholder="Select Class"
                            />

                            <br />
                            {this.state.className === null ?
                                <h4>First Select Class Of the Student</h4>
                                :
                                this.props.bookStore.bookDataForId.length <= 0 ?
                                <h4>No Result</h4>
                                :
                                <React.Fragment>
                                <h4>Select Books To Allocate</h4>
                                {this.props.bookStore.bookDataForId.map(x =>
                                    <div key={x.id}>
                                        {x.booksAvailable === 0 ?
                                            <React.Fragment>
                                                <input disabled type="checkbox" onChange={this.selectBooks} value={x.id} /><label>{x.book_name} <span>No Books Available In Stock</span></label> 
                                            </React.Fragment>
                                            : <React.Fragment>
                                                <input type="checkbox" onChange={this.selectBooks} value={x.id} /><label>{x.book_name} <span>{x.booksAvailable} Books Available in Stock</span> </label>
                                            </React.Fragment>
                                        }
                                    </div>
                                  
                                )}
                                </React.Fragment>
                            }
                            <button className="buttonHomePage" onClick={this.addStudent}>Add Student</button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;