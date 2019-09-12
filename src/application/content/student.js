import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {inject,observer} from 'mobx-react';
import moment from 'moment';
import Modal from './../../constant/modal'

@inject('studentStore','bookStore')
@observer
class Students extends Component {
    state = {
        showModal:false,
        bookValues:[],
        allBooksRecord:[]
    }

    showModal = (value) => {
        const arrays = value;
        this.setState({ show: true,bookValues:arrays });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    componentDidMount = async() => {
        await this.props.studentStore.getStudents()
    }

    render() {
        return (
            <div className="content">

                <Modal show={this.state.show} handleClose={this.hideModal} >
                    {this.state.bookValues.map((x,i)=>{
                        return(
                            <h4 key={i}>{x.book_name}</h4>
                        )
                    })
                    }
                </Modal>

            <Row>
                <Col xs={12}>
                    <h1>Students Record</h1>
                </Col>
            </Row>

            <Row>
                <Col xs={12}>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Books Allocated Date</th>
                                    <th>Books Return Due Date</th>
                                    <th>Books Returned</th>
                                    <th>View Books Taken</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.studentStore.allStudents.map(x => {
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
                                            <td><button className="btn" onClick={()=>this.showModal(x.books)}>View Books Taken</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </Col>
            </Row>
            </div>
        );
    }
}

export default Students;