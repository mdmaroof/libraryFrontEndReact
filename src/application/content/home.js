import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Select from 'react-select';


class Home extends Component {
    state = {
        studentName:'',
        className:'',
        booksName:''
    }

    changeValue = e => {
        e.preventDefault();
        this.setState({studentName: e.target.value});
    }
    render() {
        return (
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <h1>Allocate Books to Student</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={8}>
                        <div className="homePageForm">
                            <label>Student Name</label>
                            <input className="inputType" placeholder="Student Name" name="studentName" value={this.state.studentName} onChange={this.changeValue} />

                            <label>Class Name</label>
                            
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.classesOption}
                                placeholder="Select Class"
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;