import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const AuthPage = () => {
    const { login, register } = useAuth();

    const [isRegistering, setIsRegistering] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setMessage("");
        setSubmitting(true);

        try {
            if (isRegistering) {
                await register({
                    name,
                    email,
                    password
                });

                setMessage(
                    "Registration successful. You can now log in."
                );

                setIsRegistering(false);
                setPassword("");
            } else {
                await login({
                    email,
                    password
                });

                setMessage("Login successful.");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const switchMode = () => {
        setIsRegistering((current) => !current);

        setName("");
        setEmail("");
        setPassword("");
        setError("");
        setMessage("");
    };

    return (
        <main>
            <h1>Connectiva</h1>

            <h2>
                {isRegistering
                    ? "Create your account"
                    : "Welcome back"}
            </h2>

            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <div>
                        <label htmlFor="name">
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />
                </div>

                {error && (
                    <p role="alert">
                        {error}
                    </p>
                )}

                {message && (
                    <p role="status">
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                >
                    {submitting
                        ? "Please wait..."
                        : isRegistering
                            ? "Create Account"
                            : "Login"}
                </button>
            </form>

            <button
                type="button"
                onClick={switchMode}
            >
                {isRegistering
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
            </button>
        </main>
    );
};

export default AuthPage;