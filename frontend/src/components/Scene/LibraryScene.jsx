
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Environment,
    Float,
} from "@react-three/drei";

import Bookshelf from "./Bookshelf";
import Floor from "./Floor";
import Lighting from "./Lighting";
import Particles from "../Effects/Particles";
import Navbar from "../UI/Navbar";
import Hero from "../UI/Hero";
import StatsPanel from "../UI/StatsPanel";


// ===============================
// WALL
// ===============================
function Wall({ position, rotation = [0, 0, 0], scale }) {
    return (
        <mesh
            position={position}
            rotation={rotation}
            scale={scale}
            castShadow
            receiveShadow
        >
            <boxGeometry args={[1, 1, 0.35]} />
            <meshStandardMaterial
                color="#24170f"
                roughness={0.8}
            />
        </mesh>
    );
}


// ===============================
// WINDOW
// ===============================
function Window({ position }) {
    return (
        <group position={position}>
            {/* Frame */}
            <mesh castShadow>
                <boxGeometry args={[4.2, 4.5, 0.25]} />
                <meshStandardMaterial color="#3a2415" />
            </mesh>

            {/* Glass */}
            <mesh position={[0, 0, 0.18]}>
                <boxGeometry args={[3.6, 3.9, 0.08]} />
                <meshStandardMaterial
                    color="#172330"
                    roughness={0.15}
                    metalness={0.1}
                    emissive="#111827"
                    emissiveIntensity={0.25}
                />
            </mesh>

            {/* Vertical frame */}
            <mesh position={[0, 0, 0.28]}>
                <boxGeometry args={[0.16, 4, 0.12]} />
                <meshStandardMaterial color="#5a3920" />
            </mesh>

            {/* Horizontal frame */}
            <mesh position={[0, 0, 0.28]}>
                <boxGeometry args={[3.7, 0.16, 0.12]} />
                <meshStandardMaterial color="#5a3920" />
            </mesh>

            {/* Window glow */}
            <pointLight
                position={[0, 0, 1]}
                intensity={4}
                distance={10}
            />
        </group>
    );
}


// ===============================
// TABLE
// ===============================
function ReadingTable({ position }) {
    return (
        <group position={position}>
            {/* Table-top */}
            <mesh
                position={[0, 1.25, 0]}
                castShadow
                receiveShadow
            >
                <boxGeometry args={[4.8, 0.25, 2.2]} />
                <meshStandardMaterial
                    color="#4a2b18"
                    roughness={0.65}
                />
            </mesh>

            {/* Table legs */}
            {[
                [-2, 0.6, -0.75],
                [2, 0.6, -0.75],
                [-2, 0.6, 0.75],
                [2, 0.6, 0.75],
            ].map((pos, index) => (
                <mesh
                    key={index}
                    position={pos}
                    castShadow
                >
                    <cylinderGeometry
                        args={[0.13, 0.16, 1.2, 12]}
                    />
                    <meshStandardMaterial color="#2b190f" />
                </mesh>
            ))}

            {/* Books on table */}
            <mesh
                position={[-0.6, 1.48, 0]}
                rotation={[0, 0.1, 0]}
                castShadow
            >
                <boxGeometry args={[1.1, 0.18, 0.75]} />
                <meshStandardMaterial color="#7b3826" />
            </mesh>

            <mesh
                position={[0.5, 1.48, 0.1]}
                rotation={[0, -0.2, 0]}
                castShadow
            >
                <boxGeometry args={[0.9, 0.16, 0.65]} />
                <meshStandardMaterial color="#263d55" />
            </mesh>

            {/* Small lamp */}
            <mesh position={[0, 2, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.7, 12]} />
                <meshStandardMaterial color="#222" />
            </mesh>

            <mesh position={[0, 2.38, 0]}>
                <coneGeometry args={[0.38, 0.35, 24]} />
                <meshStandardMaterial
                    color="#c39a4a"
                    emissive="#c39a4a"
                    emissiveIntensity={0.4}
                />
            </mesh>

            <pointLight
                position={[0, 2.2, 0]}
                intensity={2}
                distance={5}
            />
        </group>
    );
}


// ===============================
// CHAIR
// ===============================
function Chair({ position, rotation = [0, 0, 0] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Seat */}
            <mesh
                position={[0, 0.75, 0]}
                castShadow
            >
                <boxGeometry args={[1.15, 0.18, 1.05]} />
                <meshStandardMaterial color="#5a321e" />
            </mesh>

            {/* Back */}
            <mesh
                position={[0, 1.45, 0.43]}
                castShadow
            >
                <boxGeometry args={[1.15, 1.35, 0.15]} />
                <meshStandardMaterial color="#472716" />
            </mesh>

            {/* Legs */}
            {[
                [-0.43, 0.35, -0.35],
                [0.43, 0.35, -0.35],
                [-0.43, 0.35, 0.35],
                [0.43, 0.35, 0.35],
            ].map((pos, index) => (
                <mesh key={index} position={pos}>
                    <cylinderGeometry
                        args={[0.06, 0.07, 0.7, 10]}
                    />
                    <meshStandardMaterial color="#29170e" />
                </mesh>
            ))}
        </group>
    );
}


// ===============================
// RUG
// ===============================
function Rug({ position }) {
    return (
        <mesh
            position={position}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
        >
            <boxGeometry args={[8, 5, 0.05]} />
            <meshStandardMaterial
                color="#321a16"
                roughness={1}
            />
        </mesh>
    );
}


