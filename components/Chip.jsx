import React, { useState } from "react";
import { data } from "@/constants/data";

const Chip = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [keySelected, setKeySelected] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = data.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) &&
        !selectedItems.some((selectedItem) => selectedItem.email === item.email)
    );

    setFilteredData(filteredResults);
  };

  const handleItemClick = (selectedItem) => {
    setSelectedItems([...selectedItems, selectedItem]);

    setSearchTerm("");
    setFilteredData([]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace" && searchTerm === "") {
      if (keySelected === null) {
        setKeySelected(selectedItems.length - 1);
      } else {
        const updatedItems = selectedItems.slice(0, -1);
        setKeySelected(null);
        setSelectedItems(updatedItems);
      }
    }
  };

  return (
    <div className="relative">
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 border-b-2 border-blue-500 focus:outline-none">
        {selectedItems.map((item, index) => (
          <button
            key={index}
            className={`${
              keySelected === index ? "text-red-800" : ""
            } whitespace-nowrap flex items-center justify-between bg-gray-400 text-gray-700 font-semibold py-1 px-2 rounded-full ml-2 mr-2 mt-1 mb-1`}
          >
            {/* display image(avatar) here */}
            {item.name}
            <span
              onClick={() => handleRemoveItem(index)}
              className="text-center mb-2 text-4xl cursor-pointer"
            >
              &times;
            </span>
          </button>
        ))}
        <input
          type="text"
          placeholder="Search by name"
          className="w-screen p-4 border-b-2  focus:outline-none"
          onClick={handleInputChange}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <ul className="absolute left-8 mt-2 bg-white bord w-[90vw] rounded-xl shadow-2xl text-gray-500 font-semibold">
        {filteredData.map((item, index) => {
          const nameParts = item.name.split(new RegExp(`(${searchTerm})`, "i"));
          return (
            <li
              key={item.email}
              onClick={() => handleItemClick(item)}
              className="p-2 cursor-pointer rounded-xl hover:bg-gray-200"
            >
              {nameParts.map((part, partIndex) =>
                part.toLowerCase() === searchTerm.toLowerCase() ? (
                  <span key={partIndex} className="text-black">
                    {part}
                  </span>
                ) : (
                  <span key={partIndex}>{part}</span>
                )
              )}
              {" - "}
              {item.email}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Chip;
