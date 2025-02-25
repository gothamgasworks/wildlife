'use client'; // Enables client-side features like useState

import { useState } from 'react';
import { animals } from '../animals';

export default function Home() {
  // Extract unique habitats from animals data
  const allHabitats = [...new Set(
    animals.flatMap(animal => animal.habitat.split(', ').map(h => h.trim()))
  )].sort();

  // State for selected habitats
  const [selectedHabitats, setSelectedHabitats] = useState([]);

  // Handle checkbox changes
  const handleHabitatChange = (habitat) => {
    setSelectedHabitats(prev =>
      prev.includes(habitat)
        ? prev.filter(h => h !== habitat)
        : [...prev, habitat]
    );
  };

  // Filter animals based on selected habitats
  const filteredAnimals = selectedHabitats.length > 0
    ? animals.filter(animal =>
        animal.habitat.split(', ').some(habitat =>
          selectedHabitats.includes(habitat.trim())
        )
      )
    : [];

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Animals of the World</h1>

      {/* Habitat Picker */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Habitats</h2>
        <div className="flex flex-wrap gap-4">
          {allHabitats.map(habitat => (
            <label key={habitat} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedHabitats.includes(habitat)}
                onChange={() => handleHabitatChange(habitat)}
                className="h-4 w-4"
              />
              <span>{habitat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Animal List */}
      {selectedHabitats.length === 0 ? (
        <p className="text-gray-500">Select a habitat to see animals.</p>
      ) : filteredAnimals.length === 0 ? (
        <p className="text-gray-500">No animals found for selected habitats.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAnimals.map((animal, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{animal.name}</h2>
              <p><em>{animal.scientificName}</em></p>
              <p><strong>Category:</strong> {animal.category}</p>
              <p><strong>Region:</strong> {animal.region}</p>
              <p><strong>Habitat:</strong> {animal.habitat}</p>
              <p><strong>Diet:</strong> {animal.diet}</p>
              <p><strong>Weight:</strong> {animal.weightKg} kg</p>
              <p><strong>Lifespan:</strong> {animal.lifespanYears} years</p>
              <p>{animal.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}