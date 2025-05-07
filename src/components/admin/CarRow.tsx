
import { useState } from 'react';
import { Car, useCarStore } from '@/store/carStore';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from 'lucide-react';
import CarForm from './CarForm';

interface CarRowProps {
  car: Car;
}

export const CarRow = ({ car }: CarRowProps) => {
  const { toggleStatus, deleteCar } = useCarStore();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const handleToggleStatus = () => {
    toggleStatus(car.id);
  };
  
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3 flex items-center space-x-3">
        <div className="h-10 w-10 rounded overflow-hidden">
          <img
            src={car.images[0] || '/placeholder.svg'}
            alt={car.title}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="font-medium">{car.title}</span>
      </td>
      <td className="px-4 py-3">{car.year}</td>
      <td className="px-4 py-3">{formatCurrency(car.price)}</td>
      <td className="px-4 py-3">{car.kilometers.toLocaleString()} km</td>
      <td className="px-4 py-3">{car.fuel}</td>
      <td className="px-4 py-3">{car.transmission}</td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <Switch
            checked={car.status === 'Available'}
            onCheckedChange={handleToggleStatus}
          />
          <span className={car.status === 'Available' ? 'text-green-600' : 'text-red-600'}>
            {car.status}
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Car</DialogTitle>
              </DialogHeader>
              <CarForm 
                car={car} 
                onComplete={() => setEditDialogOpen(false)} 
              />
            </DialogContent>
          </Dialog>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the car listing for "{car.title}".
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteCar(car.id)} className="bg-red-500 hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  );
};

export default CarRow;
