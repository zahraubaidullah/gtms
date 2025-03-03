import React, { useState, useRef } from 'react';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/router';

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    verificationMethod: 'nic', // 'nic' or 'license'
  });
  
  const [verificationFile, setVerificationFile] = useState<File | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVerificationFile(e.target.files[0]);
    }
  };
  
  const validateForm = () => {
    // Reset errors
    setError('');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Password validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    // Password matching
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    // Verification document
    if (!verificationFile) {
      setError(`Please upload your ${formData.verificationMethod === 'nic' ? 'National ID Card' : 'NGJA/CGJTA License'}`);
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      console.log('Supabase client initialised:', !!supabase);  
      // 1. Create the user account
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            verification_method: formData.verificationMethod,
            verification_status: 'pending',
          }
        }
      });
      
      if (authError) throw authError;
      
      if (data && data.user) {
        // 2. Upload verification document
        if (verificationFile) {
          const fileExt = verificationFile.name.split('.').pop();
          const fileName = `${data.user.id}_verification.${fileExt}`;

          console.log('Uploading file:', fileName);
          
          const timestamp = new Date().getTime();
        const uniqueFileName = `${data.user.id}_${timestamp}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('verification-documents')
          .upload(uniqueFileName, verificationFile, {
            cacheControl: '3600',
            upsert: false // Create a new file, don't overwrite
          });
        
        // Log upload results for debugging
        console.log('Upload result:', uploadData, uploadError);
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }
        
        // Get the file's public URL
        const { data: urlData } = supabase.storage
          .from('verification-documents')
          .getPublicUrl(uniqueFileName);
        
        const filePath = urlData?.publicUrl || uniqueFileName;

        const { error: updateError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          verification_method: formData.verificationMethod,
          verification_status: 'pending',
          verification_document_path: filePath
        });
      
      if (updateError) {
        console.error('Profile update error:', updateError);
        throw updateError;
      }
    }
    
    setSuccess('Registration successful! Please check your email to verify your account.');
    setTimeout(() => {
      router.push('/auth/verification-pending');
    }, 3000);
  }

    } catch (error: unknown) {
      console.error('Registration error:', error);
      const errorMessage = error instanceof Error
      ? error.message
      : 'An error occured during registration'
      setError(errorMessage || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Verification Method</label>
          <select
            name="verificationMethod"
            value={formData.verificationMethod}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="nic">National ID Card (NIC)</option>
            <option value="license">NGJA/CGJTA Membership License</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Upload {formData.verificationMethod === 'nic' ? 'National ID Card' : 'NGJA/CGJTA License'}
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            accept="image/*,.pdf"
          />
          <p className="text-sm text-gray-500 mt-1">
            Please upload a clear image or scan of your {formData.verificationMethod === 'nic' ? 'National ID Card' : 'NGJA/CGJTA License'}
          </p>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;