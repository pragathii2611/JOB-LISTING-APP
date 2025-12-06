import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { Button, Input, Select } from './UI';

const JobModal = ({ isOpen, onClose, onSave, editingJob }) => {
  const initialForm = {
    title: '', company: '', logo: null, location: '', salary: '',
    jobType: '', employmentType: '', seniority: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [preview, setPreview] = useState(null);

  // Load data when editing
  useEffect(() => {
    if (editingJob) {
      setFormData(editingJob);
      setPreview(editingJob.logo);
    } else {
      setFormData(initialForm);
      setPreview(null);
    }
  }, [editingJob, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload with Preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setFormData({ ...formData, logo: objectUrl });
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.company) return alert("Please fill required fields");
    
    onSave({
      ...formData,
      id: editingJob ? editingJob.id : Date.now(),
      date: editingJob ? editingJob.date : new Date().toLocaleDateString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {editingJob ? 'Edit Job Posting' : 'Create New Job'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input label="Job Title *" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Senior Frontend Developer" />
          </div>
          
          <Input label="Company Name *" name="company" value={formData.company} onChange={handleChange} placeholder="e.g. Google" />
          
          {/* Custom Logo Upload UI */}
          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-sm font-semibold text-gray-700">Company Logo</label>
            <div className="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-white">
              <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Upload size={16} className="text-gray-400" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm text-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
          </div>

          <Select 
            label="Job Type" name="jobType" value={formData.jobType} onChange={handleChange}
            options={["Engineering", "Design", "Marketing", "Developer", "Sales"]} 
          />
          <Select 
            label="Employment Type" name="employmentType" value={formData.employmentType} onChange={handleChange}
            options={["Full Time", "Part Time", "Contract", "Freelance"]} 
          />
           <Select 
            label="Seniority Level" name="seniority" value={formData.seniority} onChange={handleChange}
            options={["Intern", "Junior", "Mid-level", "Senior"]} 
          />
          <Input label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Remote" />
          <Input label="Salary" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g. $80,000 - $120,000" />
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{editingJob ? 'Save Changes' : 'Publish Job'}</Button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;