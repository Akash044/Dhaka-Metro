import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import map from '../../images/image 6.png'

const ChooseRoute = () => {
    const [route, setRoute] = useState({
        from: "",
        to: "",
        isSearch: false
    })
    const handleOnBlur = (e) => {
        setRoute({ ...route, [e.target.name]: e.target.value })

    }
    return (<div className="row container mx-auto mt-5 ">
        <Card className="col-4 shadow" style={{ width: '18rem', height: "250px" }}>
            <Card.Img variant="top" />
            <Card.Body>
                {!route.isSearch ?
                    <>
                        <Card.Title>From:</Card.Title>
                        <input type="text" name="from" onBlur={handleOnBlur} placeholder="choose from" />
                        <Card.Title className="mt-3">To:</Card.Title>
                        <input type="text" name="to" onBlur={handleOnBlur} placeholder="choose to" />

                        <Button variant="primary" className="mt-3" onClick={()=> setRoute({ ...route, isSearch:true})} >Search</Button>
                    </>
                    :
                    <div className="bg-primary p-3 rounded shadow">
                        <Card.Title>{route.from}</Card.Title>
                        <Card.Title className="mt-3">{route.to}</Card.Title>
                    </div>

                }
            </Card.Body>
        </Card>
        <Card className="col-8 p-3 mb-5 m-2 shadow" >
            <Card.Img variant="top" src={map} style={{ width: "100%", height: "600px" }} />
        </Card>
    </div>
    );
};

export default ChooseRoute;