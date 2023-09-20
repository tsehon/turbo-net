import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import './styles.scss'

const HUD = () => {
    const { performance } = useThree();

    return (
        <Html fullscreen className="container">
            <div className="driver">
                turbo-net-v0
            </div>
            <div className="metrics">
                <div>
                    perf: {performance.current}
                </div>
                <div>
                    max: {performance.max}
                </div>
                <div>
                    min: {performance.min}
                </div>
            </div>
        </Html>
    )
}

export default HUD;