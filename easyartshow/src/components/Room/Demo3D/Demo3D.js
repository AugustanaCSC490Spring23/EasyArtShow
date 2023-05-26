import * as THREE from 'three';
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {Preload, Image as ImageImpl, OrbitControls, ScrollControls, Scroll, useScroll } from '@react-three/drei';

import React, {Suspense, useRef, useState, useCallback, useEffect} from "react";
import styled from "styled-components";
import "./Demo3D.css";



import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from "@react-three/fiber";

function Image(props) {
  const ref = useRef()
  const group = useRef()
  
  const data = useScroll()

  useFrame((state, delta) => {
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, Math.max(0, data.delta * 50), 4, delta)
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, Math.max(0, 1 - data.delta * 1000), 4, delta)
  })
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  )
}

function Page({ m = 0.4, urls, ...props }) {
  const { width } = useThree((state) => state.viewport)
  const w = width < 10 ? 1.5 / 4 : 1 / 4;
  const imageWidth = width * w - m * 2;
  const totalWidth = imageWidth * urls.length + m * (urls.length - 1);
  const startPosition = -totalWidth / 2 + imageWidth / 2;
  return (
    <group {...props}>
      {urls.map((url, index) => (
        <Image
          key={index}
          position={[
            startPosition + index * (imageWidth + m),
            0,
            index === urls.length - 1 ? 2 : 0,
          ]}
          scale={[imageWidth, 5, 1]}
          url={url}
        />
      ))}
    </group>
  )
}


function Pages() {
  const { width } = useThree((state) => state.viewport)
  return (
    <>
      <Page position={[-width * 1, 0, 0]} urls={['/trip1.jpeg', '/trip2.jpeg', '/trip3.jpeg']} />
      <Page position={[width * 0, 0, 0]} urls={['/img1.jpeg', '/img2.jpeg', '/img3.jpeg']} />
      <Page position={[width * 1, 0, 0]} urls={['/img4.jpeg', '/img5.jpeg', '/img6.jpeg']} />
      <Page position={[width * 2, 0, 0]} urls={['/trip1.jpeg', '/trip2.jpeg', '/trip3.jpeg']} />
      <Page position={[width * 3, 0, 0]} urls={['/img1.jpeg', '/img2.jpeg', '/img3.jpeg']} />
      <Page position={[width * 4, 0, 0]} urls={['/img4.jpeg', '/img5.jpeg', '/img6.jpeg']} />
    </>
  )
}


export default function Demo3D() {


  return (
   <div className = "wrapper">

    
    <Canvas gl ={{antialias: false}} dpr = {[1, 1.5]}>
      <OrbitControls
      enablePan = {false}
      enableZoom = {false}
      enableDamping
      dampingFactor={0.5}
      rotateSpeed = {1}
      maxPolarAngle = {Math.PI/2}
      minPolarAngle = {Math.PI/2}
      />

      <Suspense fallback = {null}>
        <ScrollControls infinite horizontal damping = {4} pages = {4} distance = {1}>
          <Scroll>
            <Pages/>
          </Scroll>
          <Scroll html>
            <h1 style = {{position: 'absolute', top: '20vh', left: '25vw'}}>gal</h1>
            <h1 style = {{position: 'absolute', top: '20vh', left: '125vw'}}>lery</h1>
            <h1 style = {{position: 'absolute', top: '20vh', left: '325vw'}}>gal</h1>
            <h1 style = {{position: 'absolute', top: '20vh', left: '425vw'}}>lery</h1>
          </Scroll> 
        </ScrollControls>
        <Preload/>
      </Suspense>
    </Canvas>
    </div>
  )
}
;
