import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { initialJobs } from './data';
import { Button } from './components/UI';
import JobModal from './components/JobModal';
import JobCard from './components/JobCard';

function App() {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    jobType: [],
    employmentType: [],
    seniority: []
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  // --- CRUD Handlers ---
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

  // --- Filter Logic ---
  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  // --- Search & Filter Application ---
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesJobType = filters.jobType.length === 0 || filters.jobType.includes(job.jobType);
      const matchesEmpType = filters.employmentType.length === 0 || filters.employmentType.includes(job.employmentType);
      
      return matchesSearch && matchesJobType && matchesEmpType;
    });
  }, [jobs, searchTerm, filters]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg font-bold">J</div>
              Jobseeker
            </h1>
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
              <a href="#" className="text-slate-900">Jobs</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Companies</a>
              <a href="#" className="hover:text-slate-900 transition-colors">About Us</a>
            </div>
          </div>
          <Button onClick={openAddModal} className="hidden sm:flex">
            <Plus size={18} /> Add New Job
          </Button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="bg-white pb-12 pt-16 px-4 text-center border-b border-slate-200">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Find Your Dream Job <br className="hidden md:block" /> at Top Companies
        </h2>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search by job title or company..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <aside className="hidden lg:block space-y-8 sticky top-24 h-fit">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">Filters</h3>
              <button 
                onClick={() => setFilters({ jobType: [], employmentType: [], seniority: [] })}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 text-slate-700 text-sm uppercase tracking-wide">Job Type</h4>
                <div className="space-y-2.5">
                  {["Engineering", "Design", "Marketing", "Developer"].map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          checked={filters.jobType.includes(type)}
                          onChange={() => toggleFilter('jobType', type)}
                          className="peer h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                      </div>
                      <span className="text-slate-600 group-hover:text-blue-600 transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-slate-700 text-sm uppercase tracking-wide">Employment Type</h4>
                <div className="space-y-2.5">
                  {["Full Time", "Part Time", "Freelance", "Contract"].map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={filters.employmentType.includes(type)}
                        onChange={() => toggleFilter('employmentType', type)}
                        className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4" 
                      />
                      <span className="text-slate-600 group-hover:text-blue-600 transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Job List Area */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="font-bold text-xl text-slate-900">Recommended Jobs</h3>
                <p className="text-slate-500 mt-1">Showing {filteredJobs.length} results</p>
              </div>
              <Button onClick={openAddModal} className="sm:hidden text-sm">
                <Plus size={16} /> Add Job
              </Button>
            </div>

            <div className="space-y-4">
              {filteredJobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onEdit={openEditModal} 
                  onDelete={handleDeleteJob} 
                />
              ))}
              
              {filteredJobs.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <div className="text-slate-300 mb-4">
                    <Search size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">No jobs found</h3>
                  <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                  <Button 
                    variant="secondary" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setFilters({ jobType: [], employmentType: [], seniority: [] });
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

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