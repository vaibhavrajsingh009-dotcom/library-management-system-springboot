import { useState } from "react";

function StatsPanel() {
    const [hovered, setHovered] = useState(null);

    const stats = [
        {
            value: "1,248",
            label: "BOOKS",
            icon: "📚",
        },
        {
            value: "864",
            label: "MEMBERS",
            icon: "👥",
        },
        {
            value: "126",
            label: "ISSUED",
            icon: "↗",
        },
    ];

    return (
        <div
            style={{
                position: "fixed",
                right: "5%",
                bottom: "42px",
                zIndex: 20,

                display: "flex",
                gap: "10px",

                padding: "10px",

                background: "rgba(8, 8, 11, 0.55)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",

                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",

                boxShadow:
                    "0 20px 60px rgba(0,0,0,0.35)",
            }}
        >
            {stats.map((stat, index) => {
                const active = hovered === index;

                return (
                    <div
                        key={stat.label}
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                            width: "125px",
                            padding: "16px",

                            borderRadius: "14px",

                            background: active
                                ? "rgba(214, 168, 79, 0.12)"
                                : "rgba(255,255,255,0.025)",

                            border: active
                                ? "1px solid rgba(214,168,79,0.25)"
                                : "1px solid transparent",

                            transform: active
                                ? "translateY(-4px)"
                                : "translateY(0)",

                            transition: "all 0.25s ease",

                            cursor: "default",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "12px",
                            }}
                        >
              <span
                  style={{
                      fontSize: "18px",
                      filter: active
                          ? "drop-shadow(0 0 8px rgba(214,168,79,0.7))"
                          : "none",
                  }}
              >
                {stat.icon}
              </span>

                            <span
                                style={{
                                    color: "#d6a84f",
                                    fontSize: "11px",
                                }}
                            >
                2026
              </span>
                        </div>

                        <div
                            style={{
                                color: "white",
                                fontSize: "24px",
                                fontWeight: "600",
                                letterSpacing: "-1px",
                            }}
                        >
                            {stat.value}
                        </div>

                        <div
                            style={{
                                marginTop: "5px",
                                color: "rgba(255,255,255,0.4)",
                                fontSize: "9px",
                                letterSpacing: "1.5px",
                            }}
                        >
                            {stat.label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default StatsPanel;