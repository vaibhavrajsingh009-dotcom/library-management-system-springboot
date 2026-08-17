import { useMemo } from "react";
import * as THREE from "three";

function Particles() {
    const count = 500;

    const positions = useMemo(() => {
        const array = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            array[i * 3] = (Math.random() - 0.5) * 25;
            array[i * 3 + 1] = Math.random() * 10;
            array[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }

        return array;
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>

            <pointsMaterial
                size={0.035}
                color="#f5d7a1"
                transparent
                opacity={0.65}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default Particles;