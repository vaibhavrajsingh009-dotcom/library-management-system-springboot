function Floor() {
    return (
        <group>
            {/* Main floor */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.45, 0]}
                receiveShadow
            >
                <planeGeometry args={[50, 50]} />

                <meshStandardMaterial
                    color="#0b0b0e"
                    roughness={0.65}
                    metalness={0.2}
                />
            </mesh>

            {/* Subtle floor grid - horizontal lines */}
            {[-15, -10, -5, 0, 5, 10, 15].map((z) => (
                <mesh
                    key={`horizontal-${z}`}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -0.44, z]}
                >
                    <planeGeometry args={[30, 0.015]} />

                    <meshBasicMaterial
                        color="#25252b"
                        transparent
                        opacity={0.5}
                    />
                </mesh>
            ))}

            {/* Subtle floor grid - vertical lines */}
            {[-15, -10, -5, 0, 5, 10, 15].map((x) => (
                <mesh
                    key={`vertical-${x}`}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[x, -0.44, 0]}
                >
                    <planeGeometry args={[0.015, 30]} />

                    <meshBasicMaterial
                        color="#25252b"
                        transparent
                        opacity={0.5}
                    />
                </mesh>
            ))}
        </group>
    );
}

export default Floor;