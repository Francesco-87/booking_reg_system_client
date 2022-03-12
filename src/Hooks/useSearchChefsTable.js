import axios from '../api/axios';
import React, {useEffect, useState} from "react";
export const ChefsTableContext= React.createContext();

export const useSearchChefsTable = (props) => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {

        let dateVar = new Date(props);


        let date = new Date(dateVar.setTime( dateVar.getTime() - dateVar.getTimezoneOffset()*60*1000)).toISOString()


        const response = await axios.get('/chefsTable', {
            params: {date}
        });
        setUsers(response.data);
    }

        useEffect(() => {
            getUsers()
        }, [props])


        return {users, setUsers}
    }
