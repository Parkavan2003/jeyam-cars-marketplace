
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, MapPin, Mail, Clock, ExternalLink } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Contact Us | Jeyam Cars - Second Hand Cars in Trichy';
    
    // Add structured data for SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AutoDealer",
      "name": "Jeyam Cars",
      "description": "Quality second hand cars in Trichy",
      "url": window.location.origin,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Main Street",
        "addressLocality": "Trichy",
        "addressRegion": "Tamil Nadu",
        "postalCode": "620001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "10.7905",
        "longitude": "78.7047"
      },
      "telephone": "+919876543210",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Sunday"],
          "opens": "10:00",
          "closes": "14:00"
        }
      ]
    });
    
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would send the form data to a server
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <Layout>
      {/* Map Section */}
      <section className="w-full h-[300px] md:h-[400px] lg:h-[500px] relative">
        {/* Embed Google Maps - In a real implementation, replace with actual Google Maps API integration */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125629.83221408103!2d78.65499358295109!3d10.790817868559054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa9c0e3b7e1889%3A0x3d66b0e721342c0d!2sTiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1714083957336!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Jeyam Cars Location"
        ></iframe>
        <div className="absolute bottom-4 right-4">
          <Button asChild variant="secondary" className="bg-jeyam-blue text-white hover:bg-jeyam-blue/90">
            <a 
              href="https://www.google.com/maps?q=10.7905,78.7047" 
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h1 className="text-3xl font-bold text-jeyam-blue mb-6">Contact Us</h1>
            <p className="text-gray-600 mb-8">
              We're here to help! Whether you're looking for a specific car or have questions about our current inventory, don't hesitate to get in touch.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-jeyam-blue/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-jeyam-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Address</h3>
                  <address className="not-italic text-gray-600">
                    123 Main Street, Thillai Nagar<br />
                    Trichy, Tamil Nadu - 620018<br />
                    India
                  </address>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-jeyam-blue/10 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-jeyam-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Phone</h3>
                  <p>
                    <a href="tel:+919876543210" className="text-jeyam-blue hover:underline">+91 98765 43210</a>
                  </p>
                  <p>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline flex items-center mt-1">
                      <span>WhatsApp Chat</span>
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-jeyam-blue/10 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-jeyam-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Email</h3>
                  <p>
                    <a href="mailto:info@jeyamcars.com" className="text-jeyam-blue hover:underline">info@jeyamcars.com</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-jeyam-blue/10 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-jeyam-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1">Business Hours</h3>
                  <table className="text-gray-600">
                    <tbody>
                      <tr>
                        <td className="pr-4 py-1">Monday - Saturday</td>
                        <td>9:00 AM - 7:00 PM</td>
                      </tr>
                      <tr>
                        <td className="pr-4 py-1">Sunday</td>
                        <td>10:00 AM - 2:00 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-jeyam-blue mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input id="name" placeholder="Enter your full name" required />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input id="phone" placeholder="Enter your phone number" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <Input id="email" placeholder="Enter your email address" required type="email" />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input id="subject" placeholder="What is this regarding?" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    required 
                    rows={5}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-jeyam-blue hover:bg-jeyam-blue/90"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
