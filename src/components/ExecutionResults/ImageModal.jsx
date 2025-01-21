const ImageModal = ({ selectedImage, onClose, onNext }) => (
  <div
    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
    onClick={onClose}
  >
    <div className="relative bg-white p-4 rounded shadow-md" onClick={(e) => e.stopPropagation()}>
      <img src={selectedImage} alt="Selected" className="max-w-full max-h-screen object-contain" />
      <button onClick={onClose} className="absolute top-4 right-4 text-red-500 font-bold text-2xl">
        &times;
      </button>
      <button onClick={() => onNext(-1)} className="absolute left-4 top-1/2 transform -translate-y-1/2">
        &larr;
      </button>
      <button onClick={() => onNext(1)} className="absolute right-4 top-1/2 transform -translate-y-1/2">
        &rarr;
      </button>
    </div>
  </div>
);

export default ImageModal;
