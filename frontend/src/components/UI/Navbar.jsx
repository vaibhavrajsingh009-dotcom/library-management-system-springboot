function Navbar({ setPage }) {
    const links = [
        { name: "Home", page: "home" },
        { name: "Books", page: "books" },
        { name: "Members", page: "members" },
        { name: "Borrow", page: "borrow" },
        { name: "Dashboard", page: "dashboard" },
    ];

    return (
        <nav
            style={{
                position: "fixed",
                top: "24px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(1100px, calc(100% - 40px))",
                height: "70px",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 28px",
                boxSizing: "border-box",

                background: "rgba(10, 10, 14, 0.62)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "22px",

                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",

                boxShadow:
                    "0 20px 60px rgba(0, 0, 0, 0.35)",
            }}
        >
            {/* Logo */}
            <button
                onClick={() => setPage("home")}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "#ffffff",
                    fontFamily: "Georgia, serif",
                    fontSize: "20px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                <div
                    style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "12px",
                        display: "grid",
                        placeItems: "center",
                        background:
                            "linear-gradient(135deg, #d6a84f, #7a5520)",
                        boxShadow:
                            "0 8px 25px rgba(214, 168, 79, 0.25)",
                        fontSize: "18px",
                    }}
                >
                    ✦
                </div>

                <span>ARCHIVE</span>
            </button>

            {/* Navigation */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                }}
            >
                {links.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => setPage(link.page)}
                        style={{
                            border: "none",
                            outline: "none",
                            cursor: "pointer",

                            padding: "11px 16px",
                            borderRadius: "12px",

                            background:
                                link.page === "home"
                                    ? "rgba(214, 168, 79, 0.14)"
                                    : "transparent",

                            color:
                                link.page === "home"
                                    ? "#e2b85f"
                                    : "rgba(255,255,255,0.65)",

                            fontSize: "13px",
                            fontWeight: "500",
                            letterSpacing: "0.4px",

                            transition: "all 0.25s ease",
                        }}
                    >
                        {link.name}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "9px 13px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.045)",
                    border:
                        "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <span style={{ opacity: 0.6 }}>⌕</span>

                <input
                    placeholder="Search..."
                    style={{
                        width: "100px",
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        color: "white",
                        fontSize: "12px",
                    }}
                />
            </div>

            {/* Profile */}
            <button
                style={{
                    border:
                        "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "white",
                    borderRadius: "50%",
                    width: "42px",
                    height: "42px",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                👤
            </button>
        </nav>
    );
}

export default Navbar;