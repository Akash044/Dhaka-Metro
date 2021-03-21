import './SearchInfo.css'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'

const SearchInfo = (props) => {
    const {tName, tPrice} = props.info;
    return (
        <div className="mt-2 p-1 rounded search-res">
            <h5><FontAwesomeIcon icon={faTicketAlt}></FontAwesomeIcon> {tName} -- {tPrice}tk</h5>
        </div>
    );
};

export default SearchInfo;