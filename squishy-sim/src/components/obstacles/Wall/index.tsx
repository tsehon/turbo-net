import { RigidBody } from "@react-three/rapier";

type WallProps = {
    length: number,
    position: [number, number, number]
}

// make each an instanced mesh


/*
import { InstancedRigidBodies, RapierRigidBody } from "@react-three/rapier";

const COUNT = 1000;

const Scene = () => {
    const rigidBodies = useRef<RapierRigidBody[]>(null);

    useEffect(() => {
        if (!rigidBodies.current) {
            return;
        }

        // You can access individual instanced by their index
        rigidBodies.current[40].applyImpulse({ x: 0, y: 10, z: 0 }, true);
        rigidBodies.current.at(100).applyImpulse({ x: 0, y: 10, z: 0 }, true);

        // Or update all instances
        rigidBodies.current.forEach((api) => {
            api.applyImpulse({ x: 0, y: 10, z: 0 }, true);
        });
    }, []);

    // We can set the initial positions, and rotations, and scales, of
    // the instances by providing an array of InstancedRigidBodyProps
    // which is the same as RigidBodyProps, but with an additional "key" prop.
    const instances = useMemo(() => {
        const instances: InstancedRigidBodyProps[] = [];

        for (let i = 0; i < COUNT; i++) {
            instances.push({
                key: "instance_" + Math.random(),
                position: [Math.random() * 10, Math.random() * 10, Math.random() * 10],
                rotation: [Math.random(), Math.random(), Math.random()]
            });
        }

        return instances;
    }, []);

    return (
        <InstancedRigidBodies
            ref={rigidBodies}
            instances={instances}
            colliders="ball"
        >
            <instancedMesh args={[undefined, undefined, COUNT]} count={COUNT} />
        </InstancedRigidBodies>
    );
};
*/

const Wall = ({
    length,
    position
}: WallProps) => {
    return (
        <RigidBody
            position={position}
            colliders="cuboid"
            type="fixed"
        >
            <mesh>
                <boxBufferGeometry args={[length, 1, 1]} />
                <meshStandardMaterial color="red" />
            </mesh>
        </RigidBody>
    )
}

export default Wall;