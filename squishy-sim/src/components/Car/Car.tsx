import { useCallback, useEffect, useRef, createRef } from 'react'
import { Vector3 } from 'three'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { RigidBody, RapierRigidBody, quat, vec3, Vector3Tuple } from '@react-three/rapier'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Wheel from '@/components/Car/Wheels'
import { CollisionGroups } from '@/app/App'

type CarProps = {
}

export const SPEED = 10;
const FORWARD = new Vector3(0, 0, -1);
const WHEEL_POSITIONS: Record<string, Vector3Tuple> = {
    frontLeft: [-0.9, 0.45, -1.95],
    frontRight: [0.9, 0.45, -1.95],
    backLeft: [-0.9, 0.45, 1.75],
    backRight: [0.9, 0.45, 1.75],
}

const Car = ({
}: CarProps) => {
    const { gl: rendererContext, size, camera } = useThree();
    const rawGLContext = rendererContext.getContext();

    const model = useLoader(GLTFLoader, '/models/car.glb');
    // rotate the car
    model.scene.rotation.y = Math.PI;
    const chassisRef = useRef<RapierRigidBody>(null);

    const forwardPressed = useKeyboardControls<Controls>(state => state.forward)
    const backPressed = useKeyboardControls<Controls>(state => state.back)
    const leftPressed = useKeyboardControls<Controls>(state => state.left)
    const rightPressed = useKeyboardControls<Controls>(state => state.right)

    const handleMovement = useCallback(() => {
        if (!chassisRef.current) return;
        // Quaternion from your rigid body's rotation
        const quaternion = quat(chassisRef.current.rotation());
        // Convert local forward vector to world coordinates
        const worldForward = FORWARD.clone().applyQuaternion(quaternion).normalize();
        // Scale by SPEED
        worldForward.multiplyScalar(SPEED);

        if (forwardPressed) {
            chassisRef.current.applyImpulse(worldForward, true);
        }
        if (backPressed) {
            chassisRef.current.applyImpulse(worldForward.multiplyScalar(-1), true);
        }
        if (leftPressed) {
            chassisRef.current.applyTorqueImpulse({ x: 0, y: SPEED / 5, z: 0 }, true);
        }
        if (rightPressed) {
            chassisRef.current.applyTorqueImpulse({ x: 0, y: -SPEED / 5, z: 0 }, true);
        }
    }, [
        forwardPressed,
        backPressed,
        leftPressed,
        rightPressed,
    ])

    const updateCameraPosition = useCallback(() => {
        if (!chassisRef.current) return;
        const quaternion = quat(chassisRef.current.rotation());
        const worldForward = FORWARD.clone().applyQuaternion(quaternion).normalize();

        const carPos = vec3(chassisRef.current.translation());
        const cameraX = carPos.x + worldForward.x * -7.5;
        const cameraZ = carPos.z + worldForward.z * -7.5;

        camera.position.copy(new Vector3(cameraX, 3, cameraZ));
        camera.lookAt(carPos.x, 3, carPos.z);
    }, []);

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((_state, _delta) => {
        handleMovement();
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
            <Wheel position={WHEEL_POSITIONS.frontLeft} chassisRef={chassisRef} />
            <Wheel position={WHEEL_POSITIONS.frontRight} chassisRef={chassisRef} />
            <Wheel position={WHEEL_POSITIONS.backLeft} chassisRef={chassisRef} />
            <Wheel position={WHEEL_POSITIONS.backRight} chassisRef={chassisRef} />
        </group>
    )
}

export default Car