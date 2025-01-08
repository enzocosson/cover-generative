/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/models/planet.glb 
Author: the9thearl (https://sketchfab.com/the9thearl)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/mars-free-low-poly-0781cd3ab59c4e6f94ae68d28fbf30a8
Title: Mars, Free, low-poly
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Planet(props) {
  const { nodes, materials } = useGLTF('/models/planet.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[-Math.PI, 0, 0]} scale={0.01}>
          <mesh geometry={nodes.LowpolyMars_lowpolymarsmat_0.geometry} material={materials.lowpolymarsmat} position={[0, 0, 100]} rotation={[0, 0, -Math.PI / 2]} scale={[5000, 5000.001, 5000]} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/planet.glb')

export default Planet;
