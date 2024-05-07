import { jwtDecode } from 'jwt-decode';

const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    // Check if a token exists
    if (token) {
        try {
            //decode the token
            const decodedToken = jwtDecode(token);

            const currentTime = Date.now() / 1000; // Convert to seconds
            if (decodedToken.exp < currentTime) {
                console.log('Token expired')
                return false;
            }
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    } else {
        console.log('Login first')
        return false;
    }
};

export default isLoggedIn;