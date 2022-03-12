import axios from '../api/axios';
import useAuth from "./useAuth";
import useProfile from "./useProfile";

const useRefreshToken = () => {

    const {setAuth} = useAuth();

    const {setProfile} = useProfile();


    const refresh = async () => {

        const response = await axios.get('/refresh', {
            withCredentials: true

        });

        setAuth(prev => {

            return {...prev,
                roles: [response.data.roles],
                accessToken: response.data.accessToken}
        });
        setProfile(response.data);
        return response.data.accessToken;
    }
    return refresh;
}
export default useRefreshToken;