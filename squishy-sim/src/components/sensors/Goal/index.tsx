import { CuboidCollider, RigidBody } from "@react-three/rapier";

const Goal = () => {
    return (
        <RigidBody
            type="fixed"
            colliders={false}
        >
            <CuboidCollider
                args={[1, 1, 1]}
                sensor
                onIntersectionEnter={(payload) => {
                    const { other } = payload;
                    if (other.rigidBodyObject?.name === "Car") {
                        console.log("Destination Reached!")
                    }
                }}
            />
            <mesh>
                <boxBufferGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </RigidBody>
    )
}

export default Goal;