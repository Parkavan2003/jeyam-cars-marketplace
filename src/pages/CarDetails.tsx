
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCarStore } from '@/store/carStore';
import Layout from '@/components/Layout';
import ImageGallery from '@/components/ImageGallery';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, generateCarSchema } from '@/lib/utils';
import { Phone, MessageCircle, Calendar, Gauge } from 'lucide-react';

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { cars } = useCarStore();
  const [car, setCar] = useState(cars.find(c => c.id === id));
  
  useEffect(() => {
    // Find the car by ID
    const foundCar = cars.find(c => c.id === id);
    setCar(foundCar);
    
    if (foundCar) {
      // Set document title for SEO
      document.title = `${foundCar.title} | Jeyam Cars`;
      
      // Add structured data for SEO
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(generateCarSchema(foundCar));
      
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [id, cars]);
  
  if (!car) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Car Not Found</h1>
          <p className="mb-8">The car you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/cars">Back to Car Listings</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:text-jeyam-blue">Home</Link>
          <span>/</span>
          <Link to="/cars" className="hover:text-jeyam-blue">Cars</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{car.title}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Image Gallery */}
          <div>
            <ImageGallery images={car.images} title={car.title} />
          </div>
          
          {/* Right Column - Car Details */}
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-jeyam-blue">{car.title}</h1>
              <Badge className={car.status === 'Available' ? 'bg-green-500' : 'bg-red-500'}>
                {car.status}
              </Badge>
            </div>
            
            <div className="mt-4">
              <h2 className="text-3xl font-bold text-jeyam-amber">
                {formatCurrency(car.price)}
              </h2>
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-2 gap-y-4 mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-jeyam-blue" />
                <div>
                  <p className="text-sm text-gray-600">Year</p>
                  <p className="font-medium">{car.year}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Gauge className="h-5 w-5 mr-2 text-jeyam-blue" />
                <div>
                  <p className="text-sm text-gray-600">Kilometers</p>
                  <p className="font-medium">{car.kilometers.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-jeyam-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div>
                  <p className="text-sm text-gray-600">Transmission</p>
                  <p className="font-medium">{car.transmission}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-jeyam-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-600">Fuel Type</p>
                  <p className="font-medium">{car.fuel}</p>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-jeyam-blue">Description</h3>
              <p className="text-gray-700">{car.description}</p>
            </div>
            
            {car.features && car.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 text-jeyam-blue">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-jeyam-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button className="bg-green-600 hover:bg-green-700 flex items-center justify-center" asChild>
                <a href="https://wa.me/919876543210?text=I'm%20interested%20in%20the%20car:%20" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
              </Button>
              <Button className="bg-jeyam-blue hover:bg-jeyam-blue/90 flex items-center justify-center" asChild>
                <a href="tel:+919876543210">
                  <Phone className="mr-2 h-5 w-5" />
                  <span>Call Dealer</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Similar Cars Section - We can add this later */}
      </div>
    </Layout>
  );
};

export default CarDetails;
