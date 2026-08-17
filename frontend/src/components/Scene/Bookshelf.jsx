import { useMemo } from "react";
import Book from "./Book";

function Bookshelf({
                       position = [0, 0, 0],
                       rotation = [0, 0, 0],
                   }) {
    const books = useMemo(() => {
        const colors = [
            "#7A1F1F",
            "#183A59",
            "#315C3A",
            "#5A3478",
            "#9A632B",
            "#243B53",
            "#6B2D3A",
            "#51402A",
        ];

        const result = [];

        for (let shelf = 0; shelf < 4; shelf++) {
            for (let i = 0; i < 10; i++) {
                result.push({
                    shelf,
                    index: i,
                    height: 0.85 + Math.random() * 0.45,
                    width: 0.25 + Math.random() * 0.12,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    tilt: (Math.random() - 0.5) * 0.06,
                });
            }
        }

        return result;
    }, []);

    return (
        <group position={position} rotation={rotation}>

            {/* Back of bookshelf */}
            <mesh position={[0, 3, 0]}>
                <boxGeometry args={[6.5, 6.5, 0.5]} />
                <meshStandardMaterial
                    color="#24160D"
                    roughness={0.8}
                />
            </mesh>

            {/* Left side */}
            <mesh position={[-3.15, 3, 0.4]} castShadow>
                <boxGeometry args={[0.45, 6.8, 0.9]} />
                <meshStandardMaterial color="#4A2B18" />
            </mesh>

            {/* Right side */}
            <mesh position={[3.15, 3, 0.4]} castShadow>
                <boxGeometry args={[0.45, 6.8, 0.9]} />
                <meshStandardMaterial color="#4A2B18" />
            </mesh>

            {/* Top */}
            <mesh position={[0, 6.45, 0.4]} castShadow>
                <boxGeometry args={[7, 0.5, 0.9]} />
                <meshStandardMaterial color="#59351E" />
            </mesh>

            {/* Bottom */}
            <mesh position={[0, -0.15, 0.4]} castShadow>
                <boxGeometry args={[7, 0.6, 0.9]} />
                <meshStandardMaterial color="#59351E" />
            </mesh>

            {/* Shelves */}
            {[0, 1, 2, 3, 4].map((shelf) => (
                <mesh
                    key={shelf}
                    position={[0, 0.25 + shelf * 1.35, 0.45]}
                    castShadow
                >
                    <boxGeometry args={[6, 0.18, 0.8]} />
                    <meshStandardMaterial color="#613A20" />
                </mesh>
            ))}

            {/* Books */}
            {books.map((book) => (
                <Book
                    key={`${book.shelf}-${book.index}`}
                    position={[
                        -2.65 + book.index * 0.55,
                        0.5 + book.shelf * 1.35,
                        0.9,
                    ]}
                    size={[
                        book.width,
                        book.height,
                        0.5,
                    ]}
                    color={book.color}
                    rotation={[0, 0, book.tilt]}
                />
            ))}

        </group>
    );
}

export default Bookshelf;