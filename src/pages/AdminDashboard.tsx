
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import CarRow from '@/components/admin/CarRow';
import CarForm from '@/components/admin/CarForm';
import { useAuthStore } from '@/store/authStore';
import { useCarStore } from '@/store/carStore';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, Car } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { cars } = useCarStore();
  const [tab, setTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  
  useEffect(() => {
    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
      navigate('/login');
    }

    // Set page title
    document.title = 'Admin Dashboard | Jeyam Cars';
  }, [isAuthenticated, navigate]);
  
  // Filter cars based on tab and search term
  const filteredCars = cars.filter(car => {
    // Filter by tab
    if (tab !== 'all' && car.status.toLowerCase() !== tab) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !car.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // If not authenticated, don't render the dashboard
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-jeyam-blue">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your car inventory</p>
          </div>
          
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-jeyam-blue hover:bg-jeyam-blue/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Car
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Car</DialogTitle>
              </DialogHeader>
              <CarForm onComplete={() => setAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search cars..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <Tabs value={tab} onValueChange={setTab} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
                  <TabsTrigger value="all" className="flex items-center">
                    <Car className="mr-2 h-4 w-4" />
                    All Cars
                  </TabsTrigger>
                  <TabsTrigger value="available" className="text-green-600">
                    Available
                  </TabsTrigger>
                  <TabsTrigger value="sold out" className="text-red-600">
                    Sold Out
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Car Details</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Year</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">KM</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Fuel</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Trans</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      No cars found
                    </td>
                  </tr>
                ) : (
                  filteredCars.map(car => (
                    <CarRow key={car.id} car={car} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
