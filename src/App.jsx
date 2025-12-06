// src/App.jsx
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Trash2, Edit, Plus } from 'lucide-react';
import { initialJobs } from './data';
import { Button } from './components/UI';
import JobModal from './components/JobModal';

function App() {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    jobType: [],
    employmentType: [],
    seniority: []
  });
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // --- CRUD Logic  ---
  const handleAddJob = (job) => {
    setJobs([job, ...jobs]);
  };

  const handleEditJob = (updatedJob) => {
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
  };

  const handleDeleteJob = (id) => {
    if(confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  // --- Filter Logic  ---
  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  // --- Search & Filter Application [cite: 5, 6] ---
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Search Check
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter Checks
      const matchesJobType = filters.jobType.length === 0 || filters.jobType.includes(job.jobType);
      const matchesEmpType = filters.employmentType.length === 0 || filters.employmentType.includes(job.employmentType);
      const matchesSeniority = filters.seniority.length === 0 || filters.seniority.includes(job.seniority);

      return matchesSearch && matchesJobType && matchesEmpType && matchesSeniority;
    });
  }, [jobs, searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navbar [cite: 13-17] */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg">J</div>
              Jobseeker
            </h1>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
              <a href="#" className="text-black">Jobs</a>
              <a href="#" className="hover:text-black">Companies</a>
              <a href="#" className="hover:text-black">About Us</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={openAddModal} className="flex items-center gap-2">
              <Plus size={16} /> Add Job
            </Button>
          </div>
        </div>
      </nav>

      {/* Header Section [cite: 22, 23] */}
      <header className="bg-white pb-12 pt-16 px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          The Most Complete Job <br /> Listings In The World
        </h2>
        
        {/* Search Bar  */}
        <div className="max-w-2xl mx-auto mt-8 relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search job title or keyword"
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters [cite: 6, 18-20] */}
          <aside className="hidden lg:block space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Filter</h3>
              <button 
                onClick={() => setFilters({ jobType: [], employmentType: [], seniority: [] })}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Filter Group: Job Type */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-700">Job Type</h4>
              <div className="space-y-2">
                {["Engineering", "Design", "Marketing", "Developer"].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.jobType.includes(type)}
                      onChange={() => toggleFilter('jobType', type)}
                      className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Employment Type */}
            <div>
              <h4 className="font-semibold mb-3 text-gray-700">Employment Type</h4>
              <div className="space-y-2">
                {["Full Time", "Part Time", "Freelance", "Contract"].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.employmentType.includes(type)}
                      onChange={() => toggleFilter('employmentType', type)}
                      className="rounded text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Job List  */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">
                {filteredJobs.length} <span className="text-gray-500 font-normal">Jobs Found</span>
              </h3>
            </div>

            <div className="space-y-4">
              {filteredJobs.map(job => (
                <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      {/* Logo Handling */}
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                        {job.logo ? (
                          <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl font-bold text-gray-400">{job.company[0]}</span>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">{job.title}</h4>
                        <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><Briefcase size={14} /> {job.company}</span>
                          <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                          <span className="flex items-center gap-1"><DollarSign size={14} /> {job.salary}</span>
                          <span>• {job.date}</span>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex gap-2 mt-4">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                            {job.employmentType}
                          </span>
                          <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                            {job.seniority}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Edit/Delete Actions  */}
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(job)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDeleteJob(job.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredJobs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No jobs found matching your criteria.
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <JobModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={editingJob ? handleEditJob : handleAddJob}
        editingJob={editingJob}
      />
    </div>
  );
}

export default App;