'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  Award,
  AlertCircle,
  CheckCircle2
} from 'lucide-react'
import ProfilePicture from './ProfilePicture'

interface LoginGatewayProps {
  onLogin: (email: string, password: string) => Promise<boolean>
  onSignup?: (email: string, password: string, name: string) => Promise<boolean>
}

export default function LoginGateway({ onLogin, onSignup }: LoginGatewayProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      if (isLogin) {
        const result = await onLogin(email, password)
        if (!result) {
          setError('Invalid email or password')
        } else {
          setSuccess('Login successful!')
        }
      } else if (onSignup) {
        if (!name.trim()) {
          setError('Please enter your name')
          setIsLoading(false)
          return
        }
        const result = await onSignup(email, password, name)
        if (!result) {
          setError('Signup failed. Email may already be in use.')
        } else {
          setSuccess('Account created successfully!')
          setTimeout(() => {
            setIsLogin(true)
            setSuccess('')
          }, 2000)
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-4">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            RICS Pathway Platform
          </h1>
          <p className="text-gray-400">Your comprehensive journey to RICS qualification</p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
          {/* Tabs */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => {
                setIsLogin(true)
                setError('')
                setSuccess('')
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                isLogin
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setError('')
                setSuccess('')
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                !isLogin
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-700 text-gray-400 hover:bg-slate-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Profile Picture for Sign Up */}
          {!isLogin && (
            <div className="flex justify-center mb-6">
              <ProfilePicture size="lg" editable={false} />
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 pl-11 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
                    required={!isLogin}
                  />
                  <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 pl-11 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pl-11 pr-11 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{success}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{isLogin ? 'Logging in...' : 'Creating account...'}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>{isLogin ? 'Login' : 'Create Account'}</span>
                </>
              )}
            </button>
          </form>

          {/* Additional Options */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            {isLogin && (
              <div className="text-center space-y-2">
                <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
                  Forgot password?
                </a>
              </div>
            )}
            {isLogin && (
              <p className="text-center text-sm text-gray-400 mt-4">
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-purple-400 hover:text-purple-300 font-semibold"
                >
                  Sign up
                </button>
              </p>
            )}
            {!isLogin && (
              <p className="text-center text-sm text-gray-400 mt-4">
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-purple-400 hover:text-purple-300 font-semibold"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Demo Account Info */}
        <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
          <p className="text-xs text-gray-400 text-center">
            Demo: Use any email and password to login. Data is stored locally.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

