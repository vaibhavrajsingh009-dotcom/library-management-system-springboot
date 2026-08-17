import { useEffect, useState } from "react";

const BOOKS_API = "http://localhost:8080/api/books";
const MEMBERS_API = "http://localhost:8080/api/members";
const BORROW_API = "http://localhost:8080/api/borrow";

function Dashboard() {
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const [booksResponse, membersResponse, borrowResponse] =
                await Promise.all([
                    fetch(BOOKS_API),
                    fetch(MEMBERS_API),
                    fetch(BORROW_API),
                ]);

            if (
                !booksResponse.ok ||
                !membersResponse.ok ||
                !borrowResponse.ok
            ) {
                throw new Error("Failed to load dashboard data");
            }

            const booksData = await booksResponse.json();
            const membersData = await membersResponse.json();
            const borrowData = await borrowResponse.json();

            setBooks(booksData);
            setMembers(membersData);
            setRecords(borrowData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const totalBooks = books.reduce(
        (total, book) => total + book.totalCopies,
        0
    );

    const availableBooks = books.reduce(
        (total, book) => total + book.availableCopies,
        0
    );

    const issuedBooks = totalBooks - availableBooks;

    const activeRecords = records.filter(
        (record) => !record.returned
    );

    const returnedRecords = records.filter(
        (record) => record.returned
    );

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "grid",
                    placeItems: "center",
                    background: "#070709",
                    color: "white",
                    fontSize: "18px",
                }}
            >
                Loading dashboard...
            </div>
        );
    }

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
            {/* Header */}

            <div style={{ marginBottom: "45px" }}>
                <p
                    style={{
                        color: "#d6a84f",
                        letterSpacing: "3px",
                        fontSize: "11px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                    }}
                >
                    LIBRARY OVERVIEW
                </p>

                <h1
                    style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "48px",
                        fontWeight: "500",
                        margin: 0,
                    }}
                >
                    Dashboard
                </h1>

                <p
                    style={{
                        color: "rgba(255,255,255,0.5)",
                        marginTop: "12px",
                    }}
                >
                    A live overview of your library.
                </p>
            </div>

            {error && (
                <div
                    style={{
                        marginBottom: "25px",
                        padding: "15px",
                        borderRadius: "12px",
                        background: "rgba(180,40,40,0.12)",
                        color: "#ff9c9c",
                    }}
                >
                    {error}
                </div>
            )}

            {/* Statistics */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "18px",
                    marginBottom: "45px",
                }}
            >
                <StatCard
                    icon="📚"
                    title="Total Books"
                    value={totalBooks}
                    subtitle={`${books.length} book titles`}
                />

                <StatCard
                    icon="👥"
                    title="Members"
                    value={members.length}
                    subtitle="Registered members"
                />

                <StatCard
                    icon="📖"
                    title="Issued Books"
                    value={issuedBooks}
                    subtitle={`${activeRecords.length} active records`}
                />

                <StatCard
                    icon="✓"
                    title="Available"
                    value={availableBooks}
                    subtitle="Copies available"
                />
            </div>

            {/* Activity */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "minmax(0, 2fr) minmax(280px, 1fr)",
                    gap: "20px",
                }}
            >
                {/* Recent Activity */}

                <div
                    style={{
                        padding: "25px",
                        borderRadius: "20px",
                        background: "rgba(255,255,255,0.045)",
                        border:
                            "1px solid rgba(255,255,255,0.09)",
                        backdropFilter: "blur(15px)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <h2
                            style={{
                                fontFamily: "Georgia, serif",
                                margin: 0,
                            }}
                        >
                            Recent Activity
                        </h2>

                        <span
                            style={{
                                color: "#d6a84f",
                                fontSize: "13px",
                            }}
                        >
              {records.length} records
            </span>
                    </div>

                    {records.length === 0 ? (
                        <p
                            style={{
                                color: "rgba(255,255,255,0.45)",
                            }}
                        >
                            No activity yet.
                        </p>
                    ) : (
                        records
                            .slice()
                            .reverse()
                            .slice(0, 6)
                            .map((record) => (
                                <div
                                    key={record.id}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "16px 0",
                                        borderBottom:
                                            "1px solid rgba(255,255,255,0.06)",
                                        gap: "15px",
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                fontWeight: "600",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            {record.book?.title ||
                                                "Unknown Book"}
                                        </div>

                                        <div
                                            style={{
                                                color:
                                                    "rgba(255,255,255,0.45)",
                                                fontSize: "13px",
                                            }}
                                        >
                                            {record.member?.name ||
                                                "Unknown Member"}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            textAlign: "right",
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: record.returned
                                                    ? "#7ed69a"
                                                    : "#e2b85f",
                                                fontSize: "13px",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {record.returned
                                                ? "Returned"
                                                : "Borrowed"}
                                        </div>

                                        <div
                                            style={{
                                                color:
                                                    "rgba(255,255,255,0.35)",
                                                fontSize: "11px",
                                                marginTop: "4px",
                                            }}
                                        >
                                            {record.borrowDate}
                                        </div>
                                    </div>
                                </div>
                            ))
                    )}
                </div>

                {/* Library Status */}

                <div
                    style={{
                        padding: "25px",
                        borderRadius: "20px",
                        background: "rgba(255,255,255,0.045)",
                        border:
                            "1px solid rgba(255,255,255,0.09)",
                        backdropFilter: "blur(15px)",
                    }}
                >
                    <h2
                        style={{
                            fontFamily: "Georgia, serif",
                            marginTop: 0,
                            marginBottom: "25px",
                        }}
                    >
                        Library Status
                    </h2>

                    <StatusRow
                        label="Available"
                        value={availableBooks}
                        total={totalBooks}
                    />

                    <StatusRow
                        label="Issued"
                        value={issuedBooks}
                        total={totalBooks}
                    />

                    <StatusRow
                        label="Returned Records"
                        value={returnedRecords.length}
                        total={records.length}
                    />

                    <div
                        style={{
                            marginTop: "30px",
                            padding: "18px",
                            borderRadius: "15px",
                            background:
                                "rgba(214,168,79,0.08)",
                            border:
                                "1px solid rgba(214,168,79,0.15)",
                        }}
                    >
                        <div
                            style={{
                                color: "#d6a84f",
                                fontSize: "12px",
                                letterSpacing: "1px",
                                marginBottom: "7px",
                            }}
                        >
                            ACTIVE BORROWERS
                        </div>

                        <div
                            style={{
                                fontSize: "30px",
                                fontFamily: "Georgia, serif",
                            }}
                        >
                            {activeRecords.length}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({
                      icon,
                      title,
                      value,
                      subtitle,
                  }) {
    return (
        <div
            style={{
                padding: "25px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.045)",
                border:
                    "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(15px)",
            }}
        >
            <div
                style={{
                    fontSize: "25px",
                    marginBottom: "18px",
                }}
            >
                {icon}
            </div>

            <div
                style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "12px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                }}
            >
                {title}
            </div>

            <div
                style={{
                    fontSize: "38px",
                    fontFamily: "Georgia, serif",
                    margin: "7px 0",
                }}
            >
                {value}
            </div>

            <div
                style={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: "12px",
                }}
            >
                {subtitle}
            </div>
        </div>
    );
}

function StatusRow({ label, value, total }) {
    const percentage =
        total > 0
            ? Math.round((value / total) * 100)
            : 0;

    return (
        <div style={{ marginBottom: "24px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    fontSize: "13px",
                }}
            >
                <span>{label}</span>

                <span
                    style={{
                        color: "rgba(255,255,255,0.45)",
                    }}
                >
          {value} ({percentage}%)
        </span>
            </div>

            <div
                style={{
                    height: "6px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.08)",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: `${percentage}%`,
                        height: "100%",
                        borderRadius: "10px",
                        background:
                            "linear-gradient(90deg, #7a5520, #d6a84f)",
                    }}
                />
            </div>
        </div>
    );
}

export default Dashboard;