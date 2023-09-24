import { Sky } from "@react-three/drei";

const View = () => {
    return (
        <>
            <fog attach="fog" args={['white', 0, 500]} />
            <Sky sunPosition={[100, 10, 100]} distance={1000} />
            <color attach="background" args={['skyblue']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 0]} intensity={1} />
        </>
    )
};

export default View;