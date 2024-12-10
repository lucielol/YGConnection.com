export default function Modal({ children, show, onClose }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        show ? "" : "hidden"
      }`}
    >
      {/* Overlay untuk menutup modal ketika area luar diklik */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="bg-white rounded-lg shadow-lg p-4 relative z-10 w-full max-w-2xl">
        {children}
      </div>
    </div>
  );
}

Modal.Header = function Header({ children, onClose }) {
  return (
    <div className="flex items-center justify-between text-lg font-bold border-b pb-2">
      <div>{children}</div>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-red-500 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

Modal.Body = function Body({ children }) {
  return <div className="py-4">{children}</div>;
};

Modal.Footer = function Footer({ children }) {
  return <div className="flex justify-end pt-4">{children}</div>;
};
