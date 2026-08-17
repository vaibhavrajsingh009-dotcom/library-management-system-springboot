jsx
import { useEffect, useState } from "react";

const API = "http://localhost:8080/api/books";

function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    const [form, setForm] = useState({
        title: "",
        author: "",
        isbn: "",
        totalCopies: 1,
        availableCopies: 1,
    });

    // Get all books
    const loadBooks = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(API);

            if (!response.ok) {
                throw new Error("Failed to load books");
            }

            const data = await response.json();
            setBooks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    // Form input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]:
                name === "totalCopies" || name === "availableCopies"
                    ? Number(value)
                    : value,
        });
    };

    // Add book
    const handleAddBook = async (e) => {
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
                throw new Error("Failed to add book");
            }

            setForm({
                title: "",
                author: "",
                isbn: "",
                totalCopies: 1,
                availableCopies: 1,
            });

            setShowForm(false);

            await loadBooks();
        } catch (err) {
            setError(err.message);
        }
    };

    // Update book
    const handleUpdateBook = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API}/${editingBook.id}`, {
method: "PUT",
    headers: {
    "Content-Type": "application/json",
},
body: JSON.stringify({
    title: form.title,
    author: form.author,
    isbn: form.isbn,
}),
});

if (!response.ok) {
    throw new Error("Failed to update book");
}

setEditingBook(null);

setForm({
    title: "",
    author: "",
    isbn: "",
    totalCopies: 1,
    availableCopies: 1,
});

setShowForm(false);

await loadBooks();
} catch (err) {
    setError(err.message);
}
};

// Delete book
const handleDelete = async (id) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this book?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`${API}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete book");
        }

        await loadBooks();
    } catch (err) {
        setError(err.message);
    }
};

// Start editing
const handleEdit = (book) => {
    setEditingBook(book);

    setForm({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        totalCopies: book.totalCopies,
        availableCopies: book.availableCopies,
    });

    setShowForm(true);
};

// Close form
const handleCloseForm = () => {
    setShowForm(false);
    setEditingBook(null);

    setForm({
        title: "",
        author: "",
        isbn: "",
        totalCopies: 1,
        availableCopies: 1,
    });
};

// Filter books
const filteredBooks = books.filter((book) => {
    const query = search.trim().toLowerCase();

    if (!query) {
        return true;
    }

    return (
        String(book.title || "")
            .toLowerCase()
            .includes(query) ||
        String(book.author || "")
            .toLowerCase()
            .includes(query) ||
        String(book.isbn || "")
            .toLowerCase()
            .includes(query)
    );
});

