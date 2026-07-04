import React from 'react'

export default class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('3D model failed to load:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full flex items-center justify-center text-starlight/40 text-xs font-mono text-center p-4">
            Model failed to load
          </div>
        )
      )
    }
    return this.props.children
  }
}