// ===============================
// CEILING LAMP
// ===============================
function CeilingLamp({ position }) {
    return (
        <group position={position}>
            <mesh castShadow>
                <cylinderGeometry
                    args={[0.08, 0.08, 1.2, 12]}
                />
                <meshStandardMaterial color="#161616" />
            </mesh>

            <mesh position={[0, -0.7, 0]} castShadow>
                <sphereGeometry args={[0.3, 20, 20]} />
                <meshStandardMaterial
                    color="#d6a84f"
                    emissive="#d6a84f"
                    emissiveIntensity={1}
                />
            </mesh>

            <pointLight
                position={[0, -0.7, 0]}
                intensity={4}
                distance={8}
                castShadow
            />
        </group>
    );
}


// ===============================
// PLANT
// ===============================
function Plant({ position }) {
    return (
        <group position={position}>
            {/* Pot */}
            <mesh position={[0, 0.45, 0]} castShadow>
                <cylinderGeometry args={[0.45, 0.35, 0.8, 20]} />
                <meshStandardMaterial color="#4a2819" />
            </mesh>

            {/* Stem */}
            <mesh position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.07, 0.09, 1.8, 10]} />
                <meshStandardMaterial color="#263b20" />
            </mesh>

            {/* Leaves */}
            {[
                [0.35, 1.8, 0],
                [-0.35, 1.7, 0],
                [0, 2.1, 0.25],
                [0, 2.25, -0.25],
            ].map((pos, index) => (
                <mesh
                    key={index}
                    position={pos}
                    rotation={[
                        0.3,
                        index * 1.3,
                        0.4,
                    ]}
                >
                    <sphereGeometry args={[0.3, 12, 12]} />
                    <meshStandardMaterial color="#31552d" />
                </mesh>
            ))}
        </group>
    );
}


// ===============================
// MAIN LIBRARY SCENE
// ===============================
function LibraryScene({ setPage }) {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                background: "#050505",
                overflow: "hidden",
            }}
        >
            <Navbar setPage={setPage} />

            <Hero />

            <StatsPanel />

            <Canvas
                shadows
                camera={{
                    position: [11, 7, 16],
                    fov: 48,
                }}
            >
                {/* ================= LIGHTING ================= */}
                <Lighting />

                <Environment preset="night" />

                {/* ================= FLOOR ================= */}
                <Floor />

                {/* ================= BACK WALL ================= */}
                <Wall
                    position={[0, 4, -8]}
                    scale={[18, 8, 1]}
                />

                {/* ================= SIDE WALLS ================= */}
                <Wall
                    position={[-9, 4, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    scale={[16, 8, 1]}
                />

                <Wall
                    position={[9, 4, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    scale={[16, 8, 1]}
                />

                {/* ================= WINDOWS ================= */}
                <Window position={[-4, 4.5, -7.7]} />
                <Window position={[4, 4.5, -7.7]} />

                {/* ================= BOOKSHELVES ================= */}

                <Bookshelf
                    position={[-6.5, 0, -7.3]}
                    rotation={[0, 0, 0]}
                />

                <Bookshelf
                    position={[0, 0, -7.3]}
                    rotation={[0, 0, 0]}
                />

                <Bookshelf
                    position={[6.5, 0, -7.3]}
                    rotation={[0, 0, 0]}
                />

                {/* Side shelves */}

                <Bookshelf
                    position={[-8.2, 0, -2]}
                    rotation={[0, Math.PI / 2, 0]}
                />

                <Bookshelf
                    position={[-8.2, 0, 4]}
                    rotation={[0, Math.PI / 2, 0]}
                />

                <Bookshelf
                    position={[8.2, 0, -2]}
                    rotation={[0, -Math.PI / 2, 0]}
                />

                <Bookshelf
                    position={[8.2, 0, 4]}
                    rotation={[0, -Math.PI / 2, 0]}
                />

                {/* ================= READING AREA ================= */}

                <Rug position={[0, 0.04, 1]} />

                <Float
                    speed={0.4}
                    rotationIntensity={0.02}
                    floatIntensity={0.02}
                >
                    <ReadingTable position={[0, 0, 1]} />
                </Float>

                {/* Chairs around table */}

                <Chair
                    position={[0, 0, -0.7]}
                    rotation={[0, Math.PI, 0]}
                />

                <Chair
                    position={[0, 0, 2.7]}
                />

                <Chair
                    position={[-3, 0, 1]}
                    rotation={[0, Math.PI / 2, 0]}
                />

                <Chair
                    position={[3, 0, 1]}
                    rotation={[0, -Math.PI / 2, 0]}
                />

                {/* ================= PLANTS ================= */}

                <Plant position={[-7.2, 0, 6]} />

                <Plant position={[7.2, 0, 6]} />

                {/* ================= CEILING LIGHTS ================= */}

                <CeilingLamp position={[-5, 7, -1]} />

                <CeilingLamp position={[0, 7, -1]} />

                <CeilingLamp position={[5, 7, -1]} />

                {/* ================= PARTICLES ================= */}

                <Particles />

                {/* ================= CAMERA ================= */}

                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    minDistance={7}
                    maxDistance={25}
                    maxPolarAngle={Math.PI / 2.05}
                    target={[0, 2.5, -2]}
                />
            </Canvas>
        </div>
    );
}

export default LibraryScene;