import {useContext} from "react";
import ProfileContext from "../components/ProfileProvider";


const useProfile = () => {
    return useContext(ProfileContext);
}

export default useProfile;

