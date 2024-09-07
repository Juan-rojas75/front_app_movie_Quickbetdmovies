"use client";
import { useState } from 'react';

const FilterableList = ({ title, items, onItemSelected }) => {
  const [filterText, setFilterText] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  // Actualiza el filtro y la lista de elementos filtrados
  const handleFilterChange = (e) => {
    const text = e.target.value;
    setFilterText(text);
    //Filtrar busqueda
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  //Retorna valor seleccionado
  const handleItemClick = (item) => {
    onItemSelected(item.id);
  };

  return (
    <div className="w-full max-h-80">
      <h1 className="text-sm font-semibold dark:text-red-300">{title}</h1>
      <input
        type="text"
        className="bg-[#1C1C1C] h-10 pl-5 rounded-t-sm border-b border-white outline-none"
        value={filterText}
        onChange={handleFilterChange}
      />
      <div className='max-h-80 overflow-y-auto'>
        <ul className="rounded gap-2 ">
            {filteredItems.map((item, index) => (
            <li
                key={index}
                className="p-2 cursor-pointer hover:bg-[#454545]"
                onClick={() => handleItemClick(item)}
            >
                {item.name}
            </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterableList;
