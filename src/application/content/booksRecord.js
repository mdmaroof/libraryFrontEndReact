import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import moment from 'moment';
import Modal from './../../constant/modal'

import {inject,observer} from 'mobx-react';

@inject('studentStore')
@observer

class BooksRecord extends Component { 
    state = {
        loading:'true',
        studentData:[],
        showModal:false,
        bookValues:[],
    }

    showModal = (value) => {
        const arrays = value;
        this.setState({ show: true,bookValues:arrays });
    };

    hideModal = () => {
        this.setState({ show: false });
    };


    componentDidMount = async() => {
        await this.props.studentStore.getStudentAsPerBooks(this.props.match.params.classId)
        this.setState({
            studentData:this.props.studentStore.studentAsPerBooks,
            loading:'false'
        })
    }
    render() {
        return (
            <div className="content">
                 <Row>
                    <Col xs={12}>
                        <h1> Student Record</h1>
                    </Col>
                </Row>

                <Row>
                    {this.state.loading === "true" ?
                        <Col xs={12}>
                            <h2>Loading</h2>
                        </Col>
                        :
                        this.state.bookData <= 0 ?
                        <Col xs={12}>
                            <h2>No Result Found</h2>
                        </Col> :
                            <Col xs={12}>
                                <Modal show={this.state.show} handleClose={this.hideModal} >
                                    {this.state.bookValues.map((x, i) => {
                                        return (
                                            <h4 key={i}>{x.book_name}</h4>
                                        )
                                    })
                                    }
                                </Modal>

                                <div className="table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Student Name</th>
                                                <th>Class</th>
                                                <th>Books Allocated Date</th>
                                                <th>Books Return Date</th>
                                                <th>Books Returned</th>
                                                <th>View Books Taken</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.studentStore.studentAsPerBooks.map(x => {
                                                return (
                                                    <tr key={x.studentId}>
                                                        <td>
                                                            {x.studentName}
                                                        </td>
                                                        <td>
                                                            {x.className}
                                                        </td>
                                                        <td>
                                                            {moment(x.fromDate).format("DD-MM-YYYY")}
                                                        </td>
                                                        <td>
                                                            {moment(x.toDate).format("DD-MM-YYYY")}
                                                        </td>
                                                        <td>
                                                            {x.returnBook === 0 ? 'No' : x.returnBook === 1 ? 'Yes' : 'No Record'}
                                                        </td>
                                                        <td><button className="btn" onClick={() => this.showModal(x.books)}>View Books Taken</button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                    }
                </Row>
            </div>
            
        );
    }
}

export default BooksRecord;