import React from 'react';
import { MapPin, Briefcase, DollarSign, Trash2, Edit } from 'lucide-react';

const JobCard = ({ job, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex gap-4 w-full">
          {/* Company Logo / Placeholder */}
          <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
            {job.logo ? (
              <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-gray-400">{job.company?.charAt(0)}</span>
            )}
          </div>
          
          <div className="flex-1">
            <h4 className="font-bold text-lg text-gray-900 leading-tight mb-1">{job.title}</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 mb-3">
              <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.company}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
              <span className="flex items-center gap-1.5"><DollarSign size={14} /> {job.salary}</span>
              <span className="text-gray-400">• {job.date}</span>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">
                {job.employmentType}
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-100">
                {job.seniority}
              </span>
              <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-semibold border border-orange-100">
                {job.jobType}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 self-end sm:self-start">
          <button 
            onClick={() => onEdit(job)} 
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit size={18} />
          </button>
          <button 
            onClick={() => onDelete(job.id)} 
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;