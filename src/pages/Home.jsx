import React, { useState, useEffect } from 'react';
import { Canvas,useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './Home.css';
import Typewriter from 'typewriter-effect';

const Model = ({ lightPosition }) => {
  const { scene } = useGLTF('office_desk/scene.gltf');
  
  useEffect(() => {
    if (scene) {
      scene.rotation.y = Math.PI / 3;
      scene.rotation.z = Math.PI / 10;
      scene.scale.set(4, 4, 4);

      const boundingBox = new THREE.Box3().setFromObject(scene);
      const size = boundingBox.getSize(new THREE.Vector3());
      const offsetX = size.x / 2;
      const offsetY = -size.y / 2;
      const offsetZ = 0;

      scene.position.set(offsetX, offsetY, offsetZ);
    }
  }, [scene]);
  useFrame((state, delta) => {
   if (scene) {
      const boundingBox = new THREE.Box3().setFromObject(scene);
      const size = boundingBox.getSize(new THREE.Vector3());
     scene.position.y =-size.y / 2+ Math.sin(state.clock.elapsedTime) * 0.2; 
   }
 });
  return (
    <group>
      {scene && <primitive object={scene} />}
      <pointLight position={lightPosition} intensity={50} color="white" distance={20} angle={Math.PI / 6} penumbra={0.2} />
    </group>
  );
};

const Home = () => {
  const [lightPosition, setLightPosition] = useState([0, 0, 10]); 
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  
  const handleScroll=()=>{
   window.scrollTo({
      top: 600,
      behavior: 'smooth'
    });}

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      setLightPosition([
        (mouseX / window.innerWidth) * 20 - 10,
        -(mouseY / window.innerHeight) * 20 + 10,
        10,
      ]);
      setCursorPos({ x: mouseX, y: mouseY });
    };

    document.body.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); 

  return (
   <div className='home2'>
    <div className='home'>
      <Canvas
        camera={{ position: [0, 2, 15], fov: 45, near: 0.1, far: 200 }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
      >
        <Model lightPosition={lightPosition} />
        <OrbitControls />
      </Canvas>
      <div className='overlay-content'>
      <div class="wrapper">
  <div class="bg"> <Typewriter
            options={{
              strings: ['MeetNote'],
              autoStart: true,
              loop: true,
            }}
          /> </div>
  <div class="fg"> <Typewriter
            options={{
              strings: ['MeetNote'],
              autoStart: true,
              loop: true,
            }}
          /> </div>
</div>
        <p>Effortlessly generate detailed Minutes of Meeting and comprehensive summaries from your uploaded audio files with MeetNote, streamlining your meeting documentation process.</p>
        <div className='file_upload'>
          <div className='text_btn' onClick={handleScroll}>Get Started</div>
        </div>
      </div>
      
      <div className="cursor" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />
    </div>
    </div>
  );
};

export default Home;
