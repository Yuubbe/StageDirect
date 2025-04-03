"use client"

import { motion } from "framer-motion"



interface LogoProps {
  className?: string
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="40"
        viewBox="0 0 300 80"
        className="text-primary dark:text-primary"
      >
        {/* Fond transparent */}
        <rect width="300" height="80" fill="none" />

        {/* Icone stylisée d'une flèche */}
        <g>
          <polygon points="10,40 30,30 30,50" fill="currentColor" />
          <path d="M30,40 H270" stroke="currentColor" strokeWidth="4" />
        </g>

        {/* Texte du logo */}
        <text
          x="50"
          y="55"
          fontFamily="Arial, sans-serif"
          fontSize="32"
          fontWeight="bold"
          fill="currentColor"
          className="text-foreground dark:text-foreground"
        >
          StageDirect
        </text>
      </svg>
    </motion.div>
  )
  
}

