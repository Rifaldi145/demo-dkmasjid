import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function AuthContent({ children }) {
    let users = JSON.parse(localStorage.getItem('users'));
    let history = useHistory();
    
    useEffect(() => {
        if (!users) {
            history.push('/masjid');
        }
    }, [users, history]);

    if (users) {
        return <>{children}</>;
    }

    return <></>;
}