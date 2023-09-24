import { RigidBody } from "@react-three/rapier";
import { Plane } from "@react-three/drei";
import { CollisionGroups } from "@/app/App";

const Road = () => {
    return (
        <RigidBody
            name='Road'
            type="fixed"
            collisionGroups={CollisionGroups.default}
        >
            <Plane
                position={[0, 0, 0]}
                args={[100, 100]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <meshStandardMaterial color="#808080" />
            </Plane>
        </RigidBody>
    );
}

export default Road;