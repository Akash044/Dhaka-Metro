import { Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
    return (

        <div>
           
            <Button as={Link} to="/route" className="btn btn-success me-4"> 500</Button>
            <Button as={Link} to="/route" className="btn btn-info me-4"> 500</Button>
            <Button as={Link} to="/route" className="btn btn-danger me-4"> 500</Button>
            <Button as={Link} to="/route" className="btn btn-warning me-4"> 500</Button>
            

        </div>
    )    
};

export default Home;