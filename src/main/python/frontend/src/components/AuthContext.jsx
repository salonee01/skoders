import { createContext, useState, useEffect, use } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const username = localStorage.getItem("username");

        console.log("Retrieved from localStorage:", { token, role, use });

        if (token && role) {
            setUser({ token, role, username });
            console.log("User set from localStorage:", { token, role });
        }
    }, []);

    const login = (token, role, username) => {
        console.log(token, role, username)
        localStorage.setItem("token", token);
        localStorage.setItem("role", token);
        localStorage.setItem("username", username);
        setUser({ token, role, username });
        console.log("User logged in:", { token, role });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        setUser(null);
        console.log("User logged out");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};