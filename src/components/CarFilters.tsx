
import { useState, useEffect } from 'react';
import { useCarStore, CarFilters } from '@/store/carStore';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/utils';

export const CarFilters = () => {
  const { filters, setFilters, resetFilters } = useCarStore();
  const [localFilters, setLocalFilters] = useState<CarFilters>(filters);
  
  // Available filter options
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const transmissionTypes = ['Manual', 'Automatic'];
  const statusTypes = ['Available', 'Sold Out'];
  
  // Update local filters when global filters change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);
  
  const handlePriceChange = (value: number[]) => {
    setLocalFilters(prev => ({
      ...prev,
      priceRange: [value[0], value[1]]
    }));
  };
  
  const handleFuelChange = (value: string) => {
    const updatedFuels = localFilters.fuel.includes(value)
      ? localFilters.fuel.filter(f => f !== value)
      : [...localFilters.fuel, value];
      
    setLocalFilters(prev => ({
      ...prev,
      fuel: updatedFuels
    }));
  };
  
  const handleTransmissionChange = (value: string) => {
    const updatedTransmissions = localFilters.transmission.includes(value)
      ? localFilters.transmission.filter(t => t !== value)
      : [...localFilters.transmission, value];
      
    setLocalFilters(prev => ({
      ...prev,
      transmission: updatedTransmissions
    }));
  };
  
  const handleStatusChange = (value: string) => {
    const updatedStatus = localFilters.status.includes(value)
      ? localFilters.status.filter(s => s !== value)
      : [...localFilters.status, value];
      
    setLocalFilters(prev => ({
      ...prev,
      status: updatedStatus
    }));
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };
  
  const applyFilters = () => {
    setFilters(localFilters);
  };
  
  const handleReset = () => {
    resetFilters();
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-bold text-jeyam-blue mb-4">Filter Cars</h2>
      
      <div className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search cars..."
            value={localFilters.search}
            onChange={handleSearchChange}
            className="mt-1"
          />
        </div>
        
        {/* Price Range */}
        <div>
          <div className="flex justify-between mb-2">
            <Label>Price Range</Label>
            <span className="text-sm text-gray-500">
              {formatCurrency(localFilters.priceRange[0])} - {formatCurrency(localFilters.priceRange[1])}
            </span>
          </div>
          <Slider
            onValueChange={handlePriceChange}
            value={[localFilters.priceRange[0], localFilters.priceRange[1]]}
            min={100000}
            max={2000000}
            step={50000}
            className="mt-2"
          />
        </div>
        
        {/* Fuel Type */}
        <div>
          <Label className="mb-2 block">Fuel Type</Label>
          <div className="space-y-1">
            {fuelTypes.map(fuel => (
              <div key={fuel} className="flex items-center space-x-2">
                <Checkbox
                  id={`fuel-${fuel}`}
                  checked={localFilters.fuel.includes(fuel)}
                  onCheckedChange={() => handleFuelChange(fuel)}
                />
                <label
                  htmlFor={`fuel-${fuel}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {fuel}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Transmission */}
        <div>
          <Label className="mb-2 block">Transmission</Label>
          <div className="space-y-1">
            {transmissionTypes.map(trans => (
              <div key={trans} className="flex items-center space-x-2">
                <Checkbox
                  id={`trans-${trans}`}
                  checked={localFilters.transmission.includes(trans)}
                  onCheckedChange={() => handleTransmissionChange(trans)}
                />
                <label
                  htmlFor={`trans-${trans}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {trans}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Status */}
        <div>
          <Label className="mb-2 block">Status</Label>
          <div className="space-y-1">
            {statusTypes.map(status => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={localFilters.status.includes(status)}
                  onCheckedChange={() => handleStatusChange(status)}
                />
                <label
                  htmlFor={`status-${status}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-col gap-2">
          <Button 
            onClick={applyFilters}
            className="w-full bg-jeyam-blue hover:bg-jeyam-blue/90"
          >
            Apply Filters
          </Button>
          <Button 
            onClick={handleReset}
            variant="outline"
            className="w-full"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarFilters;
