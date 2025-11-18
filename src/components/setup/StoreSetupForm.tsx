import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import ImageUpload from '../ui/ImageUpload';

const StoreSetupForm: React.FC = () => {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [logo, setLogo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend.
    // For now, we save to localStorage to simulate a session.
    const storeDetails = {
        storeName,
        ownerName,
        mobileNumber,
        gstNumber,
        logo,
    };
    localStorage.setItem('vyaparai_store_details', JSON.stringify(storeDetails));
    localStorage.setItem('vyaparai_setup_complete', 'true');

    // Redirect to the dashboard
    navigate('/app/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ImageUpload onImageSelect={setLogo} />
      <div className="space-y-4">
        <Input
          id="storeName"
          label="Store Name"
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          required
        />
        <Input
          id="ownerName"
          label="Owner Name"
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
        />
        <Input
          id="mobileNumber"
          label="Mobile Number"
          type="tel"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="For sending invoices"
          required
        />
        <Input
          id="gstNumber"
          label="GST Number (Optional)"
          type="text"
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Complete Setup
      </Button>
    </form>
  );
};

export default StoreSetupForm;
