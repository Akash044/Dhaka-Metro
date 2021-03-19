import './Tickets.css'
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import tkIcon from '../../images/bd tk icon.jpg'
import { Link } from 'react-router-dom';

const Tickets = (props) => {
    const {type, price, img} = props.info;

    return (
        <Card className="col-md-3 col-sm-4 ms-3 mt-5 p-4" style={{ width: '15rem' }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <h3>{type}</h3>
                <h5><img className="icon" src={tkIcon} alt=""/> {price}</h5>
                <Button className="buy-btn" as={Link} to="/route" variant="primary">Buy Now</Button>
            </Card.Body>
        </Card>
    );
};

export default Tickets;