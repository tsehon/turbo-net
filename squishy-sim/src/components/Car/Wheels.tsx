import { RefObject, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
    RigidBody,
    RapierRigidBody,
    useRevoluteJoint,
    Vector3Tuple,
} from "@react-three/rapier";
import { Cylinder, useKeyboardControls } from '@react-three/drei'
import { CollisionGroups, Controls } from '@/app/App'
import { Vector3 } from "three";

const SIZE = 0.5;
const SPEED = 0.5;

const Wheel = ({
    position,
    chassisRef,
    front = false,
}: {
    position: Vector3Tuple;
    chassisRef: RefObject<RapierRigidBody>;
    front?: boolean;
}) => {
    const wheelRef = useRef<RapierRigidBody>(null);
    const _joint = useRevoluteJoint(chassisRef, wheelRef, [
        position,
        [0, 0, 0], // wheel anchor
        [-1, 0, 0], // axis of rotation 
    ]);

    const forwardPressed = useKeyboardControls<Controls>(state => state.forward)
    const backPressed = useKeyboardControls<Controls>(state => state.back)
    const leftPressed = useKeyboardControls<Controls>(state => state.left)
    const rightPressed = useKeyboardControls<Controls>(state => state.right)

    useFrame(() => {
        if (!wheelRef.current || !front) return;
        if (forwardPressed) {
            const torqueImpulse = new Vector3(-SPEED, 0, 0)
            wheelRef.current.applyTorqueImpulse(torqueImpulse, true);
        }
        if (backPressed) {
            const torqueImpulse = new Vector3(SPEED, 0, 0)
            wheelRef.current.applyTorqueImpulse(torqueImpulse, true);
        }
        if (leftPressed) {
            // turn left
        }
        if (rightPressed) {
            //joint.current.configureMotorVelocity(-SPEED, -SPEED / 100);
        }
    });

    return (
        <RigidBody
            position={position}
            colliders="hull"
            type="dynamic"
            ref={wheelRef}
            collisionGroups={CollisionGroups.car}
        >
            <Cylinder
                rotation={[0, 0, Math.PI / 2]}
                args={[SIZE, SIZE, SIZE / 2, 32]}
                castShadow
                receiveShadow
            >
                <meshStandardMaterial color={"black"} />
            </Cylinder>
        </RigidBody>
    );
};

export default Wheel;