return (
    <div
        style={{
            minHeight: "100vh",
            background:
                "radial-gradient(circle at top right, #241b0f, #08080b 45%, #050506)",
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
                    LIBRARY COLLECTION
                </p>

                <h1
                    style={{
                        margin: 0,
                        fontFamily: "Georgia, serif",
                        fontSize: "48px",
                        fontWeight: "500",
                    }}
                >
                    Books
                </h1>

                <p
                    style={{
                        color: "rgba(255,255,255,0.5)",
                        marginTop: "12px",
                    }}
                >
                    Manage every book in your library.
                </p>
            </div>

            <button
                onClick={() => {
                    if (showForm) {
                        handleCloseForm();
                    } else {
                        setShowForm(true);
                    }
                }}
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
                {showForm ? "Close" : "+ Add Book"}
            </button>
        </div>

        {/* Search */}
        <div
            style={{
                marginBottom: "25px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 18px",
                borderRadius: "15px",
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(15px)",
            }}
        >
                <span
                    style={{
                        fontSize: "20px",
                        opacity: 0.6,
                    }}
                >
                    ⌕
                </span>

            <input
                type="text"
                placeholder="Search books by title, author or ISBN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "white",
                    fontSize: "14px",
                }}
            />
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

        {/* Add / Edit form */}
        {showForm && (
            <form
                onSubmit={
                    editingBook
                        ? handleUpdateBook
                        : handleAddBook
                }
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
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
                    name="title"
                    placeholder="Book title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />

                <input
                    name="author"
                    placeholder="Author"
                    value={form.author}
                    onChange={handleChange}
                    required
                />

                <input
                    name="isbn"
                    placeholder="ISBN"
                    value={form.isbn}
                    onChange={handleChange}
                    required
                />

                {!editingBook && (
                    <>
                        <input
                            name="totalCopies"
                            type="number"
                            min="1"
                            placeholder="Total copies"
                            value={form.totalCopies}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="availableCopies"
                            type="number"
                            min="0"
                            placeholder="Available copies"
                            value={form.availableCopies}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}

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
                    {editingBook
                        ? "Update Book"
                        : "Add Book"}
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
                Loading books...
            </div>
        )}

        {/* No books */}
        {!loading && books.length === 0 && (
            <div
                style={{
                    textAlign: "center",
                    padding: "70px",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <div style={{ fontSize: "40px" }}>
                    📚
                </div>

                <h2>No books yet</h2>

                <p
                    style={{
                        color: "rgba(255,255,255,0.45)",
                    }}
                >
                    Add your first book to the library.
                </p>
            </div>
        )}

        {/* No search results */}
        {!loading &&
            books.length > 0 &&
            filteredBooks.length === 0 && (
                <div
                    style={{
                        textAlign: "center",
                        padding: "70px",
                        borderRadius: "20px",
                        background:
                            "rgba(255,255,255,0.035)",
                        border:
                            "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    <div style={{ fontSize: "40px" }}>
                        🔎
                    </div>

                    <h2>No matching books</h2>

                    <p
                        style={{
                            color:
                                "rgba(255,255,255,0.45)",
                        }}
                    >
                        Try a different title, author or ISBN.
                    </p>
                </div>
            )}

        {/* Books */}
        {!loading && filteredBooks.length > 0 && (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "18px",
                }}
            >
                {filteredBooks.map((book) => (
                    <div
                        key={book.id}
                        style={{
                            padding: "24px",
                            borderRadius: "20px",
                            background:
                                "rgba(255,255,255,0.045)",
                            border:
                                "1px solid rgba(255,255,255,0.09)",
                            backdropFilter: "blur(15px)",
                        }}
                    >
                        <div
                            style={{
                                width: "46px",
                                height: "60px",
                                borderRadius: "5px",
                                background:
                                    "linear-gradient(135deg, #8b5a2b, #d6a84f)",
                                marginBottom: "20px",
                                boxShadow:
                                    "8px 8px 25px rgba(0,0,0,0.3)",
                            }}
                        />

                        <h2
                            style={{
                                fontFamily: "Georgia, serif",
                                margin: "0 0 8px",
                                fontSize: "21px",
                            }}
                        >
                            {book.title}
                        </h2>

                        <p
                            style={{
                                color: "#d6a84f",
                                margin: "0 0 8px",
                            }}
                        >
                            {book.author}
                        </p>

                        <p
                            style={{
                                color:
                                    "rgba(255,255,255,0.4)",
                                fontSize: "13px",
                            }}
                        >
                            ISBN: {book.isbn}
                        </p>

                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                marginTop: "20px",
                                paddingTop: "15px",
                                borderTop:
                                    "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                                <span>
                                    Total:{" "}
                                    <strong>
                                        {book.totalCopies}
                                    </strong>
                                </span>

                            <span
                                style={{
                                    color:
                                        book.availableCopies >
                                        0
                                            ? "#7ed69a"
                                            : "#ff8c8c",
                                }}
                            >
                                    Available:{" "}
                                {book.availableCopies}
                                </span>
                        </div>

                        {/* Edit */}
                        <button
                            onClick={() => handleEdit(book)}
                            style={{
                                width: "100%",
                                marginTop: "18px",
                                padding: "10px",
                                borderRadius: "10px",
                                border:
                                    "1px solid rgba(214,168,79,0.25)",
                                background:
                                    "rgba(214,168,79,0.08)",
                                color: "#e2b85f",
                                cursor: "pointer",
                            }}
                        >
                            Edit Book
                        </button>

                        {/* Delete */}
                        <button
                            onClick={() =>
                                handleDelete(book.id)
                            }
                            style={{
                                width: "100%",
                                marginTop: "10px",
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
                            Delete Book
                        </button>
                    </div>
                ))}
            </div>
        )}
    </div>
);
}

export default Books;

