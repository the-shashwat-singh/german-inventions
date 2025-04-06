'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * Component for embedding Sketchfab 3D models using iframes
 * @param {Object} props Component props
 * @param {string} props.modelId Sketchfab model ID
 * @param {string} props.title Model title
 * @param {string} props.className Additional CSS classes
 */
const SketchfabEmbed = ({ modelId, title = "3D Model", className = "" }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef(null);
  
  // Improved URL with better parameters for performance and compatibility
  const getEmbedUrl = () => {
    return `https://sketchfab.com/models/${modelId}/embed?autospin=0.5&autostart=1&ui_theme=dark&ui_animations=0&ui_infos=1&ui_stop=1&ui_inspector=1&ui_ar=0&ui_help=0&ui_settings=1&ui_fullscreen=1&ui_annotations=1&camera=0&transparent=0&scrollwheel=1&dnt=1`;
  };
  
  useEffect(() => {
    // Reset states when model changes
    setIframeLoaded(false);
    setIframeError(false);
    setRetryCount(0);
    
    // Add a fallback in case onLoad doesn't fire
    const timer = setTimeout(() => {
      if (!iframeLoaded) {
        // If we can't detect loading after timeout, force loaded state
        // to remove spinner and show the iframe or error message
        setIframeLoaded(true);
        
        // Check if iframe content is accessible, if not mark as error
        try {
          const iframe = iframeRef.current;
          if (!iframe || !iframe.contentWindow) {
            setIframeError(true);
            console.warn("Iframe not accessible, marking as error");
          }
        } catch (e) {
          // CORS error or other issue
          console.warn("Could not access iframe content:", e);
          setIframeError(true);
        }
      }
    }, 8000); // Shorter timeout for better UX
    
    return () => clearTimeout(timer);
  }, [modelId]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIframeLoaded(true); // Mark as loaded to remove spinner
    console.error("Error loading 3D model:", modelId);
  };

  return (
    <div className={`w-full h-full overflow-hidden relative ${className}`}>
      {!iframeLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-indigo-700 font-medium">Loading 3D Model...</p>
          </div>
        </div>
      )}
      
      {iframeError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-20">
          <div className="flex flex-col items-center text-center p-4">
            <svg className="w-16 h-16 text-indigo-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-indigo-700 mb-2">Oops! 3D Model Failed to Load</h3>
            <p className="text-gray-600 mb-4">The 3D model may be temporarily unavailable or is experiencing connectivity issues.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <a 
                href={`https://sketchfab.com/models/${modelId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                View on Sketchfab
              </a>
              <button 
                onClick={() => {
                  setIframeError(false);
                  setIframeLoaded(false);
                  setRetryCount(prevCount => prevCount + 1);
                }}
                className="inline-flex items-center justify-center px-4 py-2 bg-white border border-indigo-300 text-indigo-700 rounded-md hover:bg-indigo-50 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Always render the iframe, but it will be hidden by the error message if there's an error */}
      <iframe 
        ref={iframeRef}
        title={title}
        key={`${modelId}-${retryCount}`} // Force re-render on retry
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true" 
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        src={getEmbedUrl()}
        className="absolute top-0 left-0 w-full h-full z-0"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />
    </div>
  );
};

export default SketchfabEmbed; 