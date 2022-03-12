import axios from '../api/axios';
import {useEffect, useState} from "react";

export const useAllergenSearch = (idCustomer) => {
    const [allergen, setAllergen] = useState([]);



    const getAllergens = async () => {

        let idCustomerAxios = idCustomer;

        const response = await axios.get('/allergens', {
            params: {idCustomerAxios}
        });
        setAllergen([
            response.data[0].celery,
            response.data[0].crustaceans,
            response.data[0].egg,
            response.data[0].fish,
            response.data[0].gluten,
            response.data[0].lupin,
            response.data[0].milk,
            response.data[0].molluscs,
            response.data[0].mustard,
            response.data[0].nuts,
            response.data[0].peanuts,
            response.data[0].sesame,
            response.data[0].soy,
            response.data[0].sulphites,
            response.data[0].idCustomer

        ]);
    }
    useEffect(() => {
        getAllergens()
    }, [idCustomer])

    return {allergen, setAllergen}
}
