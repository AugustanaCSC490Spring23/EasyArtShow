import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  Image as ImageImpl,
  ScrollControls,
  Scroll,
  useScroll,
  Html,
  useProgress,
} from "@react-three/drei";

function Image(props) {
  const ref = useRef();
  const group = useRef();
  const data = useScroll();
  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(
      group.current.position.z,
      Math.max(0, data.delta * 50),
      4,
      delta
    );
    ref.current.material.grayscale = THREE.MathUtils.damp(
      ref.current.material.grayscale,
      Math.max(0, 1 - data.delta * 1000),
      4,
      delta
    );
  });
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  );
}

function Page({ m = 0.4, urls, ...props }) {
  const { width } = useThree((state) => state.viewport);
  const w = width < 10 ? 1.5 / 3 : 1 / 3;
  return (
    <group {...props}>
      <Image
        position={[-width * w, 0, -1]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[0]}
      />
      <Image
        position={[0, 0, 0]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[1]}
      />
      <Image
        position={[width * w, 0, 1]}
        scale={[width * w - m * 2, 5, 1]}
        url={urls[2]}
      />
    </group>
  );
}

function Pages() {
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      <Page
        position={[-width * 1, 0, 0]}
        urls={["image4.jpeg", "/image5.jpeg", "/image6.jpeg"]}
      />
      <Page
        position={[width * 0, 0, 0]}
        urls={["/image7.jpeg", "/image8.jpeg", "/image9.jpeg"]}
      />
      <Page
        position={[width * 1, 0, 0]}
        urls={["/image10.jpeg", "/image11.jpeg", "/image12.jpeg"]}
      />
      <Page
        position={[width * 2, 0, 0]}
        urls={["/image1.jpeg", "/image2.jpeg", "/image3.jpeg"]}
      />
      <Page
        position={[width * 3, 0, 0]}
        urls={["image13.jpeg", "/image14.jpeg", "/image15.jpeg"]}
      />

      <Page
        position={[width * 4, 0, 0]}
        urls={["image4.jpeg", "/image5.jpeg", "/image6.jpeg"]}
      />
      <Page
        position={[width * 5, 0, 0]}
        urls={["/image7.jpeg", "/image8.jpeg", "/image9.jpeg"]}
      />
      <Page
        position={[width * 6, 0, 0]}
        urls={["/image10.jpeg", "/image11.jpeg", "/image12.jpeg"]}
      />
      <Page
        position={[width * 7, 0, 0]}
        urls={["/image1.jpeg", "/image2.jpeg", "/image3.jpeg"]}
      />
      <Page
        position={[width * 8, 0, 0]}
        urls={["image13.jpeg", "/image14.jpeg", "/image15.jpeg"]}
      />
    </>
  );
}

function Loader() {
  const progress = useProgress((state) => state.progress);
  if (progress !== 100) {
    return (
      <Html center wrapperClass="loader-div">
        {progress.toFixed()}% loaded
      </Html>
    );
  }

  return null;
}

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function ThreeDView() {
  return (
    <>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Loader />
        <Suspense fallback={null}>
          <ScrollControls
            infinite
            horizontal
            damping={4}
            pages={6}
            distance={1}
          >
            <Scroll>
              <Pages />
            </Scroll>
            <Scroll html>
              {/* <h1 style={{ position: "absolute", top: "20vh", left: "-75vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "25vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "125vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "225vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "325vw" }}></h1>

              <h1 style={{ position: "absolute", top: "20vh", left: "425vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "525vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "625vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "725vw" }}></h1>
              <h1 style={{ position: "absolute", top: "20vh", left: "825vw" }}></h1> */}
            </Scroll>
          </ScrollControls>
          <Preload />
        </Suspense>
      </Canvas>
    </>
  );
}
