export const getNextImage = (currentImage, direction, results) => {
  const allImages = results.flatMap((result) =>
    result.screenshots.map((s) => s.url)
  );
  const currentIndex = allImages.indexOf(currentImage);
  const nextIndex = (currentIndex + direction + allImages.length) % allImages.length;
  return allImages[nextIndex];
};
