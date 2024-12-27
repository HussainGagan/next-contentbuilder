import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = ({
  editor,
  isOpen = true,
  onToggle,
  activeSection,
  onSectionClick,
}) => {
  const listRef = useRef(null);

  useEffect(() => {
    // Scroll active section into view within sidebar
    if (activeSection && isOpen) {
      const activeElement = listRef.current?.querySelector(
        `[data-section="${activeSection}"]`
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeSection, isOpen]);

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4 flex-shrink-0">
        {isOpen && <h2 className="font-semibold text-gray-700">Sections</h2>}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Section List */}
      <div className="flex-1 overflow-y-auto" ref={listRef}>
        <div className="py-4">
          {editor.map((section, index) => (
            <button
              key={section.id}
              data-section={section.id}
              onClick={() => onSectionClick(section.id)}
              className={`w-full text-left px-4 py-3 transition-colors hover:bg-gray-100
                ${
                  activeSection === section.id
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : ""
                }
                ${!isOpen ? "justify-center" : ""}`}
            >
              {isOpen ? (
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{section.sectionName}</span>
                </div>
              ) : (
                <div className="flex justify-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm font-medium">
                    {index + 1}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
