import { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import { FiFilter } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { Input } from "antd";

const { Search } = Input;

const FilterSidebar = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [selectedCapacity, setSelectedCapacity] = useState<number[]>([]);
  const [price, setPrice] = useState<number>(100);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceSortOrder, setPriceSortOrder] = useState<string>("");

  useEffect(() => {
    // Call the parent component's onFilterChange whenever filters change
    onFilterChange({
      searchQuery,
      transmissionType: selectedTypes,
      fuelType: selectedFuel,
      numberOfSeats: selectedCapacity,
      priceSort: priceSortOrder,
    });
  }, [searchQuery, selectedTypes, selectedFuel, selectedCapacity, price]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleFuelChange = (type: string) => {
    setSelectedFuel((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
    );
  };

  const handleCapacityChange = (capacity: number) => {
    setSelectedCapacity((prev) =>
      prev.includes(capacity)
        ? prev.filter((c) => c !== capacity)
        : [...prev, capacity]
    );
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  const closeSidebar = () => {
    setSidebarOpen(false); // Close sidebar
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value); // Update the search query
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update the search query from input change
  };
  const handlePriceSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceSortOrder(e.target.value); // Update the sorting order when the user changes it
  };

  return (
    <>
      {/* Filter Icon for mobile */}
      <div className={styles.filterIcon} onClick={toggleSidebar}>
        <FiFilter size={24} />
      </div>

      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${
          sidebarOpen ? styles.active : styles.hidden
        }`}
        onClick={closeSidebar} // Allow closing the sidebar when clicking outside the close button.
      >
        {/* Close Button */}
        <button className={styles.closeButton} onClick={closeSidebar}>
          <AiOutlineClose size={24} />
        </button>

        {/* Prevent clicking inside the sidebar from closing it */}
        <div
          className={styles.sidebarContent}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Box */}
          <div className={styles.filterSection}>
            <Search
              placeholder="Search..."
              value={searchQuery}
              onSearch={handleSearchChange} // Triggered when user presses "Enter" or clicks the search button
              onChange={handleInputChange} // Triggered for every input change
              enterButton
            />
          </div>

          {/* Car Type Section */}
          <div className={styles.filterSection}>
            <h4 className={styles.sectionTitle}>Transmission Type</h4>
            {["Automatic", "Manual"].map((type, index) => (
              <label key={index} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                />
                {type}{" "}
              </label>
            ))}
          </div>

          <div className={styles.filterSection}>
            <h4 className={styles.sectionTitle}>Fuel Type</h4>
            {["Petrol", "Diesel", "Electric"].map((type, index) => (
              <label key={index} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  checked={selectedFuel.includes(type)}
                  onChange={() => handleFuelChange(type)}
                />
                {type}{" "}
              </label>
            ))}
          </div>

          {/* Capacity Section */}
          <div className={styles.filterSection}>
            <h4 className={styles.sectionTitle}>Capacity</h4>
            {[
              { label: "2 Person", value: 2 },
              { label: "4 Person", value: 4 },
              { label: "5 Person", value: 5 },
              { label: "6 or More", value: 6 },
            ].map((capacity, index) => (
              <label key={index} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  checked={selectedCapacity.includes(capacity.value)}
                  onChange={() => handleCapacityChange(capacity.value)}
                />
                {capacity.label}{" "}
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
