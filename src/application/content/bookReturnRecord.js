import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

@inject('bookStore')
@observer
class BookReturnRecord extends Component {
    componentDidMount = async () => {
        await this.props.bookStore.callBookReturnData()
    }
    render() {
        return (
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <h1>Books Returned</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <div className="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Student Name</th>
                                        <th>Books Return Date</th>
                                        <th>Fine</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.bookStore.bookReturnData.map(x => {
                                        return (
                                            <tr key={x.studentId}>
                                                <td>{x.studentName}</td>
                                                <td>{moment(x.currentDate).format("DD-MM-YYYY")}</td>
                                                <td>{x.fineAmount <= 0 ? 'No Fine' : x.fineAmount}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BookReturnRecord;