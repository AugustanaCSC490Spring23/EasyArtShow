import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const ThreeDView = () => {
  const galleryRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    // Add your initial artwork
    addArtwork('https://firebasestorage.googleapis.com/v0/b/easyartshow-2dbd2.appspot.com/o/easyartshow%2Frooms%2FVG4NgJ%2Fimages%2F1684851615805-IMG_4485.jpg?alt=media&token=10085de0-de98-4015-9161-107fb0538e35');
  }, []);

  const addArtwork = (imageUrl) => {
    // Load image texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(imageUrl);

    // Create frame geometry
    const frameGeometry = new THREE.BoxGeometry(5, 5, 0.2);

    // Create frame material
    const frameMaterial = new THREE.MeshBasicMaterial({ map: texture });

    // Create frame mesh
    const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);

    // Position the frame (customize as needed)
    frameMesh.position.set(0, 0, -10);

    // Add frame to the scene
    galleryRef.current.add(frameMesh);
  };

  const handleScroll = () => {
    // Check if user has scrolled to the bottom of the page
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight
    ) {
      // User has reached the bottom, add more artwork
      addArtwork('https://example.com/another-image.jpg');
    }
  };

  useEffect(() => {
    // Listen to scroll event
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame(() => {
    // Rotate or update any animations for your artwork here
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <div>
      <h1>My Art Gallery</h1>
      <Canvas
        camera={{ position: [0, 0, 10] }}
        style={{ height: '100vh', width: '100vw' }}
      >
        <scene ref={galleryRef} />
        <perspectiveCamera ref={cameraRef} />
      </Canvas>
    </div>
  );
};

export default ThreeDView;
