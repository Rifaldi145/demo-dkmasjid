import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function UnAuthContent({ children }) {
    let users = JSON.parse(localStorage.getItem('users'));
    let history = useHistory();

    useEffect(() => {
        if(users) {
            history.push('/admin/dashboard');
        }
    }, [users, history]);

    if (!users) {
        
        return <>{children}</>;
    }

    return <></>;
}