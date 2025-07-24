export const cloudinaryConfig = {
  cloudName: "dsk5svjyo",
}

// For now, let's manually list your images
// You need to get the exact public_id for each image from Cloudinary
export const fetchCloudinaryImages = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

return [
  { public_id: "1bfce97a85aecdd0c0a0cd48348c15ef_wk901g", format: "jpg" },
  { public_id: "79a3168cf52edca304ff32db46e0f888_hkfmje", format: "jpg" },
  { public_id: "funny-silly-cats-pics-cover_675_hct2yj", format: "jpg" },
]
}
