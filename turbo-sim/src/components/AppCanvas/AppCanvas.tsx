import { Canvas } from '@react-three/fiber'
import Car from '../Car'
import HUD from '../HUD/HUD'

import './styles.scss'

type AppCanvasProps = {
    children: React.ReactNode
}

const AppCanvas = ({
    children
}: AppCanvasProps) => {
    return (
        <Canvas id='app-canvas' frameloop='always'>
            <HUD />
            <Car />
            {children}
        </Canvas>
    )
}

export default AppCanvas 