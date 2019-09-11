import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <nav>
                <Row start="xs">
                    <Col xs={6}>
                        <div className="logo">
                            <Link to="/">Library Management System</Link>
                        </div>
                    </Col>

                    <Col xs={6} >
                       <ul>
                           <li><Link to="/">Home</Link></li>
                           <li><Link to="/classRecords">Books</Link></li>
                           <li>Student</li>
                           <li>Records</li>
                       </ul>
                    </Col>
                </Row>
            </nav>
        );
    }
}

export default Header;