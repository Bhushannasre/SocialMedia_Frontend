import { createContext, useState } from "react";
import type { ReactNode } from "react"; // ✅ type-only import

interface User { name: string; email: string; }
interface AuthContextType { user: User | null; logout: () => void; }

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>({
        name: "Bhushan",
        email: "bhushannasre3@gmail.com"
    });
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}