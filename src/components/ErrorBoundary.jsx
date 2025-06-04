import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className='w-full h-full flex items-center justify-center text-secondary text-sm'>
            <p>3D content could not be loaded.</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
