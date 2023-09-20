Training a self-driving RC car with a mix of simulation and real-world data. 

Simulation:
- 
Car:
- https://towardsdatascience.com/deeppicar-part-1-102e03c83f2c

TestSet: Sim + Real World
Validation: Sim + Real World
Test: Real World

Method:
End to End Neural Net
One Feature is isSimulation
isSimulation affects every feature in the next layer

Training:
Static Track
or Procedurally generated fixed-length track

Validation:
Separate track

Testing:
Set of procedurally generated tracks

- procedural generation done by neural net to find edge cases?

Cameras:
- One PerspectiveCamera for spectating performance
- ArrayCamera for viewing what the model sees (sensors placed on car)

Components:
- Stoplight mesh
- Person (Tesla Bot)
    - maybe also do learning for this
- 

Configurator:
Configure the architecture of the NN 

Todo:
- next.js:
    - basics
- three.js basics
    - fullscreen, resizing
    - geometries
    - debug ui
    - textures
    - materials
    - 3d text
    - go live
- techniques
    - lights
    - shadows
- advanced
    - physics
    - environment map
    - code structuring

Dependencies (not actually, but might find useful later):
- @react-three/drei – useful helpers, this is an eco system in itself
- @react-three/postprocessing – post-processing effects
- @react-three/test-renderer – for unit tests in node
- @react-three/flex – flexbox for react-three-fiber
- @react-three/rapier – 3D physics using Rapier
- @react-three/gpu-pathtracer – realistic path tracing
- valtio – proxy based state management
- framer-motion-3d – framer motion, a popular animation library
- leva – create GUI controls in seconds
- maath – a kitchen sink for math helpers
- miniplex – ECS (entity management system)
- composer-suite – composing shaders, particles, effects and game mechanics


After:
- could turn it into a multiplayer platform like snake.io
    - models uploaded by players compete