import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

function Book({
                  position,
                  size = [0.3, 1, 0.5],
                  color = "#8B4513",
                  rotation = [0, 0, 0],
              }) {
    const group = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (!group.current) return;

        const target = hovered ? 1.08 : 1;

        group.current.scale.x +=
            (target - group.current.scale.x) * 0.12;

        group.current.scale.y +=
            (target - group.current.scale.y) * 0.12;

        group.current.scale.z +=
            (target - group.current.scale.z) * 0.12;
    });

    return (
        <group
            ref={group}
            position={position}
            rotation={rotation}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            {/* Cover */}
            <mesh castShadow>
                <boxGeometry args={size} />
                <meshStandardMaterial
                    color={hovered ? "#d6a84f" : color}
                    roughness={0.45}
                />
            </mesh>

            {/* Page block */}
            <mesh position={[0.025, 0, 0]}>
                <boxGeometry
                    args={[
                        size[0] * 0.72,
                        size[1] * 0.88,
                        size[2] * 0.94,
                    ]}
                />

                <meshStandardMaterial
                    color="#d9d0b8"
                    roughness={0.9}
                />
            </mesh>

            {/* Spine */}
            <mesh
                position={[
                    -size[0] / 2 - 0.025,
                    0,
                    0,
                ]}
                castShadow
            >
                <boxGeometry
                    args={[
                        0.045,
                        size[1] * 0.92,
                        size[2],
                    ]}
                />

                <meshStandardMaterial
                    color={hovered ? "#e7bd68" : color}
                    roughness={0.4}
                />
            </mesh>

            {/* Small golden title strip */}
            <mesh
                position={[
                    -size[0] / 2 - 0.05,
                    size[1] * 0.12,
                    0,
                ]}
            >
                <boxGeometry
                    args={[
                        0.012,
                        size[1] * 0.05,
                        size[2] * 0.65,
                    ]}
                />

                <meshStandardMaterial
                    color="#d6a84f"
                    emissive="#d6a84f"
                    emissiveIntensity={hovered ? 1 : 0.2}
                />
            </mesh>
        </group>
    );
}

export default Book;