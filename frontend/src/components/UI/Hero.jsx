import { useState } from "react";

function Hero() {
    const [hovered, setHovered] = useState(false);

    return (
        <section
            style={{
                position: "fixed",
                left: "7%",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                maxWidth: "620px",
                color: "white",
                pointerEvents: "none",
            }}
        >
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "20px",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    background: "rgba(214, 168, 79, 0.1)",
                    border: "1px solid rgba(214, 168, 79, 0.25)",
                    color: "#d6a84f",
                    fontSize: "11px",
                    fontWeight: "600",
                    letterSpacing: "2px",
                }}
            >
        <span
            style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#d6a84f",
                boxShadow: "0 0 12px #d6a84f",
            }}
        />

                DIGITAL LIBRARY
            </div>

            <h1
                style={{
                    margin: 0,
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(52px, 7vw, 94px)",
                    lineHeight: "0.95",
                    fontWeight: "500",
                    letterSpacing: "-4px",
                }}
            >
                Enter the
                <br />

                <span
                    style={{
                        color: "#d6a84f",
                        textShadow:
                            "0 0 40px rgba(214, 168, 79, 0.2)",
                    }}
                >
          Archive.
        </span>
            </h1>

            <p
                style={{
                    marginTop: "28px",
                    marginBottom: "30px",
                    maxWidth: "480px",
                    color: "rgba(255,255,255,0.58)",
                    fontSize: "16px",
                    lineHeight: "1.8",
                    letterSpacing: "0.3px",
                }}
            >
                Discover a world of knowledge where every book
                opens a new possibility. Explore, learn and
                manage your library in an entirely new way.
            </p>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    pointerEvents: "auto",
                }}
            >
                <button
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        padding: "15px 24px",
                        border: "none",
                        borderRadius: "14px",
                        cursor: "pointer",

                        background: hovered
                            ? "#e7bd68"
                            : "#d6a84f",

                        color: "#080706",
                        fontSize: "13px",
                        fontWeight: "700",
                        letterSpacing: "0.5px",

                        boxShadow: hovered
                            ? "0 15px 45px rgba(214,168,79,0.35)"
                            : "0 10px 30px rgba(214,168,79,0.18)",

                        transform: hovered
                            ? "translateY(-2px)"
                            : "translateY(0)",

                        transition: "all 0.25s ease",
                    }}
                >
                    Explore Library →
                </button>

                <span
                    style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "12px",
                    }}
                >
          Scroll to explore
        </span>
            </div>
        </section>
    );
}

export default Hero;