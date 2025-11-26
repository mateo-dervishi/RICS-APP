'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { User, Camera, X, Check } from 'lucide-react'

interface ProfilePictureProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  editable?: boolean
  onImageChange?: (imageUrl: string) => void
  initialImage?: string | null
}

export default function ProfilePicture({ 
  size = 'md', 
  editable = true,
  onImageChange,
  initialImage 
}: ProfilePictureProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImage || null)
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  }

  const handleImageClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImageUrl(result)
        setIsEditing(true)
        if (onImageChange) {
          onImageChange(result)
        }
        // Save to localStorage
        localStorage.setItem('profile-picture', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageUrl(null)
    setIsEditing(false)
    if (onImageChange) {
      onImageChange('')
    }
    localStorage.removeItem('profile-picture')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleConfirm = () => {
    setIsEditing(false)
  }

  // Load from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('profile-picture')
    if (saved && !initialImage) {
      setImageUrl(saved)
    }
  }, [initialImage])

  return (
    <div className="relative inline-block">
      <motion.div
        className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-slate-700 relative group`}
        onMouseEnter={() => editable && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleImageClick}
        whileHover={editable ? { scale: 1.05 } : {}}
        whileTap={editable ? { scale: 0.95 } : {}}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <User className={`${size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : size === 'xl' ? 'w-20 h-20' : 'w-12 h-12'} text-white`} />
        )}

        {/* Overlay on hover */}
        {editable && isHovered && !isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
          >
            <Camera className="w-6 h-6 text-white" />
          </motion.div>
        )}

        {/* Editing controls */}
        {isEditing && editable && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center space-x-2"
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleConfirm()
              }}
              className="p-2 bg-green-600 hover:bg-green-700 rounded-lg"
            >
              <Check className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRemoveImage()
              }}
              className="p-2 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </motion.div>
        )}
      </motion.div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

