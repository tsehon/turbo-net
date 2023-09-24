'use client'

import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import AppCanvas from '@/app/App'

function root() {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      createRoot(root)?.render(
        <AppCanvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <directionalLight position={[0, 0, 10]} />
        </AppCanvas >
      )
    }
  }, [])

  return <div id="root" style={{ width: '100vw', height: '100vh' }}></div>;
}

export default root;