import { useCallback, useEffect, useState, useRef, MutableRefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'

type CarProps = {
}

const Car = ({
}: CarProps) => {
    const { gl: rendererContext, size } = useThree();
    const rawGLContext = rendererContext.getContext();

    const ref = useRef<Mesh | null>(null);
    const [direction, setDirection] = useState<Vector3>(new Vector3(0, 0, 0));

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        if (ref.current) {
            // update direction
            setDirection(new Vector3(direction.x + delta, direction.y + delta, direction.z + delta));
            // update position
            //ref.current.position.addScaledVector(direction, delta);
            // update rotation
            ref.current.rotation.setFromVector3(direction);
        }
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
        <mesh ref={ref}>
            <boxGeometry args={[2, 2, 2]} />
            <meshBasicMaterial color="red" />
        </mesh>
    )
}

export default Car