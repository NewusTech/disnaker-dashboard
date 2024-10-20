import React from 'react'
import { jwtDecode } from 'jwt-decode';

const UserName = () => {
        // Decode the token
        interface DecodedToken {
            userId: number;
            email: string;
            name: string;
            roleId: number;
            role: string;
            iat: number; // Issued at time
            exp: number; // Expiration time
        }
        
        const token = localStorage.getItem('accessToken');
        let userName: string | undefined; // Declare userName with an appropriate type
        
        if (token) {
            const decoded = jwtDecode<DecodedToken>(token); // Use the interface here
            userName = decoded?.name; // Assign decoded name to userName
        } else {
            console.error("No token found in localStorage");
        }
  return (
    <div>
        {userName}
    </div>
  )
}

export default UserName