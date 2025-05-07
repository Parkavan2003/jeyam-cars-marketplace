
import { useState, useEffect } from 'react';
import { useCarStore } from '@/store/carStore';
import { CarFiltersComponent } from '@/components/CarFilters';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';

const CarListings = () => {
  const { filteredCars, filterCars } = useCarStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Apply filters when component mounts
  useEffect(() => {
    filterCars();
  }, [filterCars]);
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4 md:sticky md:top-24">
          <CarFiltersComponent />
        </div>
        
        {/* Car Listings */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-jeyam-blue">Available Cars</h1>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Results Count */}
          <p className="mb-4 text-gray-600">
            {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} found
          </p>
          
          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
          
          {/* List View */}
          {viewMode === 'list' && (
            <div className="flex flex-col space-y-4">
              {filteredCars.map(car => (
                <CarCard key={car.id} car={car} className="flex flex-row" />
              ))}
            </div>
          )}
          
          {/* Empty State */}
          {filteredCars.length === 0 && (
            <div className="text-center py-8 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">No cars found</h3>
              <p className="text-gray-500">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarListings;
