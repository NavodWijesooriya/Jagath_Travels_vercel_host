'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../../../public/assets/jagathlogo4.png';
import TawkToChat from '@/components/common/chat/chat';
import { collection, where, query, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

type Package = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
};

const TourBookingForm = () => {
  const OrganizationID = 'packages';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '', // Changed to string for easier input handling
    country: '',
    arrivalDate: '',
    departureDate: '',
    adults: 1,
    children: 0,
    tourType: '',
    accommodation: '',
    additionalRequirements: '',
    mealPlane: '',
  });
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packageRef = collection(db, OrganizationID);
        const itemsQuery = query(packageRef, where("hide", "==", false));
        const querySnapshot = await getDocs(itemsQuery);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Package));
        setPackages(data);
      } catch (error) {
        console.error('Error fetching Package Details', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('api/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const orgDocId = 'orders';
        const ordersRef = collection(db, orgDocId);
        await addDoc(ordersRef, { ...formData, createdAt: new Date() });
        
        alert('Booking information saved and email sent successfully!');
        setFormData({
          name: '', email: '', number: '', country: '', arrivalDate: '',
          departureDate: '', adults: 1, children: 0, tourType: '',
          accommodation: '', additionalRequirements: '', mealPlane: '',
        });
      } else {
        alert('Error Sending Email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  // Common input styles to avoid repetition
  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all hover:border-teal-300";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 animate-fadeIn">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-teal-700 mb-2">Tour Inquiry</h1>
            <p className="text-gray-600">Plan your perfect Sri Lanka adventure</p>
          </div>
          <div className="w-24 h-auto">
            <Image src={logo} alt="Sri Lanka Logo" width={100} height={100} priority />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className={inputClass} />
            </div>
          </div>

          {/* Number & Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input type="tel" name="number" required value={formData.number} onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleInputChange} className={inputClass} />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Arrival Date *</label>
              <input type="date" name="arrivalDate" required value={formData.arrivalDate} onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Departure Date *</label>
              <input type="date" name="departureDate" required value={formData.departureDate} onChange={handleInputChange} className={inputClass} />
            </div>
          </div>

          {/* Adults & Children */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Adults</label>
              <input type="number" name="adults" min="1" value={formData.adults} onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Children</label>
              <input type="number" name="children" min="0" value={formData.children} onChange={handleInputChange} className={inputClass} />
            </div>
          </div>

          {/* Tour Type */}
          <div>
            <label className={labelClass}>Tour Type *</label>
            <select name="tourType" required value={formData.tourType} onChange={handleInputChange} className={inputClass}>
              <option value="">Select Tour Type</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.name}>{pkg.name}</option>
              ))}
            </select>
          </div>

          {/* Accommodation & Meal Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Accommodation *</label>
              <select name="accommodation" required value={formData.accommodation} onChange={handleInputChange} className={inputClass}>
                <option value="">Select Accommodation</option>
                <option value="3 Star">3 Star</option>
                <option value="4 Star">4 Star</option>
                <option value="5 Star">5 Star</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Meal Plan *</label>
              <select name="mealPlane" required value={formData.mealPlane} onChange={handleInputChange} className={inputClass}>
                <option value="">Select Meal Plan</option>
                <option value="RO">RO (Room Only)</option>
                <option value="BB">BB (Bed and Breakfast)</option>
                <option value="HB">HB (Half Board)</option>
                <option value="FB">FB (Full Board)</option>
              </select>
            </div>
          </div>

          {/* Additional Requirements */}
          <div>
            <label className={labelClass}>Additional Requirements</label>
            <textarea name="additionalRequirements" rows={3} value={formData.additionalRequirements} onChange={handleInputChange} placeholder="Any notes?" className={inputClass}></textarea>
          </div>

          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md">
            Submit Inquiry
          </button>
        </form>
      </div>
      <TawkToChat />
    </div>
  );
};

export default TourBookingForm;