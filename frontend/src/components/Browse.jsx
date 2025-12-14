
import React, { useState, useEffect } from 'react';
import { FileSearch, Briefcase, MapPin, Filter } from 'lucide-react';
import Job from './Job';
import Navbar from './shared/Navbar';
import { JOB_API_END_POINT } from '@/utils/constant';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

function Browse() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    location: ''
  });
  const [filters, setFilters] = useState({
    remote: false,
    fullTime: false
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keywordQuery = params.get('keyword') || '';
    const locationQuery = params.get('location') || '';

    setSearchParams({ keyword: keywordQuery, location: locationQuery });
    fetchJobs(keywordQuery, locationQuery);
  }, [window.location.search]);

  const fetchJobs = async (keyword = '', location = '') => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (location) params.append('location', location);

      const response = await fetch(`${JOB_API_END_POINT}/get?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');

      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (err) {
      setError(err.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchParams.keyword) params.append('keyword', searchParams.keyword);
    if (searchParams.location) params.append('location', searchParams.location);
    window.history.pushState({}, '', `?${params.toString()}`);
    fetchJobs(searchParams.keyword, searchParams.location);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Search Section */}
      <div className="bg-white border-b border-gray-200 py-8 mb-8 shadow-sm">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:flex md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="pl-10"
                  value={searchParams.keyword}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, keyword: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="City, state, or remote"
                  className="pl-10"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
            <Button type="submit" className="w-full md:w-auto">
              Search Jobs
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {searchParams.keyword || searchParams.location
                ? `Search Results for "${searchParams.keyword}${searchParams.location ? ` in ${searchParams.location}` : ''}"`
                : "All Available Jobs"}
              <span className="text-gray-600 ml-2 text-lg">
                ({jobs.length} {jobs.length === 1 ? "job" : "jobs"})
              </span>
            </h2>
          </div>
          {/* <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button> */}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>Error loading jobs: {error}</AlertDescription>
          </Alert>
        )}

        {/* Results Grid */}
        {!loading && jobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
                <Job job={job} />
              </Card>
            ))}
          </div>
        ) : !loading && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <FileSearch className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or removing some filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Browse;