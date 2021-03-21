import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import GoogleMap from '../GoogleMap/GoogleMap';
import fakedata from '../../Data/fakeData.json'
import SearchInfo from '../SearchInfo/SearchInfo';

const ChooseRoute = () => {
    const { id } = useParams();
    const history = useHistory();
    const [ticketInfo, setTicketInfo] = useState({});

    useEffect(() => {
        setTicketInfo(fakedata[id - 1]);
    }, [id])
   
    const [route, setRoute] = useState({
        from: "",
        to: "",
        isSearch: false
    })
    const handleOnBlur = (e) => {
        setRoute({ ...route, [e.target.name]: e.target.value })

    }
    const handleSearchBtn = () => {
        setRoute({ ...route, isSearch: true });

    }
    const handleAlert = () => {
        alert("Please select ticket type from home page");
        history.push("/");
    }
    let i = 1;
    return (<div className="row mx-auto mt-5 ">
        <Card className="col-md-4 m-5 shadow" style={{ width: '18rem', height: "320px" }}>
            <Card.Img variant="top" />
            <Card.Body>
                {!route.isSearch ?
                    <>
                        <Card.Title>From:</Card.Title>
                        <input type="text" name="from" onBlur={handleOnBlur} placeholder="choose from" />
                        <Card.Title className="mt-3">To:</Card.Title>
                        <input type="text" name="to" onBlur={handleOnBlur} placeholder="choose to" />

                        <Button variant="primary" className="mt-3" onClick={handleSearchBtn}>Search</Button>
                    </>
                    :
                    <>
                        {id === undefined ?
                            handleAlert()
                            :
                            <>
                                <div className="bg-primary p-3 rounded shadow">
                                    <Card.Title>{route.from}</Card.Title>
                                    <Card.Title>to</Card.Title>
                                    <Card.Title className="mt-3">{route.to}</Card.Title>
                                </div>
                                {
                                    ticketInfo.info.map(info => <SearchInfo key={i++} info={info}></SearchInfo>)
                                }
                            </>
                        }
                    </>



                }
            </Card.Body>
        </Card>
        <Card className="col-md-8 mt-5 m-2 shadow" style={{ height: "600px" }} >
            <GoogleMap></GoogleMap>
        </Card>
    </div>
    );
};

export default ChooseRoute;