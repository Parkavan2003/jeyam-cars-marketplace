
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useCarStore } from '@/store/carStore';
import CarCard from '@/components/CarCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const Index = () => {
  const { featuredCars, cars } = useCarStore();
  
  useEffect(() => {
    // Set page title
    document.title = 'Jeyam Cars - Quality Second Hand Cars in Trichy';
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-jeyam-blue text-white">
        <div className="container py-16 md:py-24 relative z-10">
          <div className="max-w-2xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Perfect <span className="text-jeyam-amber">Pre-owned</span> Car
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Jeyam Cars offers a wide selection of quality second-hand cars in Trichy.
              Browse our inventory to find the perfect vehicle for your needs and budget.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button asChild size="lg" className="bg-jeyam-amber text-black hover:bg-jeyam-amber/90">
                <Link to="/cars">Browse Inventory</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-jeyam-blue">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-0"></div>
        <div 
          className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20 z-[-1]"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200')"
          }}
        ></div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-jeyam-blue">Featured Vehicles</h2>
            <Link to="/cars" className="flex items-center text-jeyam-blue hover:underline">
              <span>View All</span>
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map(car => (
              <motion.div 
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-jeyam-blue mb-12">Why Choose Jeyam Cars?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-14 w-14 bg-jeyam-blue/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-jeyam-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-jeyam-blue">Quality Assurance</h3>
              <p className="text-gray-600">All our vehicles undergo a comprehensive quality check to ensure they meet our high standards.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="h-14 w-14 bg-jeyam-blue/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-jeyam-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-jeyam-blue">Competitive Pricing</h3>
              <p className="text-gray-600">We offer the best market prices for quality pre-owned vehicles with transparent pricing policy.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="h-14 w-14 bg-jeyam-blue/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-jeyam-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-jeyam-blue">Proper Documentation</h3>
              <p className="text-gray-600">We ensure all vehicles come with complete and verified documentation for a hassle-free purchase.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-jeyam-blue py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Find Your Next Car?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Visit our showroom or browse our online inventory to find the perfect car that meets your needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-jeyam-amber text-black hover:bg-jeyam-amber/90">
              <Link to="/cars">View Inventory</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-jeyam-blue">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-jeyam-blue mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                </div>
                <div>
                  <h4 className="font-semibold">Rajesh Kumar</h4>
                  <div className="flex text-yellow-400">
                    {"★★★★★".split("").map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I purchased a Honda City from Jeyam Cars and I'm extremely satisfied with the quality and service. The car was in excellent condition as promised."
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                </div>
                <div>
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <div className="flex text-yellow-400">
                    {"★★★★★".split("").map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The team at Jeyam Cars was very helpful in finding the right car for my budget. They made the buying process smooth and transparent."
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                </div>
                <div>
                  <h4 className="font-semibold">Mohammed Ali</h4>
                  <div className="flex text-yellow-400">
                    {"★★★★".split("").map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Great experience with Jeyam Cars. They have a wide range of vehicles to choose from and the staff is knowledgeable and friendly."
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
