"use client"

import { useState, useEffect } from "react"
import { fetchCloudinaryImages, cloudinaryConfig } from "../../config/cloudinary"

const ImageCarousel = ({ isVisible, onClose }) => {
  const [images, setImages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [imageLoading, setImageLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isVisible) {
      loadImages()
    }
  }, [isVisible])

  const loadImages = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("Starting to load images...")
      const cloudinaryImages = await fetchCloudinaryImages("carousel")
      console.log("Loaded images:", cloudinaryImages)

      if (cloudinaryImages.length === 0) {
        setError("No images found. Check console for details.")
      }

      setImages(cloudinaryImages)
    } catch (error) {
      console.error("Failed to load images:", error)
      setError(`Failed to load images: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const nextImage = () => {
    setImageLoading(true)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setImageLoading(true)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index) => {
    setImageLoading(true)
    setCurrentIndex(index)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-[90vw] max-w-4xl h-[80vh] bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <p>Loading images...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-white p-8">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={loadImages}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              Retry
            </button>
            <p className="text-sm mt-4 text-gray-300">Cloud name: {cloudinaryConfig.cloudName}</p>
          </div>
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-white">
            <p>No images found in Cloudinary</p>
            <p className="text-sm mt-2 text-gray-300">Check console for debugging info</p>
          </div>
        ) : (
          <>
            {/* Main Image */}
            <div className="relative h-full flex items-center justify-center p-8">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}

              <img
                src={`https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/w_800,h_600,c_fit,q_auto,f_auto/${images[currentIndex].public_id}`}
                alt={`Carousel image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-lg"
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  console.error("Image load error:", e.target.src)
                  setImageLoading(false)
                }}
              />
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ImageCarousel
