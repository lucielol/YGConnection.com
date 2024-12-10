import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const trigger = React.Children.toArray(children).find(
    (child) => child.type.displayName === "Dropdown.Trigger"
  );

  const lists = React.Children.toArray(children).filter(
    (child) => child.type.displayName === "Dropdown.List"
  );

  return (
    <div className="text-left">
      <div onClick={handleToggle}>{trigger}</div>
      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 min-w-32 origin-top-right bg-black rounded-xl shadow-lg">
          <ul className="py-1">{lists}</ul>
        </div>
      )}
    </div>
  );
};

const Trigger = ({ children }) => children;

Trigger.displayName = "Dropdown.Trigger";

const List = ({ to, children, onClick, className }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-2 text-sm text-white ${className}`}
    >
      {children}
    </Link>
  </li>
);

List.displayName = "Dropdown.List";

Dropdown.Trigger = Trigger;
Dropdown.List = List;

export default Dropdown;
