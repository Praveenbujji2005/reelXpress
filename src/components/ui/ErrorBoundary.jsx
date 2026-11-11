'use client';

import React from 'react';

/**
 * Global React Error Boundary
 *
 * Prevents a localized component crash or unhandled render error from unmounting
 * or breaking the entire website layout. Renders a graceful fallback while keeping
 * the rest of the application fully functional.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[reelXpress ErrorBoundary] Caught error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center bg-[#151215] text-white">
          <div className="w-14 h-14 rounded-2xl bg-[#ff6d29]/20 border border-[#ff6d29]/40 flex items-center justify-center text-[#ff6d29] mb-4 shadow-lg">
            <svg className="w-7 h-7 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-sm text-text-muted max-w-md mb-5 leading-relaxed">
            A visual element failed to render. Please refresh the page to restore full interactive features.
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ff5722] to-[#ff6d29] text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
