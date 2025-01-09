import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Pochette({ textureURL, ...props }) {
  const { nodes, materials } = useGLTF('/models/pochette.glb');
  
  const [texture, setTexture] = useState(null);
  const [backTexture, setBackTexture] = useState(null);

  useEffect(() => {
    if (textureURL) {
      const timeout = setTimeout(() => {
        const newTexture = new THREE.CanvasTexture(textureURL);
        newTexture.wrapS = newTexture.wrapT = THREE.ClampToEdgeWrapping;
        newTexture.flipY = false;
        newTexture.minFilter = THREE.LinearFilter;
        newTexture.magFilter = THREE.LinearFilter;
        newTexture.needsUpdate = true;
        setTexture(newTexture); 
      }, 2000);  

      return () => clearTimeout(timeout); 
    }
  }, [textureURL]);


  return (

<group {...props} dispose={null}>
      <group position={[-0.563, 0, -0.358]} rotation={[-Math.PI / 2, 0, 0.594]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-0.103, 1.045, 0.58]}>
            <group position={[-0.001, 0, 1.105]} rotation={[0, -0.598, -Math.PI / 2]}>
              <mesh geometry={nodes.Object_10.geometry} material={materials['Translucent.001']} />
              <mesh geometry={nodes.Object_11.geometry} material={materials['Cover.001']} />
            </group>
            <mesh geometry={nodes.Object_4.geometry} material={materials['Rough_Plastic.001']} />
            <mesh geometry={nodes.Object_5.geometry} material={materials['Translucent.001']} />
            <mesh geometry={nodes.Object_6.geometry} material={materials['White.001']} />
            <mesh geometry={nodes.Object_7.geometry} material={materials['Material.001']} />
            <mesh geometry={nodes.Object_8.geometry} material={materials['FileBase.001']} />
          </group>
        </group>
      </group>
      <group position={[-0.563, 0, -0.358]} rotation={[-Math.PI / 2, 0, 0.594]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-0.103, 1.045, 0.58]}>
            <mesh geometry={nodes.Object_11001.geometry} material={materials['Cover.002']} position={[-0.001, 0, 1.105]} rotation={[0, -0.598, -Math.PI / 2]} />
          </group>
        </group>
      </group>
      <mesh geometry={nodes.Plane.geometry} material={materials['Material.004']} position={[0.355, 1.04, -0.041]} rotation={[1.572, -0.001, -1.561]}>
      {texture && (
          <meshStandardMaterial attach="material" map={texture} side={THREE.DoubleSide}/>
        )}

      </mesh>
      <mesh geometry={nodes.Plane001.geometry} material={materials['Material.005']} position={[-0.422, 1.04, 0.136]} rotation={[1.571, -0.001, -2.169]} />
    </group>
  );
}

useGLTF.preload('/models/pochette.glb');

export default Pochette;
