import React, { useEffect, useState } from 'react';
import './Home.css'
import fakeData from '../../Data/fakeData.json'
import Tickets from '../Ticket/Tickets';

const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(fakeData);
    }, [])
    return (
        <div className="home-page">
            <div className="row justify-content-center">
                {
                    data.map(element => <Tickets key={element.id} ticketInfo={element}></Tickets>)
                }

            </div>
        </div>

    )
};

export default Home;