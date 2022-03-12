import axios from "../api/axios";

export const updatePersonalData = (name, surname, birthday, eMail, phone, password, id) => {




    axios.put('/register', {
        withCredentials: true,
        name,
        surname,
        birthday,
        eMail,
        phone,
        password,
        id

    });
}