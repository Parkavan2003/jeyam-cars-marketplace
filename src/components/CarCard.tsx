
import { Link } from 'react-router-dom';
import { Car } from '@/store/carStore';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

interface CarCardProps {
  car: Car;
  className?: string;
}

export const CarCard = ({ car, className }: CarCardProps) => {
  const { id, title, year, price, kilometers, transmission, fuel, status, images } = car;
  
  return (
    <Link 
      to={`/cars/${id}`} 
      className={`block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow ${className}`}
    >
      <div className="relative h-48">
        <img
          src={images[0] || '/placeholder.svg'}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge 
          className={`absolute top-3 right-3 ${
            status === 'Available' 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {status}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-jeyam-blue">{title}</h3>
        <p className="font-bold text-xl text-jeyam-amber mb-3">
          {formatCurrency(price)}
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="font-semibold mr-1">Year:</span> {year}
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-1">KM:</span> {kilometers.toLocaleString()}
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-1">Fuel:</span> {fuel}
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-1">Trans:</span> {transmission}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
