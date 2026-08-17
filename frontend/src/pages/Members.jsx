import { useEffect, useState } from "react";

const API = "http://localhost:8080/api/members";

function Members() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });

    const loadMembers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API);

            if (!response.ok) {
                throw new Error("Failed to load members");
            }

            const data = await response.json();
            setMembers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMembers();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddMember = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error("Failed to add member");
            }

            setForm({
                name: "",
                email: "",
                phoneNumber: "",
            });

            setShowForm(false);

            await loadMembers();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete member");
            }

            await loadMembers();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "radial-gradient(circle at top left, #211a10, #08080b 45%, #050506)",
                color: "white",
                padding: "120px 7% 60px",
                boxSizing: "border-box",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "40px",
                    gap: "20px",
                }}
            >
                <div>
                    <p
                        style={{
                            color: "#d6a84f",
                            letterSpacing: "3px",
                            fontSize: "11px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                        }}
                    >
                        LIBRARY COMMUNITY
                    </p>

                    <h1
                        style={{
                            margin: 0,
                            fontFamily: "Georgia, serif",
                            fontSize: "48px",
                            fontWeight: "500",
                        }}
                    >
                        Members
                    </h1>

                    <p
                        style={{
                            color: "rgba(255,255,255,0.5)",
                            marginTop: "12px",
                        }}
                    >
                        Manage everyone registered in your library.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    style={{
                        padding: "14px 22px",
                        border: "none",
                        borderRadius: "13px",
                        background: "#d6a84f",
                        color: "#080706",
                        fontWeight: "700",
                        cursor: "pointer",
                    }}
                >
                    {showForm ? "Close" : "+ Add Member"}
                </button>
            </div>

            {/* Error */}
            {error && (
                <div
                    style={{
                        padding: "15px 18px",
                        marginBottom: "25px",
                        borderRadius: "12px",
                        background: "rgba(180,40,40,0.15)",
                        border: "1px solid rgba(255,80,80,0.2)",
                        color: "#ff9c9c",
                    }}
                >
                    {error}
                </div>
            )}

            {/* Add member form */}
            {showForm && (
                <form
                    onSubmit={handleAddMember}
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "14px",
                        padding: "25px",
                        marginBottom: "35px",
                        borderRadius: "20px",
                        background: "rgba(255,255,255,0.045)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        backdropFilter: "blur(15px)",
                    }}
                >
                    <input
                        name="name"
                        placeholder="Full name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="phoneNumber"
                        placeholder="Phone number"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        style={{
                            border: "none",
                            borderRadius: "10px",
                            background: "#d6a84f",
                            color: "#080706",
                            fontWeight: "700",
                            cursor: "pointer",
                        }}
                    >
                        Add Member
                    </button>
                </form>
            )}

            {/* Loading */}
            {loading && (
                <div
                    style={{
                        color: "rgba(255,255,255,0.5)",
                        padding: "40px 0",
                    }}
                >
                    Loading members...
                </div>
            )}

            {/* Empty state */}
            {!loading && members.length === 0 && (
                <div
                    style={{
                        textAlign: "center",
                        padding: "70px",
                        borderRadius: "20px",
                        background: "rgba(255,255,255,0.035)",
                        border: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    <div style={{ fontSize: "40px" }}>👥</div>

                    <h2>No members yet</h2>

                    <p
                        style={{
                            color: "rgba(255,255,255,0.45)",
                        }}
                    >
                        Add your first library member.
                    </p>
                </div>
            )}

            {/* Members */}
            {!loading && members.length > 0 && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "18px",
                    }}
                >
                    {members.map((member) => (
                        <div
                            key={member.id}
                            style={{
                                padding: "24px",
                                borderRadius: "20px",
                                background: "rgba(255,255,255,0.045)",
                                border:
                                    "1px solid rgba(255,255,255,0.09)",
                                backdropFilter: "blur(15px)",
                            }}
                        >
                            {/* Avatar */}
                            <div
                                style={{
                                    width: "55px",
                                    height: "55px",
                                    borderRadius: "50%",
                                    display: "grid",
                                    placeItems: "center",
                                    marginBottom: "18px",
                                    background:
                                        "linear-gradient(135deg, #d6a84f, #6f4b1d)",
                                    color: "#080706",
                                    fontSize: "20px",
                                    fontWeight: "700",
                                }}
                            >
                                {member.name
                                    ? member.name.charAt(0).toUpperCase()
                                    : "?"}
                            </div>

                            <h2
                                style={{
                                    fontFamily: "Georgia, serif",
                                    margin: "0 0 8px",
                                    fontSize: "21px",
                                }}
                            >
                                {member.name}
                            </h2>

                            <p
                                style={{
                                    color: "rgba(255,255,255,0.6)",
                                    margin: "8px 0",
                                }}
                            >
                                ✉ {member.email}
                            </p>

                            <p
                                style={{
                                    color: "rgba(255,255,255,0.45)",
                                    margin: "8px 0",
                                }}
                            >
                                ☎ {member.phoneNumber}
                            </p>

                            <button
                                onClick={() => handleDelete(member.id)}
                                style={{
                                    width: "100%",
                                    marginTop: "18px",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    border:
                                        "1px solid rgba(255,80,80,0.2)",
                                    background:
                                        "rgba(255,70,70,0.08)",
                                    color: "#ff9c9c",
                                    cursor: "pointer",
                                }}
                            >
                                Delete Member
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Members;