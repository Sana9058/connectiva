import { useAuth } from "./context/AuthContext.jsx";
import AuthPage from "./components/AuthPage.jsx";

const App = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <p>Loading Connectiva...</p>;
    }

    if (!user) {
        return <AuthPage />;
    }

    return (
        <main>
            <h1>Welcome to Connectiva</h1>

            <p>
                Logged in as {user.name} ({user.email})
            </p>
        </main>
    );
};

export default App;