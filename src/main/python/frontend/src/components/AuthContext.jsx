import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        console.log("Retrieved from localStorage:", { token, role });

        if (token && role) {
            setUser({ token, role });
            console.log("User set from localStorage:", { token, role });
        }
    }, []);

    const login = (token, role) => {
        console.log(token, role)
        localStorage.setItem("token", token);
        localStorage.setItem("role", token);
        setUser({ token, role });
        console.log("User logged in:", { token, role });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null);
        console.log("User logged out");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};