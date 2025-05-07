
import { useState } from 'react';
import { useCarStore, Car } from '@/store/carStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { X } from 'lucide-react';

interface CarFormProps {
  car?: Car;
  onComplete?: () => void;
}

export const CarForm = ({ car, onComplete }: CarFormProps) => {
  const isEditMode = !!car;
  const { addCar, updateCar } = useCarStore();
  
  const [formData, setFormData] = useState({
    title: car?.title || '',
    year: car?.year || new Date().getFullYear(),
    price: car?.price || 500000,
    kilometers: car?.kilometers || 0,
    transmission: car?.transmission || 'Manual',
    fuel: car?.fuel || 'Petrol',
    description: car?.description || '',
    status: car?.status || 'Available',
    features: car?.features || [] as string[],
    images: car?.images || [] as string[]
  });
  
  const [feature, setFeature] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title) {
      newErrors.title = 'Title is required';
    }
    
    if (formData.year < 1990 || formData.year > new Date().getFullYear()) {
      newErrors.year = 'Please enter a valid year';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (formData.kilometers < 0) {
      newErrors.kilometers = 'Kilometers cannot be negative';
    }
    
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const addFeature = () => {
    if (feature.trim() && !formData.features.includes(feature.trim())) {
      setFormData({
        ...formData,
        features: [...formData.features, feature.trim()]
      });
      setFeature('');
    } else {
      toast.error('Feature is empty or already exists');
    }
  };
  
  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };
  
  const addImage = () => {
    if (imageUrl.trim() && !formData.images.includes(imageUrl.trim())) {
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl.trim()]
      });
      setImageUrl('');
    } else {
      toast.error('Image URL is empty or already exists');
    }
  };
  
  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    if (isEditMode && car) {
      updateCar(car.id, formData);
      toast.success('Car updated successfully');
    } else {
      addCar(formData);
      toast.success('Car added successfully');
      // Reset form after adding
      setFormData({
        title: '',
        year: new Date().getFullYear(),
        price: 500000,
        kilometers: 0,
        transmission: 'Manual',
        fuel: 'Petrol',
        description: '',
        status: 'Available',
        features: [],
        images: []
      });
    }
    
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <Label htmlFor="title">Car Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Maruti Swift VXI 2018"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        
        {/* Year */}
        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleNumberChange}
            placeholder="Manufacturing Year"
            className={errors.year ? "border-red-500" : ""}
          />
          {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
        </div>
        
        {/* Price */}
        <div>
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleNumberChange}
            placeholder="Price in INR"
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
        
        {/* Kilometers */}
        <div>
          <Label htmlFor="kilometers">Kilometers Driven</Label>
          <Input
            id="kilometers"
            name="kilometers"
            type="number"
            value={formData.kilometers}
            onChange={handleNumberChange}
            placeholder="Kilometers Driven"
            className={errors.kilometers ? "border-red-500" : ""}
          />
          {errors.kilometers && <p className="text-red-500 text-sm mt-1">{errors.kilometers}</p>}
        </div>
        
        {/* Transmission */}
        <div>
          <Label htmlFor="transmission">Transmission</Label>
          <Select
            value={formData.transmission}
            onValueChange={(value) => handleSelectChange('transmission', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="Automatic">Automatic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Fuel */}
        <div>
          <Label htmlFor="fuel">Fuel Type</Label>
          <Select
            value={formData.fuel}
            onValueChange={(value) => handleSelectChange('fuel', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Fuel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="CNG">CNG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Status */}
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleSelectChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Sold Out">Sold Out</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Detailed description of the vehicle"
          rows={5}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>
      
      {/* Features */}
      <div>
        <Label htmlFor="feature">Features</Label>
        <div className="flex mb-2">
          <Input
            id="feature"
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            placeholder="e.g., Power Windows, ABS, etc."
            className="mr-2"
          />
          <Button type="button" onClick={addFeature}>Add</Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.features.map((feat, index) => (
            <div 
              key={index} 
              className="bg-gray-100 py-1 px-3 rounded-full flex items-center"
            >
              <span className="mr-2">{feat}</span>
              <button 
                type="button" 
                onClick={() => removeFeature(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Images */}
      <div>
        <Label htmlFor="imageUrl">Images</Label>
        <div className="flex mb-2">
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="mr-2"
          />
          <Button type="button" onClick={addImage}>Add</Button>
        </div>
        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
          {formData.images.map((image, index) => (
            <div key={index} className="relative">
              <img 
                src={image} 
                alt={`Image ${index}`}
                className="w-full h-24 object-cover rounded-md"
                onError={(e) => {
                  // Handle broken image
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="bg-jeyam-blue hover:bg-jeyam-blue/90"
        >
          {isEditMode ? 'Update Car' : 'Add Car'}
        </Button>
      </div>
    </form>
  );
};

export default CarForm;
