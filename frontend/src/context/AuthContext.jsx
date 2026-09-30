import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getCurrentUser,
    loginUser,
    logoutUser,
    registerUser
} from "../services/api.js";

import socket from "../socket/socket.js";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCurrentUser = async () => {
            try {
                const data = await getCurrentUser();

                setUser(data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadCurrentUser();
    }, []);

    useEffect(() => {
        if (user) {
            socket.connect();
        } else {
            if (socket.connected) {
                socket.disconnect();
            }
        }

        return () => {
            if (socket.connected) {
                socket.disconnect();
            }
        };
    }, [user]);

    const register = async (userData) => {
        const data = await registerUser(userData);

        return data;
    };

    const login = async (credentials) => {
        const data = await loginUser(credentials);

        setUser(data.user);

        return data;
    };

    const logout = async () => {
        await logoutUser();

        setUser(null);
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;