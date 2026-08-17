function Lighting() {
    return (
        <>
            {/* Very soft global light */}
            <ambientLight intensity={0.18} />

            {/* Main warm ceiling light */}
            <spotLight
                position={[0, 10, 2]}
                intensity={140}
                angle={0.7}
                penumbra={1}
                distance={30}
                color="#ffd7a0"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            {/* Warm light behind the center shelf */}
            <pointLight
                position={[0, 4, -5]}
                intensity={55}
                distance={12}
                color="#ffb866"
            />

            {/* Blue ambient light from the left */}
            <pointLight
                position={[-8, 4, 3]}
                intensity={35}
                distance={18}
                color="#718cff"
            />

            {/* Warm ambient light from the right */}
            <pointLight
                position={[8, 4, 2]}
                intensity={40}
                distance={18}
                color="#ff9966"
            />

            {/* Small lights near the floor */}
            <pointLight
                position={[-4, 0.5, -1]}
                intensity={15}
                distance={8}
                color="#d6a84f"
            />

            <pointLight
                position={[4, 0.5, -1]}
                intensity={15}
                distance={8}
                color="#d6a84f"
            />
        </>
    );
}

export default Lighting;