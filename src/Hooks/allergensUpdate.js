//Updating allergens
import axios from "../api/axios";

export const allergensUpdate = (allergens) => {


        axios.put('/allergens', {
            withCredentials: true,
            allergens

                });
}



