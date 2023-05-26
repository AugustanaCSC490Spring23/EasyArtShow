import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useRef } from 'react'
import { MeshReflectorMaterial, OrbitControls, SpotLight, useDepthBuffer} from '@react-three/drei'
import { Physics, usePlane } from '@react-three/cannon'
import { Cursor } from './helpers/Drag'
import { Guy } from './Guy'
import { Mug, Chair, Table, Lamp } from './Furniture'

export default function ThreeDView() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [-40, 40, 40], fov: 25, near: 1, far: 100 }}>
      <directionalLight castShadow position={[2.5, 8, 5]} intensity={1.5} shadow-mapSize={1024}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
      </directionalLight>
      <pointLight position={[-10, 0, -20]} color="white" intensity={1} />
      <pointLight position={[0, -10, 0]} intensity={1} />

      <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
        <Light position={[0, 13, 0]} color="#FF7B00" />
        <Cursor />
        <Guy rotation={[-Math.PI / 3, 0, 0]} />
        <Floor position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        <Chair position={[0, 0, -2.52]} />
        <Table position={[8, 0, 0]} />
        <Mug position={[8, 3, 0]} />
        <Lamp position={[0, 15, 0]} />
        <OrbitControls />
      </Physics>
    </Canvas>
  )
}

function Floor(props) {
  const [ref] = usePlane(() => ({ type: 'Static', ...props }));
  
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <shadowMaterial receiveShadow transparent opacity={0.4} 
        blur={[400, 400]}
        resolution={1024}
        mixBlur={1}
        mixStrength={3}
        depthScale={1}
        minDepthThreshold={0.85}
        metalness={0}
        roughness={1}
      />
    </mesh>
  )
}

function Light({ vec = new Vector3(), ...props }) {
  const light = useRef();
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    light.current.target.updateMatrixWorld()
  })

  return <SpotLight castShadow ref={light} penumbra={2} distance={50} angle={5} attenuation={20} anglePower={4} intensity={2} {...props}/>
}