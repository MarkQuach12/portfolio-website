import { useRef, useEffect, useState, useCallback } from 'react'

const technologies = [
  // Languages
  { name: 'Python', color: '#3776AB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Java', color: '#ED8B00', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C', color: '#A8B9CC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'PostgreSQL', color: '#4169E1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', color: '#4479A1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', color: '#47A248', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Firebase', color: '#FFCA28', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Bash', color: '#4EAA25', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
  // Frameworks
  { name: 'React', color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', color: '#339933', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Flask', color: '#ffffff', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
  { name: 'FastAPI', color: '#009688', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'Gherkin', color: '#23D96C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cucumber/cucumber-plain.svg' },
  { name: 'JUnit', color: '#25A162', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/junit/junit-original.svg' },
  { name: 'Pytest', color: '#0A9EDC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytest/pytest-original.svg' },
  { name: 'Jest', color: '#C21325', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg' },
  { name: 'Material-UI', color: '#007FFF', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' },
  { name: 'ShadCN', color: '#ffffff', icon: '/icons/shadcn.svg' },
  { name: 'Spring Boot', color: '#6DB33F', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  // Tools & Cloud
  { name: 'Claude Code', color: '#D97757', icon: '/icons/claude.svg' },
  { name: 'MCP', color: '#D97757', icon: '/icons/mcp.svg' },
  { name: 'Cursor', color: '#00E5A0', icon: '/icons/cursor.svg' },
  { name: 'VS Code', color: '#007ACC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Git', color: '#F05032', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Docker', color: '#2496ED', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'GCP', color: '#4285F4', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'EC2', color: '#FF9900', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Lambda', color: '#FF9900', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'S3', color: '#569A31', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'EventBridge', color: '#FF4F8B', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
]

// Preload icon images
const iconImages = {}
function preloadIcons() {
  technologies.forEach((tech) => {
    if (tech.icon) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = tech.icon
      iconImages[tech.name] = img
    }
  })
}
preloadIcons()

// Distribute points evenly on a sphere using fibonacci spiral
function fibonacciSphere(count) {
  const points = []
  const goldenRatio = (1 + Math.sqrt(5)) / 2
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
    points.push({
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.sin(phi) * Math.sin(theta),
      z: Math.cos(phi),
    })
  }
  return points
}

export default function Skills() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const animationRef = useRef(null)
  const rotationRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0.0025 })
  const isDraggingRef = useRef(false)
  const lastMouseRef = useRef({ x: 0, y: 0 })
  const pointsRef = useRef(fibonacciSphere(technologies.length))
  const [hoveredIndex, setHoveredIndex] = useState(-1)

  const drawSphere = useCallback((ctx, width, height, rotation) => {
    const cx = width / 2
    const cy = height / 2
    const radius = Math.min(width, height) * 0.35

    ctx.clearRect(0, 0, width, height)

    const cosX = Math.cos(rotation.x)
    const sinX = Math.sin(rotation.x)
    const cosY = Math.cos(rotation.y)
    const sinY = Math.sin(rotation.y)

    // Fixed tilt so we see the globe from above at an angle (like Earth's axial tilt)
    const tilt = -0.209 // ~12 degrees forward tilt
    const cosTilt = Math.cos(tilt)
    const sinTilt = Math.sin(tilt)

    function rotatePoint(p) {
      // Spin around Y axis (the horizontal auto-rotation)
      let x1 = p.x * cosY - p.z * sinY
      let z1 = p.x * sinY + p.z * cosY
      // Keep Y as-is (poles stay top/bottom)
      let y1 = p.y

      // Apply fixed tilt on X axis so we look down at the globe
      let y2 = y1 * cosTilt - z1 * sinTilt
      let z2 = y1 * sinTilt + z1 * cosTilt
      return { x: x1, y: y2, z: z2 }
    }

    // Draw wireframe sphere
    const wireframeColor = 'rgba(255, 140, 0, 0.12)'
    ctx.strokeStyle = wireframeColor
    ctx.lineWidth = 0.5

    // Longitude lines
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      ctx.beginPath()
      for (let j = 0; j <= 40; j++) {
        const phi = (j / 40) * Math.PI
        const p = rotatePoint({
          x: Math.sin(phi) * Math.cos(angle),
          y: Math.cos(phi),
          z: Math.sin(phi) * Math.sin(angle),
        })
        const sx = cx + p.x * radius
        const sy = cy + p.y * radius
        if (j === 0) ctx.moveTo(sx, sy)
        else ctx.lineTo(sx, sy)
      }
      ctx.stroke()
    }

    // Latitude lines
    for (let i = 1; i < 8; i++) {
      const phi = (i / 8) * Math.PI
      ctx.beginPath()
      for (let j = 0; j <= 40; j++) {
        const theta = (j / 40) * Math.PI * 2
        const p = rotatePoint({
          x: Math.sin(phi) * Math.cos(theta),
          y: Math.cos(phi),
          z: Math.sin(phi) * Math.sin(theta),
        })
        const sx = cx + p.x * radius
        const sy = cy + p.y * radius
        if (j === 0) ctx.moveTo(sx, sy)
        else ctx.lineTo(sx, sy)
      }
      ctx.stroke()
    }

    // Draw connecting lines between nearby nodes
    const projected = pointsRef.current.map((p, i) => {
      const rp = rotatePoint(p)
      return {
        x: cx + rp.x * radius,
        y: cy + rp.y * radius,
        z: rp.z,
        index: i,
      }
    })

    ctx.strokeStyle = 'rgba(255, 140, 0, 0.06)'
    ctx.lineWidth = 0.5
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].x - projected[j].x
        const dy = projected[i].y - projected[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < radius * 0.6) {
          ctx.beginPath()
          ctx.moveTo(projected[i].x, projected[i].y)
          ctx.lineTo(projected[j].x, projected[j].y)
          ctx.stroke()
        }
      }
    }

    // Sort by z for proper layering (back to front)
    projected.sort((a, b) => a.z - b.z)

    // Draw technology icons + labels — only front-facing, fade near edges
    projected.forEach(({ x, y, z, index }) => {
      // z ranges from -1 (back) to 1 (front). Hide anything behind the sphere.
      if (z < 0) return

      const tech = technologies[index]
      const opacity = Math.max(0, Math.min(1, z * 1.5)) // fade as z approaches 0
      const fontSize = Math.max(10, 14 * (0.6 + z * 0.4))
      const isHovered = index === hoveredIndex
      const iconSize = Math.max(18, 32 * (0.6 + z * 0.4)) * (isHovered ? 1.3 : 1)

      // Draw icon
      const img = iconImages[tech.name]
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.globalAlpha = opacity
        ctx.drawImage(img, x - iconSize / 2, y - iconSize / 2, iconSize, iconSize)
        ctx.globalAlpha = 1
      } else {
        // Fallback dot if no icon
        if (opacity > 0.4) {
          ctx.shadowColor = tech.color
          ctx.shadowBlur = isHovered ? 20 : 8 * opacity
        }
        ctx.beginPath()
        ctx.arc(x, y, isHovered ? 6 : 4 * opacity, 0, Math.PI * 2)
        ctx.fillStyle = tech.color + Math.round(opacity * 204).toString(16).padStart(2, '0')
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Draw label below icon
      ctx.font = `${isHovered ? 'bold ' : ''}${fontSize}px 'JetBrains Mono', monospace`
      ctx.textAlign = 'center'
      ctx.fillStyle = isHovered
        ? tech.color
        : `rgba(224, 224, 232, ${opacity})`
      ctx.fillText(tech.name, x, y + iconSize / 2 + fontSize + 4)

      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0
    })

    return projected
  }, [hoveredIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    let projectedPoints = []

    function resize() {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    function animate() {
      const rect = container.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      if (!isDraggingRef.current) {
        rotationRef.current.x += velocityRef.current.x
        rotationRef.current.y += velocityRef.current.y
      }

      const dpr = window.devicePixelRatio || 1
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      projectedPoints = drawSphere(ctx, width, height, rotationRef.current)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Mouse interaction
    function onMouseDown(e) {
      isDraggingRef.current = true
      lastMouseRef.current = { x: e.clientX, y: e.clientY }
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top

      // Check hover
      let closest = -1
      let closestDist = 30
      for (const p of projectedPoints) {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < closestDist) {
          closestDist = dist
          closest = p.index
        }
      }
      setHoveredIndex(closest)
      canvas.style.cursor = closest >= 0 ? 'pointer' : 'grab'

      if (isDraggingRef.current) {
        const dx = e.clientX - lastMouseRef.current.x
        const dy = e.clientY - lastMouseRef.current.y
        rotationRef.current.y -= dx * 0.005
        velocityRef.current = { x: 0, y: dx * 0.0002 }
        lastMouseRef.current = { x: e.clientX, y: e.clientY }
        canvas.style.cursor = 'grabbing'
      }
    }

    function onMouseUp() {
      isDraggingRef.current = false
      velocityRef.current = { x: 0, y: 0.0025 }
    }

    function onMouseLeave() {
      isDraggingRef.current = false
      velocityRef.current = { x: 0, y: 0.0025 }
      setHoveredIndex(-1)
    }

    // Touch interaction
    function onTouchStart(e) {
      isDraggingRef.current = true
      const t = e.touches[0]
      lastMouseRef.current = { x: t.clientX, y: t.clientY }
    }

    function onTouchMove(e) {
      if (!isDraggingRef.current) return
      e.preventDefault()
      const t = e.touches[0]
      const dx = t.clientX - lastMouseRef.current.x
      const dy = t.clientY - lastMouseRef.current.y
      rotationRef.current.y -= dx * 0.005
      velocityRef.current = { x: 0, y: dx * 0.0002 }
      lastMouseRef.current = { x: t.clientX, y: t.clientY }
    }

    function onTouchEnd() {
      isDraggingRef.current = false
      velocityRef.current = { x: 0, y: 0.0025 }
    }

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
    }
  }, [drawSphere])

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-terminal-cyan text-sm mb-2 tracking-wider">
            <span className="text-text-muted">#</span> Skills.json
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Tech Stack
          </h2>
        </div>

        <div
          ref={containerRef}
          className="relative w-full aspect-square max-w-2xl mx-auto"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab"
          />
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-text-muted text-xs">
            drag to rotate
          </p>
        </div>
      </div>
    </section>
  )
}
