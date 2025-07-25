export const cloudinaryConfig = {
  cloudName: "dsk5svjyo",
}

// Simple function to fetch all images from a Cloudinary folder
export const fetchCloudinaryImages = async (folderName = "carousel") => {
  try {
    // Use Cloudinary's public list API
    const listUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/list/${folderName}.json`
    const response = await fetch(listUrl)

    if (response.ok) {
      const data = await response.json()
      return data.resources || []
    }

    return []
  } catch (error) {
    console.error("Error fetching images:", error)
    return []
  }
}
