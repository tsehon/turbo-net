import { useMemo, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { KeyboardControls, KeyboardControlsEntry, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import Car from '../components/Car/Car'
import View from '../components/view'
import { Road } from '../components/obstacles'

import './styles.scss'
import HUD from '@/components/HUD/HUD'

type AppCanvasProps = {
    children: React.ReactNode
}

const MODE = 'dev' // 'prod' | 'dev'
const GRAVITY = -9.81
// this can be sped up to speed up training
const TIMESTEP = 1 / 60

// collision groups
export enum CollisionGroups {
    default = 0b0000_0000_0000_0001_0000_0000_0000_0011,
    car = 0b0000_0000_0000_0010_0000_0000_0000_0001,
}
// controls
export enum Controls {
    forward = 'forward',
    back = 'back',
    left = 'left',
    right = 'right',
    jump = 'jump',
}

const App = ({
    children
}: AppCanvasProps) => {
    const controlMap = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
        { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
        { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
        { name: Controls.jump, keys: ['Space'] },
    ], [])

    return (
        <KeyboardControls map={controlMap}>
            <Canvas
                id='app-canvas'
                frameloop='always'
                camera={{ position: [0, 0, 10], fov: 70 }}
            >
                <View />
                <Suspense>
                    <Physics
                        debug={MODE === 'dev'}
                        gravity={[0, GRAVITY, 0]}
                        timeStep={TIMESTEP}
                    // updateLoop="independent" // on-demand physics updates 
                    >
                        <Car />
                        <Road />
                        {children}
                    </Physics>
                </Suspense>
                <OrbitControls />
                {MODE === 'dev' && <Perf position="top-left" />}
            </Canvas >
            <HUD />
        </KeyboardControls>
    )
}

export default App