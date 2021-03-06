import './Tickets.css'
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import tkIcon from '../../images/bd tk icon.jpg'
import { Link } from 'react-router-dom';

const Tickets = (props) => {
    const {id, type, price, img} = props.ticketInfo;

    return (
        <Card className="col-md-3 col-sm-4 ms-3 mt-5 p-4" style={{ width: '15rem',height:"365px" }}>
            <Card.Img variant="top" className="card-img" src={img} />
            <Card.Body>
                <h3>{type}</h3>
                <h5><img className="icon" src={tkIcon} alt=""/> {price}</h5>
                <Link to={`/route/${id}`}> <Button className="buy-btn"  variant="primary">Buy Now</Button> </Link>
            </Card.Body>
        </Card>
    );
};

export default Tickets;