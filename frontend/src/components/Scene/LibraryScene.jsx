import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";

import Bookshelf from "./Bookshelf";
import Floor from "./Floor";
import Lighting from "./Lighting";
import Particles from "../Effects/Particles";
import Navbar from "../UI/Navbar";
import Hero from "../UI/Hero";
import StatsPanel from "../UI/StatsPanel";

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
                    position: [10, 7, 14],
                    fov: 50,
                }}
            >
                {/* Lighting */}
                <Lighting />

                {/* Environment */}
                <Environment preset="night" />

                {/* Floor */}
                <Floor />

                {/* Main bookshelf */}
                <Float
                    speed={0.5}
                    rotationIntensity={0.05}
                    floatIntensity={0.05}
                >
                    <Bookshelf position={[0, 0, -3]} />
                </Float>

                {/* Second bookshelf */}
                <Bookshelf position={[-7, 0, -6]} rotation={[0, 0.3, 0]} />

                {/* Third bookshelf */}
                <Bookshelf position={[7, 0, -6]} rotation={[0, -0.3, 0]} />

                {/* Floating particles */}
                <Particles />

                {/* Camera */}
                <OrbitControls
                    enableDamping
                    dampingFactor={0.05}
                    minDistance={6}
                    maxDistance={25}
                    maxPolarAngle={Math.PI / 2.05}
                />
            </Canvas>
        </div>
    );
}

export default LibraryScene;