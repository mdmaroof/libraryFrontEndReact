import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {BOOK_RECORD} from './../../constant/axios'

class BooksRecord extends Component {
    state = {
        loading:'true',
        bookData:[]
    }
    componentDidMount = () => {
        const id = this.props.match.params.classId;
        BOOK_RECORD(id)
        .then((res)=>{
            this.setState({
                bookData:res.data.result,
                loading:'false'
            })
        })  
    }
    render() {
        return (
            <div className="content">
                 <Row>
                    <Col xs={12}>
                        <h1>{this.props.match.params.classId} Books Record</h1>
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
                            {this.state.bookData.map(x=><h4 key={x.id}>{x.book_name}</h4>)}
                        </Col>
                    }
                </Row>
            </div>
            
        );
    }
}

export default BooksRecord;