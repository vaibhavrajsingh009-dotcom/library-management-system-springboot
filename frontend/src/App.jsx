import { useState } from "react";
import LibraryScene from "./components/Scene/LibraryScene";
import Books from "./pages/Books";
import Members from "./pages/Members";
import Borrow from "./pages/Borrow";
import Dashboard from "./pages/Dashboard";

function App() {
    const [page, setPage] = useState("home");

    if (page === "books") {
        return (
            <>
                <button
                    onClick={() => setPage("home")}
                    style={{
                        position: "fixed",
                        top: "25px",
                        left: "25px",
                        zIndex: 9999,
                        padding: "12px 18px",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(10,10,14,0.9)",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    ← Back to Library
                </button>

                <Books />
            </>
        );
    }

    if (page === "members") {
        return (
            <>
                <button
                    onClick={() => setPage("home")}
                    style={{
                        position: "fixed",
                        top: "25px",
                        left: "25px",
                        zIndex: 9999,
                        padding: "12px 18px",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(10,10,14,0.9)",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    ← Back to Library
                </button>

                <Members />
            </>
        );
    }

    if (page === "borrow") {
        return (
            <>
                <button
                    onClick={() => setPage("home")}
                    style={{
                        position: "fixed",
                        top: "25px",
                        left: "25px",
                        zIndex: 9999,
                        padding: "12px 18px",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(10,10,14,0.9)",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    ← Back to Library
                </button>

                <Borrow />
            </>
        );
    }
    if (page === "dashboard") {
        return (
            <>
                <button
                    onClick={() => setPage("home")}
                    style={{
                        position: "fixed",
                        top: "25px",
                        left: "25px",
                        zIndex: 9999,
                        padding: "12px 18px",
                        borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(10,10,14,0.9)",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    ← Back to Library
                </button>

                <Dashboard />
            </>
        );
    }

    return <LibraryScene setPage={setPage} />;
}

export default App;