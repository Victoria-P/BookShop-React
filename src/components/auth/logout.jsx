import React, { useEffect } from 'react';
import auth from '../../services/authService';

function Logout () {
    useEffect(() => {
        auth.logOut();
    }, []);

    return (null)
}

export default Logout;
