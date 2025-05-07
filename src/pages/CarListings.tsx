
import { useEffect, useState } from 'react';
import { useCarStore } from '@/store/carStore';
import Layout from '@/components/Layout';
import CarCard from '@/components/CarCard';
import CarFilters from '@/components/CarFilters';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid2X2, List } from 'lucide-react';

const CarListings = () => {
  const { filteredCars } = useCarStore();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  
  useEffect(() => {
    // Update document title for SEO
    document.title = 'Car Inventory | Jeyam Cars - Second Hand Cars in Trichy';
    
    // Add structured data for SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": filteredCars.map((car, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": car.title,
          "description": car.description,
          "offers": {
            "@type": "Offer",
            "price": car.price,
            "priceCurrency": "INR",
            "availability": car.status === "Available" 
              ? "https://schema.org/InStock" 
              : "https://schema.org/SoldOut"
          }
        }
      }))
    });
    
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [filteredCars]);
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-jeyam-blue mb-8">Car Inventory</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Side Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CarFilters />
            </div>
          </div>
          
          {/* Car Listings - Main Column */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{filteredCars.length}</span> vehicles
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">View:</span>
                <Tabs value={view} onValueChange={(v) => setView(v as 'grid' | 'list')}>
                  <TabsList>
                    <TabsTrigger value="grid">
                      <Grid2X2 className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="list">
                      <List className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            {filteredCars.length === 0 ? (
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No cars found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters to find what you're looking for.</p>
                <Button 
                  onClick={() => useCarStore.getState().resetFilters()}
                  className="bg-jeyam-blue hover:bg-jeyam-blue/90"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                {/* Grid View */}
                {view === 'grid' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCars.map(car => (
                      <CarCard key={car.id} car={car} />
                    ))}
                  </div>
                )}
                
                {/* List View */}
                {view === 'list' && (
                  <div className="space-y-4">
                    {filteredCars.map(car => (
                      <div 
                        key={car.id}
                        className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                      >
                        <div className="md:w-1/3 h-48 md:h-auto">
                          <img 
                            src={car.images[0] || '/placeholder.svg'} 
                            alt={car.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-4 flex flex-col">
                          <h3 className="text-lg font-bold text-jeyam-blue">{car.title}</h3>
                          <p className="font-bold text-xl text-jeyam-amber my-2">
                            {new Intl.NumberFormat('en-IN', { 
                              style: 'currency', 
                              currency: 'INR',
                              maximumFractionDigits: 0 
                            }).format(car.price)}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                            <div>Year: {car.year}</div>
                            <div>KM: {car.kilometers.toLocaleString()}</div>
                            <div>Fuel: {car.fuel}</div>
                            <div>Trans: {car.transmission}</div>
                          </div>
                          <p className="text-gray-600 line-clamp-2 mb-4">
                            {car.description}
                          </p>
                          <div className="mt-auto flex justify-between items-center">
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                              car.status === 'Available' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {car.status}
                            </span>
                            <Button asChild variant="default" size="sm" className="bg-jeyam-blue hover:bg-jeyam-blue/90">
                              <a href={`/cars/${car.id}`}>View Details</a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarListings;
