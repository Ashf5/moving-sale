
import {createContext, useContext, useState} from 'react';


interface AuthContextType {
    accessToken: string | null;
    login: (token:string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}:{children: React.ReactNode}) {
    const [accessToken, setAccessToken] = useState<string|null>(null);

    const login = (token:string) => setAccessToken(token);
    const logout = () => {
        // TODO add api call to clear http only cookie
        setAccessToken(null);
    }

    const value = {accessToken, login, logout};

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Must wrap in context provider')
    }
    return context;
}

