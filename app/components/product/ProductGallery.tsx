export function ProductGallery({ image, alt }: { image: string; alt: string }) {
  return (
    <div  className="h-70 flex-1 bg-gray-100 md:h-130">
      <img
        src={image}
        alt={alt}
        className="h-full w-full object-contain"
      />
    </div>
  );
}