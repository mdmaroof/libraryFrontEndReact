import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {ADD_BOOK} from './../../constant/axios'
import Modal from './../../constant/modal'
import {Link} from 'react-router-dom'
import Select from 'react-select';
import { toast } from 'react-toastify';

import {inject,observer} from 'mobx-react';

@inject('bookStore','classesStore')
@observer
class AllBooksRecord extends Component {
    state = {
        classesData:[],
        loading:'true',
        showModal:false, 
        classesOption:[],
        selectedOption: null,
        bookName:''
    }
    componentDidMount = async() => {
        if(this.state.classesData.length === 0){
            await this.props.classesStore.classesData();
            await this.props.bookStore.allBooksCall();
        }
        this.setState({
            // classesData:await this.props.classesStore.classes,
            classesOption:await this.props.classesStore.classesOption,
            loading:'false'
        })  
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };
    bookNameChange = e => {
        e.preventDefault();
        this.setState({bookName: e.target.value});
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    addBookToRecord = () => {
        // console.log(this.state.bookName,this.state.selectedOption.value)
        const payload = {
            bookName:this.state.bookName,
            className:this.state.selectedOption.value
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        ADD_BOOK(payload, headers)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Succefully Added The Book !", { closeButton: false });
                    this.props.bookStore.allBooksCall();
                }
                else {
                    toast.error("Unable To Add,Something Went Wrong !", { closeButton: false })
                }
            })
            .catch((error) => {
                toast.error("Unable To Add,Something Went Wrong !", { closeButton: false })
            });
            this.setState({ show: false,selectedOption:null,bookName:'' });
    }

    render() {
        return (
            <div className="content">
                <Row>
                    <Col xs={8}>
                        <h1>All Books Records</h1>
                    </Col>
                    <Col xs={4} className="button">
                        <button onClick={this.showModal}>Add Book</button>
                    </Col>
                </Row>
                <Row>
                    {this.state.loading === "true" ?
                        <Col xs={12}>
                            <h2>Loading</h2>
                        </Col>
                        :
                        <Col xs={12}>

                            <Modal show={this.state.show} handleClose={this.hideModal} >
                                <div className="modalHeading">Add Book To The Class</div>

                                <div className="form">
                                    <label>Book Name</label>
                                    <input className="inputType" value={this.state.bookName} onChange={this.bookNameChange} />
                                    <label>Class Book Related To</label>
                                    <Select
                                        value={this.state.selectedOption}
                                        onChange={this.handleChange}
                                        options={this.state.classesOption}
                                    />
                                </div>
                                <button className="addButton" onClick={this.addBookToRecord}>Add Book </button>
                            </Modal>


                            <div className="table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Book Name</th>
                                            <th>Class Book Related To</th>
                                            <th>Total Books In Record</th>
                                            <th>Total Books Available</th>
                                            <th>Total Book Taken</th>
                                            <th>View Student Taken Books</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {this.props.bookStore.allBooks.map((x,i)=>{
                                           return(
                                               <tr key={i}>
                                                  <td>{x.book_name}</td> 
                                                  <td>{x.class_book_related}</td> 
                                                  <td>{x.totalBook}</td> 
                                                  <td>{x.booksAvailable}</td> 
                                                  <td>{x.booksTaken}</td>
                                                  <td><Link to={`/books/${x.id}`} className="btn" onClick={()=>this.showModal(x.books)}>View Student Taken Books</Link> </td>
                                               </tr>
                                           )
                                       })}
                                    </tbody>
                                </table>
                            </div>

                            {/* {this.state.classesData.map(x => {
                                return (
                                    <h4 key={x.class_id}>
                                        <Link to={`books/${x.class_name}`}>{x.class_name}</Link>
                                    </h4>
                                )
                            })} */}
                        </Col>
                    }
                </Row>
            </div>
        );
    }
}

export default AllBooksRecord;