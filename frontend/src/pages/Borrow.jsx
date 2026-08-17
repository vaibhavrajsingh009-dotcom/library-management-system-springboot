import { useEffect, useState } from "react";

const BOOKS_API = "http://localhost:8080/api/books";
const MEMBERS_API = "http://localhost:8080/api/members";
const BORROW_API = "http://localhost:8080/api/borrow";

function Borrow() {
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [records, setRecords] = useState([]);

    const [bookId, setBookId] = useState("");
    const [memberId, setMemberId] = useState("");

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const [booksResponse, membersResponse, recordsResponse] =
                await Promise.all([
                    fetch(BOOKS_API),
                    fetch(MEMBERS_API),
                    fetch(BORROW_API),
                ]);

            if (
                !booksResponse.ok ||
                !membersResponse.ok ||
                !recordsResponse.ok
            ) {
                throw new Error("Failed to load library data");
            }

            const booksData = await booksResponse.json();
            const membersData = await membersResponse.json();
            const recordsData = await recordsResponse.json();

            setBooks(booksData);
            setMembers(membersData);
            setRecords(recordsData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const borrowBook = async () => {
        if (!bookId || !memberId) {
            setError("Please select a book and a member.");
            return;
        }

        try {
            setError("");
            setMessage("");

            const response = await fetch(
                `${BORROW_API}/${bookId}/member/${memberId}`,
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || "Unable to borrow book");
            }

            setMessage("Book borrowed successfully!");

            setBookId("");
            setMemberId("");

            await loadData();
        } catch (err) {
            setError(err.message);
        }
    };

    const returnBook = async (recordId) => {
        try {
            setError("");
            setMessage("");

            const response = await fetch(
                `${BORROW_API}/return/${recordId}`,
                {
                    method: "PUT",
                }
            );

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || "Unable to return book");
            }

            setMessage("Book returned successfully!");

            await loadData();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "120px 7% 60px",
                boxSizing: "border-box",
                background:
                    "radial-gradient(circle at top right, #241b0f, #08080b 45%, #050506)",
                color: "white",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div style={{ marginBottom: "40px" }}>
                <p
                    style={{
                        color: "#d6a84f",
                        letterSpacing: "3px",
                        fontSize: "11px",
                        fontWeight: "bold",
                    }}
                >
                    LIBRARY OPERATIONS
                </p>

                <h1
                    style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "48px",
                        fontWeight: "500",
                        margin: "10px 0",
                    }}
                >
                    Borrow & Return
                </h1>

                <p style={{ color: "rgba(255,255,255,0.5)" }}>
                    Manage books currently borrowed by members.
                </p>
            </div>

            {message && (
                <div
                    style={{
                        marginBottom: "20px",
                        padding: "14px 18px",
                        borderRadius: "12px",
                        background: "rgba(60,180,100,0.12)",
                        border:
                            "1px solid rgba(80,220,120,0.2)",
                        color: "#8ee6a7",
                    }}
                >
                    {message}
                </div>
            )}

            {error && (
                <div
                    style={{
                        marginBottom: "20px",
                        padding: "14px 18px",
                        borderRadius: "12px",
                        background: "rgba(180,40,40,0.12)",
                        border:
                            "1px solid rgba(255,80,80,0.2)",
                        color: "#ff9c9c",
                    }}
                >
                    {error}
                </div>
            )}

            {/* Borrow panel */}
            <div
                style={{
                    padding: "25px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.045)",
                    border:
                        "1px solid rgba(255,255,255,0.09)",
                    backdropFilter: "blur(15px)",
                    marginBottom: "40px",
                }}
            >
                <h2
                    style={{
                        fontFamily: "Georgia, serif",
                        marginTop: 0,
                    }}
                >
                    Borrow a Book
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "15px",
                    }}
                >
                    <select
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                    >
                        <option value="">Select book</option>

                        {books
                            .filter((book) => book.availableCopies > 0)
                            .map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.title} — {book.availableCopies} available
                                </option>
                            ))}
                    </select>

                    <select
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                    >
                        <option value="">Select member</option>

                        {members.map((member) => (
                            <option key={member.id} value={member.id}>
                                {member.name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={borrowBook}
                        disabled={loading}
                        style={{
                            border: "none",
                            borderRadius: "10px",
                            background: "#d6a84f",
                            color: "#080706",
                            fontWeight: "700",
                            cursor: "pointer",
                            padding: "12px",
                        }}
                    >
                        Borrow Book
                    </button>
                </div>
            </div>

            {/* Records */}
            <h2
                style={{
                    fontFamily: "Georgia, serif",
                    marginBottom: "20px",
                }}
            >
                Borrow Records
            </h2>

            {loading ? (
                <p style={{ color: "rgba(255,255,255,0.5)" }}>
                    Loading records...
                </p>
            ) : records.length === 0 ? (
                <div
                    style={{
                        padding: "60px",
                        textAlign: "center",
                        borderRadius: "20px",
                        background: "rgba(255,255,255,0.035)",
                        border:
                            "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    No borrow records yet.
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "18px",
                    }}
                >
                    {records.map((record) => (
                        <div
                            key={record.id}
                            style={{
                                padding: "24px",
                                borderRadius: "20px",
                                background: "rgba(255,255,255,0.045)",
                                border:
                                    "1px solid rgba(255,255,255,0.09)",
                            }}
                        >
                            <h3
                                style={{
                                    fontFamily: "Georgia, serif",
                                    fontSize: "21px",
                                    marginTop: 0,
                                }}
                            >
                                {record.book?.title || "Unknown Book"}
                            </h3>

                            <p style={{ color: "#d6a84f" }}>
                                {record.member?.name || "Unknown Member"}
                            </p>

                            <p
                                style={{
                                    color: "rgba(255,255,255,0.55)",
                                    fontSize: "13px",
                                }}
                            >
                                Borrowed: {record.borrowDate}
                            </p>

                            <p
                                style={{
                                    color: "rgba(255,255,255,0.55)",
                                    fontSize: "13px",
                                }}
                            >
                                Due: {record.dueDate}
                            </p>

                            <div
                                style={{
                                    marginTop: "15px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                <span
                    style={{
                        color: record.returned
                            ? "#7ed69a"
                            : "#e2b85f",
                        fontWeight: "600",
                    }}
                >
                  {record.returned
                      ? "Returned"
                      : "Currently Borrowed"}
                </span>

                                {!record.returned && (
                                    <button
                                        onClick={() =>
                                            returnBook(record.id)
                                        }
                                        style={{
                                            border:
                                                "1px solid rgba(214,168,79,0.3)",
                                            background:
                                                "rgba(214,168,79,0.08)",
                                            color: "#e2b85f",
                                            borderRadius: "9px",
                                            padding: "9px 13px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Return
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Borrow;