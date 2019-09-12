import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom'
import {inject,observer} from 'mobx-react';
import Select from 'react-select';
import moment from 'moment';
import { toast } from 'react-toastify';


@inject('studentStore','bookStore')
@observer

class ReturnBook extends Component {
    state={
        selectedStudent:null,
    }
    componentDidMount = async() => {
        this.props.studentStore.studentBookNotReturn();
    }
    handleChange = async selectedOption => {
        await this.setState({
            selectedStudent:selectedOption,
        })
        this.props.studentStore.selectedStudentCall(selectedOption.value);
    }

    returnBook = (fine,studentId) => {
        const payload = {
            fine:fine,
            studentId:studentId
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        this.props.bookStore.bookReturn(payload,headers)
        .then(async(res)=>{
            if(res.status === 200){
                await toast.success("Succefully Return The Book !", { closeButton: false })
                await this.props.studentStore.emptySelectedStudent();
                this.props.studentStore.studentBookNotReturn();
            }
            else{
                toast.error("Unable To Return,Something Went Wrong !", { closeButton: false })
            }
        })
        .catch((error) => {
            toast.error("Unable To Return,Something Went Wrong !", { closeButton: false })
        });

        this.setState({ selectedStudent:null });
    }

    render() {
        return (
            <div className="content">
                <Row>
                    <Col xs={8}>
                        <h1>Return Book</h1>
                    </Col>
                    <Col xs={4}>
                        <Link className="buttonNew" to="/">Allocate The Book</Link>
                    </Col>
                </Row>

                <Row>

                    <Col xs={8}>
                        <div className="homePageForm">
                            <label>Student Name</label>
                            <Select
                                value={this.state.selectedStudent}
                                onChange={this.handleChange}
                                options={this.props.studentStore.studentNoReturnBook}
                                placeholder="Select Student Name"
                            />
                        </div>

                        <Row>
                            <Col xs={12}>
                                {this.props.studentStore.selectedStudent.map(x=>{
                                    return(
                                        <div key={x.studentId} className="profileBox">
                                            <div className="heading">Name : <span>{x.studentName}</span> </div>
                                            <div className="heading">Class : <span>{x.className}</span> </div>
                                            <div className="heading">Books Allocated :&nbsp;
                                                <span>
                                                    {x.books.map((z,i) => {
                                                        
                                                        return (
                                                            <React.Fragment key={i}>
                                                                {z.book_name}
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </span>
                                            </div>
                                            <div className="heading">Book Allocated Date : <span>{moment(x.fromDate).format("DD-MM-YYYY")}</span> </div>
                                            <div className="heading">Due Date : <span>{moment(x.toDate).format("DD-MM-YYYY")}</span> </div>
                                            <div className="heading">Fine :  &nbsp;
                                                <span>
                                                    {x.fine === 0 || x.fine === '0' ? 'No Fine' :
                                                        <React.Fragment>
                                                            Rs. {x.fine} Fine For Total of
                                                            &nbsp;
                                                        {x.dayDiff}
                                                            &nbsp;
                                                        {x.dayDiff === 1 || x.dayDiff === '1' ? 'day' : 'days'}
                                                            &nbsp;Of Late Submit .
                                                        </React.Fragment>
                                                    }
                                                </span> 
                                            </div>

                                            <button className="buttonHomePage" onClick={()=>this.returnBook(x.fine,x.studentId)}>Return Book</button>
                                        </div>
                                    )
                                })}
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default ReturnBook;