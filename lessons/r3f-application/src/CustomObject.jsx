import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
export default function CustomObject() {
  const verticesCount = 10 * 3; // Create 10 vertices and multiply by 3 for x,y,z

  const geometryRef = useRef();
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = Math.random() - 0.5; // Random value from -0.5 to 0.5 and multiply by 3 to create bigger area...
    }

    return positions;
  }, []);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);
  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  );
}
