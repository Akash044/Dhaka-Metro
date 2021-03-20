import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import GoogleMap from '../GoogleMap/GoogleMap';
import fakedata from '../../Data/fakeData.json'
import SearchInfo from '../SearchInfo/SearchInfo';
const ChooseRoute = () => {
    const { id } = useParams();
    console.log("id ", id);

    const [ticketInfo, setTicketInfo] = useState({});
    useEffect(() => {
        setTicketInfo(fakedata[id - 1]);
    }, [id])
    console.log(ticketInfo);
    const [route, setRoute] = useState({
        from: "",
        to: "",
        isSearch: false
    })
    const handleOnBlur = (e) => {
        setRoute({ ...route, [e.target.name]: e.target.value })

    }
    let i = 1;
    return (<div className="row container mx-auto mt-5 ">
        <Card className="col-md-4 ms-5 mb-4 shadow" style={{ width: '18rem', height: "320px" }}>
            <Card.Img variant="top" />
            <Card.Body>
                {!route.isSearch ?
                    <>
                        <Card.Title>From:</Card.Title>
                        <input type="text" name="from" onBlur={handleOnBlur} placeholder="choose from" />
                        <Card.Title className="mt-3">To:</Card.Title>
                        <input type="text" name="to" onBlur={handleOnBlur} placeholder="choose to" />

                        <Button variant="primary" className="mt-3" onClick={() => setRoute({ ...route, isSearch: true })} >Search</Button>
                    </>
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
            </Card.Body>
        </Card>
        <Card className="col-md-8 ms-5 p-2 shadow" style={{ width: '67%', height: "600px" }} >
            <GoogleMap></GoogleMap>
        </Card>
    </div>
    );
};

export default ChooseRoute;