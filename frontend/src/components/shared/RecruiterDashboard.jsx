
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Calendar, Users, Briefcase, FileText, TrendingUp, Award, RefreshCw, ChevronDown, Filter, Check, X, Clock } from 'lucide-react';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import Navbar from './Navbar';

const RecruiterDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState('14d');
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedJob, setExpandedJob] = useState(null);

  // Colors for the dashboard
  const colors = {
    primary: "#4F46E5",
    secondary: "#6366F1",
    accent: "#8B5CF6",
    pending: "#FBBF24",
    accepted: "#10B981",
    rejected: "#EF4444",
    background: "#F9FAFB",
    card: "#FFFFFF",
    text: "#1F2937",
    lightText: "#6B7280"
  };

  const statusColors = {
    pending: "#FBBF24",
    accepted: "#10B981",
    rejected: "#EF4444"
  };

  const CHART_COLORS = [
    "#4F46E5", "#6366F1", "#8B5CF6", "#EC4899",
    "#F43F5E", "#14B8A6", "#10B981", "#FBBF24",
    "#F97316", "#3B82F6"
  ];

  // Fetch data from your actual backend API
  useEffect(() => {
    const fetchDashboardData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${COMPANY_API_END_POINT}/dashboard`, {
            withCredentials: true,
          });

          // Axios already parses JSON, so use response.data directly
          if (response.data.status) {
            setDashboardData(response.data.data);
          } else {
            setError(response.data.message || 'Failed to fetch dashboard data');
          }
        } catch (err) {
          setError('Error connecting to server');
          console.error('Dashboard fetch error:', err);
        } finally {
          setLoading(false);
        }
      };


    fetchDashboardData();

    // Optional: Set up periodic refresh (e.g., every 5 minutes)
    const refreshInterval = setInterval(fetchDashboardData, 5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${COMPANY_API_END_POINT}/dashboard`, {
        withCredentials: true,
      });

      if (response.data.status) {
        setDashboardData(response.data.data);
        setError(null);
      } else {
        setError(response.data.message || 'Failed to refresh dashboard data');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Dashboard refresh error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Get status badge with appropriate color
  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'accepted': return 'bg-green-100 text-green-800';
        case 'rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getStatusIcon = (status) => {
      switch (status.toLowerCase()) {
        case 'pending': return <Clock size={14} className="mr-1" />;
        case 'accepted': return <Check size={14} className="mr-1" />;
        case 'rejected': return <X size={14} className="mr-1" />;
        default: return null;
      }
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(status)}`}>
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to load dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <RefreshCw size={16} className="mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar></Navbar>
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Recruiter Dashboard</h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className={`flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
            </button>

            <div className="flex rounded-lg overflow-hidden border shadow-sm">
              <button
                className={`px-3 py-2 text-sm ${timeFilter === '7d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setTimeFilter('7d')}
              >
                7D
              </button>
              <button
                className={`px-3 py-2 text-sm ${timeFilter === '14d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setTimeFilter('14d')}
              >
                14D
              </button>
              <button
                className={`px-3 py-2 text-sm ${timeFilter === '30d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setTimeFilter('30d')}
              >
                30D
              </button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Jobs</p>
                <h3 className="text-3xl font-bold mt-1 text-gray-800">{dashboardData?.totalJobs || 0}</h3>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <Briefcase size={24} className="text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Applications</p>
                <h3 className="text-3xl font-bold mt-1 text-gray-800">{dashboardData?.totalApplications || 0}</h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText size={24} className="text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Application Rate</p>
                <h3 className="text-3xl font-bold mt-1 text-gray-800">
                  {dashboardData?.totalJobs ? (dashboardData.totalApplications / dashboardData.totalJobs).toFixed(1) : 0}
                  <span className="text-base font-normal text-gray-500"> per job</span>
                </h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b">
          <div className="flex overflow-x-auto">
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'applications' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('applications')}
            >
              Applications
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'jobs' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('jobs')}
            >
              Jobs
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'trends' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('trends')}
            >
              Trends
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Status Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Applications by Status</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData?.jobsByStatus || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="count"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {dashboardData?.jobsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={statusColors[entry.status]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => [`${value} applications`, props.payload.status]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-4 gap-4">
                {dashboardData?.jobsByStatus.map((status) => (
                  <div key={status.status} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: statusColors[status.status] }}></div>
                    <span className="text-sm text-gray-600 capitalize">{status.status}: {status.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Trend Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Application Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData?.applicationTrend || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      stroke="#9ca3af"
                    />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      formatter={(value) => [`${value} applications`, 'Applications']}
                      labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke={colors.primary}
                      strokeWidth={2}
                      dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
                      activeDot={{ fill: colors.primary, strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Applications by Job */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Applications by Job</h3>
              {dashboardData?.applicationsByJob.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No job applications data available
                </div>
              ) : (
                <div className="h-64 overflow-auto">
                  <ResponsiveContainer width="100%" height={Math.max(100, dashboardData?.applicationsByJob.length * 50)}>
                    <BarChart
                      data={dashboardData?.applicationsByJob || []}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" stroke="#9ca3af" />
                      <YAxis
                        type="category"
                        dataKey="jobTitle"
                        width={150}
                        stroke="#9ca3af"
                        tickFormatter={(value) => value.length > 15 ? value.substring(0, 15) + '...' : value}
                      />
                      <Tooltip
                        formatter={(value) => [`${value} applications`, 'Applications']}
                        labelFormatter={(label) => label}
                      />
                      <Bar dataKey="applicationCount" fill={colors.secondary} barSize={20} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Recent Applications */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Applications</h3>
              {dashboardData?.recentApplications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No recent applications
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-auto">
                  {dashboardData?.recentApplications.map((application) => (
                    <div key={application.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="bg-indigo-100 text-indigo-700 rounded-full h-10 w-10 flex items-center justify-center mr-3 flex-shrink-0">
                        {application.candidateName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-medium text-gray-800 truncate">{application.candidateName}</p>
                        <p className="text-sm text-gray-500 truncate">{application.jobTitle}</p>
                        <div className="flex mt-1 items-center justify-between">
                          <StatusBadge status={application.status} />
                          <span className="text-xs text-gray-400">
                            {new Date(application.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default RecruiterDashboard;



// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
// import { Calendar, Users, Briefcase, FileText, TrendingUp, Award, RefreshCw, ChevronDown, Filter, Check, X, Clock, ArrowUp, ArrowDown, MoreHorizontal, Bell, Search } from 'lucide-react';
// import { COMPANY_API_END_POINT } from '@/utils/constant';
// import axios from 'axios';
// import Navbar from './Navbar';

// const RecruiterDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeFilter, setTimeFilter] = useState('14d');
//   const [activeTab, setActiveTab] = useState('overview');
//   const [expandedJob, setExpandedJob] = useState(null);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // Theme colors
//   const colors = {
//     primary: "#4338ca",
//     secondary: "#6366F1",
//     accent: "#8B5CF6",
//     pending: "#f59e0b",
//     accepted: "#10B981",
//     rejected: "#f43f5e",
//     background: "#F9FAFB",
//     card: "#FFFFFF",
//     text: "#1F2937",
//     lightText: "#6B7280"
//   };

//   const statusColors = {
//     pending: "#f59e0b",
//     accepted: "#10B981",
//     rejected: "#f43f5e"
//   };

//   const CHART_COLORS = [
//     "#4338ca", "#6366F1", "#8B5CF6", "#EC4899",
//     "#F43F5E", "#14B8A6", "#10B981", "#f59e0b",
//     "#F97316", "#3B82F6"
//   ];

//   // Fetch data from your actual backend API
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//         try {
//           setLoading(true);
//           const response = await axios.get(`${COMPANY_API_END_POINT}/dashboard`, {
//             withCredentials: true,
//           });

//           // Axios already parses JSON, so use response.data directly
//           if (response.data.status) {
//             setDashboardData(response.data.data);
//           } else {
//             setError(response.data.message || 'Failed to fetch dashboard data');
//           }
//         } catch (err) {
//           setError('Error connecting to server');
//           console.error('Dashboard fetch error:', err);
//         } finally {
//           setLoading(false);
//         }
//       };


//     fetchDashboardData();

//     // Optional: Set up periodic refresh (e.g., every 5 minutes)
//     const refreshInterval = setInterval(fetchDashboardData, 5 * 60 * 1000);

//     return () => clearInterval(refreshInterval);
//   }, []);

//   const handleRefresh = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${COMPANY_API_END_POINT}/dashboard`, {
//         withCredentials: true,
//       });

//       if (response.data.status) {
//         setDashboardData(response.data.data);
//         setError(null);
//       } else {
//         setError(response.data.message || 'Failed to refresh dashboard data');
//       }
//     } catch (err) {
//       setError('Error connecting to server');
//       console.error('Dashboard refresh error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };

//   // Get status badge with appropriate color
//   const StatusBadge = ({ status }) => {
//     const getStatusColor = (status) => {
//       switch (status.toLowerCase()) {
//         case 'pending': return 'bg-amber-100 text-amber-800';
//         case 'accepted': return 'bg-emerald-100 text-emerald-800';
//         case 'rejected': return 'bg-rose-100 text-rose-800';
//         default: return 'bg-gray-100 text-gray-800';
//       }
//     };

//     const getStatusIcon = (status) => {
//       switch (status.toLowerCase()) {
//         case 'pending': return <Clock size={14} className="mr-1" />;
//         case 'accepted': return <Check size={14} className="mr-1" />;
//         case 'rejected': return <X size={14} className="mr-1" />;
//         default: return null;
//       }
//     };

//     return (
//       <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(status)}`}>
//         {getStatusIcon(status)}
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </span>
//     );
//   };

//   // Calculate percentage change for KPI cards
//   const getPercentChange = (value, previousValue) => {
//     if (!previousValue) return { value: 0, isPositive: true };
//     const change = ((value - previousValue) / previousValue) * 100;
//     return {
//       value: Math.abs(change).toFixed(1),
//       isPositive: change >= 0
//     };
//   };

//   const KpiCard = ({ title, value, previousValue, icon: Icon, color }) => {
//     const change = getPercentChange(value, previousValue || value * 0.9);

//     return (
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
//         <div className="flex items-start justify-between">
//           <div>
//             <p className="text-gray-500 text-sm font-medium">{title}</p>
//             <h3 className="text-3xl font-bold mt-1 text-gray-800">
//               {typeof value === 'number' ? value.toLocaleString() : value}
//             </h3>
//             <div className="flex items-center mt-2">
//               <span className={`flex items-center text-xs font-medium ${change.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
//                 {change.isPositive ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
//                 {change.value}%
//               </span>
//               <span className="text-xs text-gray-500 ml-1">vs previous period</span>
//             </div>
//           </div>
//           <div className={`p-3 rounded-lg`} style={{ backgroundColor: `${color}15` }}>
//             <Icon size={24} style={{ color: color }} />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Search and filter component
//   const FiltersBar = () => (
//     <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
//       <div className="relative w-full md:w-64">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <Search size={16} className="text-gray-400" />
//         </div>
//         <input
//           type="text"
//           placeholder="Search jobs or candidates..."
//           className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//         />
//       </div>

//       <div className="flex items-center gap-2 ml-auto">
//         <button
//           onClick={() => setIsFilterOpen(!isFilterOpen)}
//           className="flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50"
//         >
//           <Filter size={16} className="mr-2 text-gray-500" />
//           Filters
//           <ChevronDown size={16} className={`ml-2 text-gray-500 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`} />
//         </button>

//         <div className="flex rounded-lg overflow-hidden border shadow-sm">
//           <button
//             className={`px-3 py-2 text-sm ${timeFilter === '7d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//             onClick={() => setTimeFilter('7d')}
//           >
//             7D
//           </button>
//           <button
//             className={`px-3 py-2 text-sm ${timeFilter === '14d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//             onClick={() => setTimeFilter('14d')}
//           >
//             14D
//           </button>
//           <button
//             className={`px-3 py-2 text-sm ${timeFilter === '30d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//             onClick={() => setTimeFilter('30d')}
//           >
//             30D
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Animated loader
//   if (loading && !dashboardData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-700">Loading dashboard data...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && !dashboardData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
//           <div className="text-red-500 text-5xl mb-4">⚠️</div>
//           <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to load dashboard</h3>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={handleRefresh}
//             className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//           >
//             <RefreshCw size={16} className="mr-2" />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//     <Navbar></Navbar>
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Recruiter Dashboard</h1>
//             <p className="text-gray-500">Monitor your recruitment pipeline and performance</p>
//           </div>

//           <div className="flex items-center gap-3 mt-4 md:mt-0">
//             <button className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
//               <Bell size={20} />
//             </button>
//             <button
//               onClick={handleRefresh}
//               disabled={loading}
//               className={`flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             >
//               <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
//               <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
//             </button>
//           </div>
//         </div>

//         <FiltersBar />

//         {/* Overview Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//           <KpiCard
//             title="Total Jobs"
//             value={dashboardData?.totalJobs || 0}
//             previousValue={(dashboardData?.totalJobs || 0) * 0.9}
//             icon={Briefcase}
//             color={colors.primary}
//           />

//           <KpiCard
//             title="Total Applications"
//             value={dashboardData?.totalApplications || 0}
//             previousValue={(dashboardData?.totalApplications || 0) * 0.85}
//             icon={FileText}
//             color={colors.secondary}
//           />

//           <KpiCard
//             title="Application Rate"
//             value={dashboardData?.totalJobs ?
//               (dashboardData.totalApplications / dashboardData.totalJobs).toFixed(1) + " per job" :
//               "0 per job"
//             }
//             previousValue={(dashboardData?.totalJobs && dashboardData?.totalApplications) ?
//               ((dashboardData.totalApplications * 0.85) / dashboardData.totalJobs).toFixed(1) :
//               null
//             }
//             icon={TrendingUp}
//             color={colors.accepted}
//           />

//           <KpiCard
//             title="Hiring Success Rate"
//             value={(dashboardData?.jobsByStatus?.find(s => s.status === 'accepted')?.count || 0) + "%"}
//             previousValue={((dashboardData?.jobsByStatus?.find(s => s.status === 'accepted')?.count || 0) * 0.95)}
//             icon={Award}
//             color={colors.accent}
//           />
//         </div>

//         {/* Tabs */}
//         <div className="mb-6 border-b">
//           <div className="flex overflow-x-auto">
//             <button
//               className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//               onClick={() => setActiveTab('overview')}
//             >
//               Overview
//             </button>
//             <button
//               className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'applications' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//               onClick={() => setActiveTab('applications')}
//             >
//               Applications
//             </button>
//             <button
//               className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'jobs' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//               onClick={() => setActiveTab('jobs')}
//             >
//               Jobs
//             </button>
//             <button
//               className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'trends' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//               onClick={() => setActiveTab('trends')}
//             >
//               Trends
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Application Status Chart */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-lg font-bold text-gray-800">Applications by Status</h3>
//                 <button className="text-gray-400 hover:text-gray-600">
//                   <MoreHorizontal size={20} />
//                 </button>
//               </div>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={dashboardData?.jobsByStatus || []}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={80}
//                       outerRadius={110}
//                       paddingAngle={5}
//                       dataKey="count"
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                       labelLine={false}
//                     >
//                       {dashboardData?.jobsByStatus.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={statusColors[entry.status]} cornerRadius={4} />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       formatter={(value, name, props) => [`${value} applications`, props.payload.status]}
//                       contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none' }}
//                     />
//                     <Legend verticalAlign="bottom" iconType="circle" iconSize={10} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="flex justify-center mt-4 gap-6">
//                 {dashboardData?.jobsByStatus.map((status) => (
//                   <div key={status.status} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
//                     <div className="w-3 h-3 rounded-full mb-1" style={{ backgroundColor: statusColors[status.status] }}></div>
//                     <span className="text-sm font-medium text-gray-800 capitalize">{status.status}</span>
//                     <span className="text-2xl font-bold text-gray-900">{status.count}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Application Trend Chart */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">Application Trends</h3>
//                   <p className="text-sm text-gray-500">Daily application submissions</p>
//                 </div>
//                 <button className="text-gray-400 hover:text-gray-600">
//                   <MoreHorizontal size={20} />
//                 </button>
//               </div>
//               <div className="h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={dashboardData?.applicationTrend || []}>
//                     <defs>
//                       <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
//                         <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
//                     <XAxis
//                       dataKey="date"
//                       tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                       stroke="#9ca3af"
//                       axisLine={false}
//                       tickLine={false}
//                       padding={{ left: 10, right: 10 }}
//                     />
//                     <YAxis
//                       stroke="#9ca3af"
//                       axisLine={false}
//                       tickLine={false}
//                       width={40}
//                     />
//                     <Tooltip
//                       formatter={(value) => [`${value} applications`, 'Applications']}
//                       labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                       contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none' }}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="count"
//                       stroke={colors.primary}
//                       strokeWidth={3}
//                       dot={{ fill: colors.primary, strokeWidth: 2, r: 0 }}
//                       activeDot={{ fill: colors.primary, strokeWidth: 2, r: 6 }}
//                       fillOpacity={1}
//                       fill="url(#colorApplications)"
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-6">
//             {/* Applications by Job */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">Applications by Job</h3>
//                   <p className="text-sm text-gray-500">Most active positions</p>
//                 </div>
//                 <button className="text-gray-400 hover:text-gray-600">
//                   <MoreHorizontal size={20} />
//                 </button>
//               </div>
//               {dashboardData?.applicationsByJob.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">
//                   No job applications data available
//                 </div>
//               ) : (
//                 <div className="h-64 overflow-auto">
//                   <ResponsiveContainer width="100%" height={Math.max(100, dashboardData?.applicationsByJob.length * 50)}>
//                     <BarChart
//                       data={dashboardData?.applicationsByJob || []}
//                       layout="vertical"
//                       margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
//                       <XAxis
//                         type="number"
//                         stroke="#9ca3af"
//                         axisLine={false}
//                         tickLine={false}
//                       />
//                       <YAxis
//                         type="category"
//                         dataKey="jobTitle"
//                         width={160}
//                         stroke="#9ca3af"
//                         tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value}
//                         axisLine={false}
//                         tickLine={false}
//                       />
//                       <Tooltip
//                         formatter={(value) => [`${value} applications`, 'Applications']}
//                         labelFormatter={(label) => label}
//                         contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none' }}
//                       />
//                       <Bar
//                         dataKey="applicationCount"
//                         fill={colors.secondary}
//                         barSize={12}
//                         radius={[0, 4, 4, 0]}
//                         animationDuration={1000}
//                       />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               )}
//             </div>

//             {/* Recent Applications */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
//               <div className="flex justify-between items-center mb-6">
//                 <div>
//                   <h3 className="text-lg font-bold text-gray-800">Recent Applications</h3>
//                   <p className="text-sm text-gray-500">Latest candidates</p>
//                 </div>
//                 <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
//                   View all
//                 </button>
//               </div>
//               {dashboardData?.recentApplications.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">
//                   No recent applications
//                 </div>
//               ) : (
//                 <div className="space-y-4 max-h-96 overflow-auto rounded-lg">
//                   {dashboardData?.recentApplications.map((application) => (
//                     <div key={application.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                       <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg h-10 w-10 flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
//                         {application.candidateName.charAt(0).toUpperCase()}
//                       </div>
//                       <div className="flex-grow min-w-0">
//                         <div className="flex items-start justify-between">
//                           <p className="font-medium text-gray-800 truncate">{application.candidateName}</p>
//                           <span className="text-xs text-gray-400 flex items-center ml-2 whitespace-nowrap">
//                             <Calendar size={12} className="mr-1" />
//                             {new Date(application.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-500 truncate">{application.jobTitle}</p>
//                         <div className="flex mt-2 items-center justify-between">
//                           <StatusBadge status={application.status} />
//                           <button className="text-gray-400 hover:text-gray-600">
//                             <MoreHorizontal size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default RecruiterDashboard;






// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
// import { Calendar, Users, Briefcase, FileText, TrendingUp, Award, RefreshCw, ChevronDown, Filter, Check, X, Clock, ArrowUp, ArrowDown, MoreHorizontal, Bell, Search } from 'lucide-react';
// import { COMPANY_API_END_POINT } from '@/utils/constant';
// import axios from 'axios';
// import Navbar from './Navbar';

// const RecruiterDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeFilter, setTimeFilter] = useState('14d');
//   const [activeTab, setActiveTab] = useState('overview');
//   const [expandedJob, setExpandedJob] = useState(null);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

//   // Theme colors
//   const colors = {
//     primary: "#4338ca",
//     secondary: "#6366F1",
//     accent: "#8B5CF6",
//     pending: "#f59e0b",
//     accepted: "#10B981",
//     rejected: "#f43f5e",
//     background: "#F9FAFB",
//     card: "#FFFFFF",
//     text: "#1F2937",
//     lightText: "#6B7280"
//   };

//   const statusColors = {
//     pending: "#f59e0b",
//     accepted: "#10B981",
//     rejected: "#f43f5e"
//   };

//   const CHART_COLORS = [
//     "#4338ca", "#6366F1", "#8B5CF6", "#EC4899",
//     "#F43F5E", "#14B8A6", "#10B981", "#f59e0b",
//     "#F97316", "#3B82F6"
//   ];

//   // Fetch data from your actual backend API
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${COMPANY_API_END_POINT}/dashboard`, {
//           withCredentials: true,
//         });

//         // Axios already parses JSON, so use response.data directly
//         if (response.data.status) {
//           setDashboardData(response.data.data);
//         } else {
//           setError(response.data.message || 'Failed to fetch dashboard data');
//         }
//       } catch (err) {
//         setError('Error connecting to server');
//         console.error('Dashboard fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();

//     // Optional: Set up periodic refresh (e.g., every 5 minutes)
//     const refreshInterval = setInterval(fetchDashboardData, 5 * 60 * 1000);

//     return () => clearInterval(refreshInterval);
//   }, []);

//   const handleRefresh = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${COMPANY_API_END_POINT}/dashboard`, {
//         withCredentials: true,
//       });

//       if (response.data.status) {
//         setDashboardData(response.data.data);
//         setError(null);
//       } else {
//         setError(response.data.message || 'Failed to refresh dashboard data');
//       }
//     } catch (err) {
//       setError('Error connecting to server');
//       console.error('Dashboard refresh error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };

//   // Get status badge with appropriate color
//   const StatusBadge = ({ status }) => {
//     const getStatusColor = (status) => {
//       switch (status.toLowerCase()) {
//         case 'pending': return 'bg-amber-100 text-amber-800';
//         case 'accepted': return 'bg-emerald-100 text-emerald-800';
//         case 'rejected': return 'bg-rose-100 text-rose-800';
//         default: return 'bg-gray-100 text-gray-800';
//       }
//     };

//     const getStatusIcon = (status) => {
//       switch (status.toLowerCase()) {
//         case 'pending': return <Clock size={14} className="mr-1" />;
//         case 'accepted': return <Check size={14} className="mr-1" />;
//         case 'rejected': return <X size={14} className="mr-1" />;
//         default: return null;
//       }
//     };

//     return (
//       <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(status)}`}>
//         {getStatusIcon(status)}
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </span>
//     );
//   };

//   // Calculate percentage change for KPI cards
//   const getPercentChange = (value, previousValue) => {
//     if (!previousValue || isNaN(previousValue) || isNaN(value)) return null;
//     const change = ((value - previousValue) / previousValue) * 100;
//     return {
//       value: Math.abs(change).toFixed(1),
//       isPositive: change >= 0
//     };
//   };

//   const KpiCard = ({ title, value, previousValue, icon: Icon, color }) => {
//     const change = getPercentChange(value, previousValue);

//     return (
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
//         <div className="flex items-start justify-between">
//           <div>
//             <p className="text-gray-500 text-sm font-medium">{title}</p>
//             <h3 className="text-3xl font-bold mt-1 text-gray-800">
//               {typeof value === 'number' ? value.toLocaleString() : value}
//             </h3>
//             {/* {change && (
//               <div className="flex items-center mt-2">
//                 <span className={`flex items-center text-xs font-medium ${change.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
//                   {change.isPositive ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
//                   {change.value}%
//                 </span>
//                 <span className="text-xs text-gray-500 ml-1">vs previous period</span>
//               </div>
//             )} */}
//           </div>
//           <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}15` }}>
//             <Icon size={24} style={{ color: color }} />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Search and filter component
//   const FiltersBar = () => (
//     <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
//       <div className="relative w-full md:w-64">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <Search size={16} className="text-gray-400" />
//         </div>
//         <input
//           type="text"
//           placeholder="Search jobs or candidates..."
//           className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//         />
//       </div>

//       <div className="flex items-center gap-2 ml-auto">
//         <button
//           onClick={() => setIsFilterOpen(!isFilterOpen)}
//           className="flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50"
//         >
//           <Filter size={16} className="mr-2 text-gray-500" />
//           Filters
//           <ChevronDown size={16} className={`ml-2 text-gray-500 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`} />
//         </button>

//         <div className="flex rounded-lg overflow-hidden border shadow-sm">
//           <button
//             className={`px-3 py-2 text-sm ${timeFilter === '7d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//             onClick={() => setTimeFilter('7d')}
//           >
//             7D
//           </button>
//           <button
//             className={`px-3 py-2 text-sm ${timeFilter === '14d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//             onClick={() => setTimeFilter('14d')}
//           >
//             14D
//           </button>
//           <button
//             className={`px-3 py-2 text-sm ${timeFilter === '30d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
//             onClick={() => setTimeFilter('30d')}
//           >
//             30D
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Animated loader
//   if (loading && !dashboardData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-700">Loading dashboard data...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error && !dashboardData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
//           <div className="text-red-500 text-5xl mb-4">⚠️</div>
//           <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to load dashboard</h3>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={handleRefresh}
//             className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//           >
//             <RefreshCw size={16} className="mr-2" />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Calculate application rate correctly
//   const calculateApplicationRate = () => {
//     const totalJobs = dashboardData?.totalJobs || 0;
//     const totalApplications = dashboardData?.totalApplications || 0;

//     if (totalJobs === 0) return "0 per job";
//     return (totalApplications / totalJobs).toFixed(1) + " per job";
//   };

//   // Calculate success rate correctly
//   const calculateSuccessRate = () => {
//     const acceptedJobs = dashboardData?.jobsByStatus?.find(s => s.status === 'accepted')?.count || 0;
//     return acceptedJobs + "%";
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Recruiter Dashboard</h1>
//               <p className="text-gray-500">Monitor your recruitment pipeline and performance</p>
//             </div>

//             <div className="flex items-center gap-3 mt-4 md:mt-0">
//               <button className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
//                 <Bell size={20} />
//               </button>
//               <button
//                 onClick={handleRefresh}
//                 disabled={loading}
//                 className={`flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//               >
//                 <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
//                 <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
//               </button>
//             </div>
//           </div>

//           <FiltersBar />

//           {/* Overview Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//             <KpiCard
//               title="Total Jobs"
//               value={dashboardData?.totalJobs || 0}
//               previousValue={(dashboardData?.totalJobs || 0) * 0.9}
//               icon={Briefcase}
//               color={colors.primary}
//             />

//             <KpiCard
//               title="Total Applications"
//               value={dashboardData?.totalApplications || 0}
//               previousValue={(dashboardData?.totalApplications || 0) * 0.85}
//               icon={FileText}
//               color={colors.secondary}
//             />

//             <KpiCard
//               title="Application Rate"
//               value={calculateApplicationRate()}
//               // Not providing a previousValue to avoid NaN
//               icon={TrendingUp}
//               color={colors.accepted}
//             />

//             <KpiCard
//               title="Hiring Success Rate"
//               value={calculateSuccessRate()}
//               // Not providing a previousValue to avoid NaN
//               icon={Award}
//               color={colors.accent}
//             />
//           </div>

//           {/* Tabs */}
//           <div className="mb-6 border-b">
//             <div className="flex overflow-x-auto">
//               <button
//                 className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//                 onClick={() => setActiveTab('overview')}
//               >
//                 Overview
//               </button>
//               <button
//                 className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'applications' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//                 onClick={() => setActiveTab('applications')}
//               >
//                 Applications
//               </button>
//               <button
//                 className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'jobs' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//                 onClick={() => setActiveTab('jobs')}
//               >
//                 Jobs
//               </button>
//               <button
//                 className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'trends' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//                 onClick={() => setActiveTab('trends')}
//               >
//                 Trends
//               </button>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Application Status Chart */}
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="text-lg font-bold text-gray-800">Applications by Status</h3>
//                   <button className="text-gray-400 hover:text-gray-600">
//                     <MoreHorizontal size={20} />
//                   </button>
//                 </div>
//                 <div className="h-64">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={dashboardData?.jobsByStatus || []}
//                         cx="50%"
//                         cy="50%"
//                         innerRadius={80}
//                         outerRadius={110}
//                         paddingAngle={5}
//                         dataKey="count"
//                         label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                         labelLine={false}
//                       >
//                         {(dashboardData?.jobsByStatus || []).map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={statusColors[entry.status]} cornerRadius={4} />
//                         ))}
//                       </Pie>
//                       <Tooltip
//                         formatter={(value, name, props) => [`${value} applications`, props.payload.status]}
//                         contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none' }}
//                       />
//                       <Legend verticalAlign="bottom" iconType="circle" iconSize={10} />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//                 <div className="flex justify-center mt-4 gap-6">
//                   {(dashboardData?.jobsByStatus || []).map((status) => (
//                     <div key={status.status} className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
//                       <div className="w-3 h-3 rounded-full mb-1" style={{ backgroundColor: statusColors[status.status] }}></div>
//                       <span className="text-sm font-medium text-gray-800 capitalize">{status.status}</span>
//                       <span className="text-2xl font-bold text-gray-900">{status.count}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Application Trend Chart */}
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
//                 <div className="flex justify-between items-center mb-6">
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">Application Trends</h3>
//                     <p className="text-sm text-gray-500">Daily application submissions</p>
//                   </div>
//                   <button className="text-gray-400 hover:text-gray-600">
//                     <MoreHorizontal size={20} />
//                   </button>
//                 </div>
//                 <div className="h-64">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={dashboardData?.applicationTrend || []}>
//                       <defs>
//                         <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
//                           <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
//                       <XAxis
//                         dataKey="date"
//                         tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                         stroke="#9ca3af"
//                         axisLine={false}
//                         tickLine={false}
//                         padding={{ left: 10, right: 10 }}
//                       />
//                       <YAxis
//                         stroke="#9ca3af"
//                         axisLine={false}
//                         tickLine={false}
//                         width={40}
//                       />
//                       <Tooltip
//                         formatter={(value) => [`${value} applications`, 'Applications']}
//                         labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                         contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none' }}
//                       />
//                       <Line
//                         type="monotone"
//                         dataKey="count"
//                         stroke={colors.primary}
//                         strokeWidth={3}
//                         dot={{ fill: colors.primary, strokeWidth: 2, r: 0 }}
//                         activeDot={{ fill: colors.primary, strokeWidth: 2, r: 6 }}
//                         fillOpacity={1}
//                         fill="url(#colorApplications)"
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-6">
//               {/* Applications by Job */}
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
//                 <div className="flex justify-between items-center mb-6">
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">Applications by Job</h3>
//                     <p className="text-sm text-gray-500">Most active positions</p>
//                   </div>
//                   <button className="text-gray-400 hover:text-gray-600">
//                     <MoreHorizontal size={20} />
//                   </button>
//                 </div>
//                 {!(dashboardData?.applicationsByJob?.length) ? (
//                   <div className="text-center py-8 text-gray-500">
//                     No job applications data available
//                   </div>
//                 ) : (
//                   <div className="h-64 overflow-auto">
//                     <ResponsiveContainer width="100%" height={Math.max(100, (dashboardData?.applicationsByJob?.length || 0) * 50)}>
//                       <BarChart
//                         data={dashboardData?.applicationsByJob || []}
//                         layout="vertical"
//                         margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
//                         <XAxis
//                           type="number"
//                           stroke="#9ca3af"
//                           axisLine={false}
//                           tickLine={false}
//                         />
//                         <YAxis
//                           type="category"
//                           dataKey="jobTitle"
//                           width={160}
//                           stroke="#9ca3af"
//                           tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value}
//                           axisLine={false}
//                           tickLine={false}
//                         />
//                         <Tooltip
//                           formatter={(value) => [`${value} applications`, 'Applications']}
//                           labelFormatter={(label) => label}
//                           contentStyle={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none' }}
//                         />
//                         <Bar
//                           dataKey="applicationCount"
//                           fill={colors.secondary}
//                           barSize={12}
//                           radius={[0, 4, 4, 0]}
//                           animationDuration={1000}
//                         />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 )}
//               </div>

//               {/* Recent Applications */}
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
//                 <div className="flex justify-between items-center mb-6">
//                   <div>
//                     <h3 className="text-lg font-bold text-gray-800">Recent Applications</h3>
//                     <p className="text-sm text-gray-500">Latest candidates</p>
//                   </div>
//                   <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
//                     View all
//                   </button>
//                 </div>
//                 {!(dashboardData?.recentApplications?.length) ? (
//                   <div className="text-center py-8 text-gray-500">
//                     No recent applications
//                   </div>
//                 ) : (
//                   <div className="space-y-4 max-h-96 overflow-auto rounded-lg">
//                     {(dashboardData?.recentApplications || []).map((application) => (
//                       <div key={application.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
//                         <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg h-10 w-10 flex items-center justify-center mr-3 flex-shrink-0 shadow-sm">
//                           {application.candidateName.charAt(0).toUpperCase()}
//                         </div>
//                         <div className="flex-grow min-w-0">
//                           <div className="flex items-start justify-between">
//                             <p className="font-medium text-gray-800 truncate">{application.candidateName}</p>
//                             <span className="text-xs text-gray-400 flex items-center ml-2 whitespace-nowrap">
//                               <Calendar size={12} className="mr-1" />
//                               {new Date(application.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-500 truncate">{application.jobTitle}</p>
//                           <div className="flex mt-2 items-center justify-between">
//                             <StatusBadge status={application.status} />
//                             <button className="text-gray-400 hover:text-gray-600">
//                               <MoreHorizontal size={16} />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RecruiterDashboard;