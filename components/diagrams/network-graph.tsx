"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Node {
  id: string
  label: string
  x: number
  y: number
  radius: number
  color: string
}

interface Edge {
  source: string
  target: string
  label?: string
}

export function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Define nodes and edges
  const nodes: Node[] = [
    { id: "symptom", label: "Symptom Parser", x: 200, y: 150, radius: 40, color: "#0ea5e9" },
    { id: "biomarker", label: "Biomarker Translator", x: 400, y: 100, radius: 40, color: "#0ea5e9" },
    { id: "retrieval", label: "Trial Retriever", x: 600, y: 150, radius: 40, color: "#0ea5e9" },
    { id: "matcher", label: "Criteria Matcher", x: 600, y: 300, radius: 40, color: "#0ea5e9" },
    { id: "ranker", label: "Trial Ranker", x: 400, y: 350, radius: 40, color: "#0ea5e9" },
    { id: "audit", label: "Audit Logger", x: 200, y: 300, radius: 40, color: "#0ea5e9" },
  ]

  const edges: Edge[] = [
    { source: "symptom", target: "biomarker", label: "extracts" },
    { source: "biomarker", target: "retrieval", label: "queries" },
    { source: "retrieval", target: "matcher", label: "provides" },
    { source: "matcher", target: "ranker", label: "scores" },
    { source: "ranker", target: "audit", label: "logs" },
    { source: "audit", target: "symptom", label: "verifies" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Scale coordinates to fit canvas
    const scaleX = canvas.width / 800
    const scaleY = canvas.height / 500

    // Draw edges
    edges.forEach((edge) => {
      const source = nodes.find((n) => n.id === edge.source)
      const target = nodes.find((n) => n.id === edge.target)

      if (source && target) {
        ctx.beginPath()
        ctx.moveTo(source.x * scaleX, source.y * scaleY)
        ctx.lineTo(target.x * scaleX, target.y * scaleY)
        ctx.strokeStyle = isDark ? "#475569" : "#cbd5e1"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw edge label
        if (edge.label) {
          const midX = ((source.x + target.x) / 2) * scaleX
          const midY = ((source.y + target.y) / 2) * scaleY

          ctx.fillStyle = isDark ? "#e2e8f0" : "#334155"
          ctx.font = "12px sans-serif"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(edge.label, midX, midY)
        }
      }
    })

    // Draw nodes
    nodes.forEach((node) => {
      ctx.beginPath()
      ctx.arc(node.x * scaleX, node.y * scaleY, node.radius * scaleX, 0, Math.PI * 2)
      ctx.fillStyle = `${node.color}${isDark ? "30" : "20"}`
      ctx.fill()
      ctx.strokeStyle = node.color
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw node label
      ctx.fillStyle = isDark ? "#e2e8f0" : "#334155"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.label, node.x * scaleX, node.y * scaleY)
    })

    // Draw hovered node info
    if (hoveredNode) {
      ctx.fillStyle = isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(248, 250, 252, 0.8)"
      ctx.strokeStyle = isDark ? "#475569" : "#cbd5e1"
      ctx.lineWidth = 1

      const infoX = 20
      const infoY = 20
      const infoWidth = 200
      const infoHeight = 80

      ctx.beginPath()
      ctx.roundRect(infoX, infoY, infoWidth, infoHeight, 8)
      ctx.fill()
      ctx.stroke()

      ctx.fillStyle = isDark ? "#e2e8f0" : "#334155"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "top"
      ctx.fillText(hoveredNode.label, infoX + 10, infoY + 10)

      ctx.font = "12px sans-serif"
      ctx.fillText("Function: Process and transform data", infoX + 10, infoY + 35)
      ctx.fillText("Status: Active", infoX + 10, infoY + 55)
    }
  }, [nodes, edges, hoveredNode, isDark])

  // Handle mouse move to detect hover
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Scale coordinates to match canvas
    const scaleX = canvas.width / 800
    const scaleY = canvas.height / 500

    // Check if mouse is over any node
    const hovered = nodes.find((node) => {
      const nodeX = node.x * scaleX
      const nodeY = node.y * scaleY
      const nodeRadius = node.radius * scaleX

      return Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2) <= nodeRadius
    })

    setHoveredNode(hovered || null)
  }

  return (
    <div className="w-full h-[500px] rounded-lg border">
      <canvas ref={canvasRef} className="w-full h-full" onMouseMove={handleMouseMove} />
    </div>
  )
}
