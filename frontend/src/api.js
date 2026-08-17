const API = "http://localhost:8080/api";

export async function getBooks() {
    const res = await fetch(`${API}/books`);
    return res.json();
}

export async function borrowBook(bookId, memberId) {
    const res = await fetch(`${API}/borrow/${bookId}/member/${memberId}`, { method: "POST" });
    if (!res.ok) throw new Error("Borrow failed");
    return res.json();
}

export async function getMembers() {
    const res = await fetch(`${API}/members`);
    return res.json();
}