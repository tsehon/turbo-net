import { useCallback, useEffect, useRef, createRef } from 'react'
import { Vector3 } from 'three'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { RigidBody, RapierRigidBody, quat, vec3, Vector3Tuple } from '@react-three/rapier'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Wheel from '@/components/Car/Wheels'
import { CollisionGroups } from '@/app/App'

type CarProps = {
}

const FORWARD = new Vector3(0, 0, -1);
const WHEEL_POSITIONS: Record<string, Vector3Tuple> = {
    frontLeft: [-0.9, 0.4, -1.95],
    frontRight: [0.9, 0.4, -1.95],
    backLeft: [-0.9, 0.4, 1.75],
    backRight: [0.9, 0.4, 1.75],
}

const Car = ({
}: CarProps) => {
    const { gl: rendererContext, size, camera } = useThree();
    const rawGLContext = rendererContext.getContext();

    const model = useLoader(GLTFLoader, '/models/car.glb');
    model.scene.rotation.y = Math.PI;
    const chassisRef = useRef<RapierRigidBody>(null);

    const updateCameraPosition = useCallback(() => {
        if (!chassisRef.current) return;
        const quaternion = quat(chassisRef.current.rotation());
        const worldForward = FORWARD.clone().applyQuaternion(quaternion).normalize();

        const carPos = vec3(chassisRef.current.translation());
        const cameraX = carPos.x + worldForward.x * -7.5;
        const cameraZ = carPos.z + worldForward.z * -7.5;

        camera.position.set(cameraX, 3, cameraZ);
        camera.lookAt(carPos.x, 3, carPos.z);
    }, []);

    useFrame((_state, _delta) => {
        updateCameraPosition();
    });

    const getImageData = useCallback(() => {
        const { width, height } = size;
        console.log("width:", width, "height:", height)
        const buffer = new Uint8Array(width * height * 4);

        // store image data in RGBA format in buffer
        rawGLContext.readPixels(0, 0, width, height,
            rawGLContext.RGBA, rawGLContext.UNSIGNED_BYTE, buffer);
        console.log("pixels:", buffer)
    }, [rawGLContext]);

    useEffect(() => {
        getImageData()
    }, [getImageData])

    return (
        <group>
            <RigidBody
                name='Chassis'
                type='dynamic'
                ref={chassisRef}
                colliders="hull"
                position={[0, 0.5, 0]}
                collisionGroups={CollisionGroups.car}
                onCollisionEnter={(payload) => {
                    const { manifold, other } = payload;
                    if (other.rigidBodyObject?.name !== 'Road') {
                        console.log(
                            "Car collided at world position ",
                            manifold.solverContactPoint(0),
                            " with ",
                            other.rigidBodyObject?.name
                        );
                    }
                }}
                onContactForce={(payload) => {
                    //console.log(`The total force generated was: ${payload.totalForce}`);
                }}
            >
                <primitive object={model.scene} />
            </RigidBody>
            <Wheel position={WHEEL_POSITIONS.frontLeft} chassisRef={chassisRef} front />
            <Wheel position={WHEEL_POSITIONS.frontRight} chassisRef={chassisRef} front />
            <Wheel position={WHEEL_POSITIONS.backLeft} chassisRef={chassisRef} />
            <Wheel position={WHEEL_POSITIONS.backRight} chassisRef={chassisRef} />
        </group>
    )
}

export default Car