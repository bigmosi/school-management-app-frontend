import { useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    

    // Simulate login
    const login = (userData) => {
        setUser(userData);
    }

    // Simulate logout
    const logout = () => {
        setUser(null);
    }

    return { user, login, logout };
}
