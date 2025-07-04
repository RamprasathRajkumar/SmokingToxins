import React, { useState } from 'react';
import { getSubstanceContent } from '../services/geminiService';
import Loader from './Loader';
import { PlusIcon } from './Icons';
import { SubstanceContent } from '../types';

interface AddEntryFormProps {
  onAddEntry: (brand: string, quantity: number, substancesPerCigarette: SubstanceContent) => void;
}

const INDIAN_BRANDS = [
  "Gold Flake Kings",
  "Classic Milds",
  "Wills Navy Cut",
  "Four Square",
  "Charminar",
  "Cavanders",
  "Bristol",
  "Red & White",
];

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onAddEntry }) => {
  const [selectedBrand, setSelectedBrand] = useState(INDIAN_BRANDS[0]);
  const [customBrand, setCustomBrand] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const brandToSubmit = selectedBrand === 'Other' ? customBrand : selectedBrand;

    if (!brandToSubmit.trim()) {
      setError('Please enter a cigarette brand.');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const substancesPerCigarette = await getSubstanceContent(brandToSubmit);
      onAddEntry(brandToSubmit, quantity, substancesPerCigarette);
      setSelectedBrand(INDIAN_BRANDS[0]);
      setCustomBrand('');
      setQuantity(1);
    } catch (apiError: any) {
      setError(apiError.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="brand-select" className="block text-sm font-medium text-gray-300 mb-1">Cigarette Brand</label>
          <select
            id="brand-select"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            disabled={isLoading}
          >
            {INDIAN_BRANDS.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
            <option value="Other">Other...</option>
          </select>
        </div>

        {selectedBrand === 'Other' && (
           <div className="animate-fade-in">
             <label htmlFor="custom-brand" className="block text-sm font-medium text-gray-300 mb-1">Enter Brand Name</label>
             <input
               id="custom-brand"
               type="text"
               value={customBrand}
               onChange={(e) => setCustomBrand(e.target.value)}
               placeholder="e.g., Marlboro Red"
               className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
               disabled={isLoading}
               autoFocus
             />
           </div>
        )}
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
            disabled={isLoading}
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isLoading || (selectedBrand === 'Other' && !customBrand.trim())}
          className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader /> : <><PlusIcon className="w-5 h-5 mr-2"/> Track Cigarette(s)</>}
        </button>
      </form>
    </div>
  );
};

export default AddEntryForm;
