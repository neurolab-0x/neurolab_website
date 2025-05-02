import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import api from '../config/api';
import {
  Mail,
  Phone,
  Globe,
  Briefcase,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  FileText,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Download,
  Copy,
  ExternalLink,
  Plus,
  Trash2,
  LogOut
} from 'lucide-react';

interface PartnerRequest {
  _id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  businessType: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface WhitelistEntry {
  _id: string;
  email: string;
  isRegistered: boolean;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [partnerRequests, setPartnerRequests] = useState<PartnerRequest[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const requestsResponse = await api.get('/partner-requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPartnerRequests(requestsResponse.data.data.partnerRequests || []);

      try {
        const contactsResponse = await api.get('/contacts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContacts(contactsResponse.data.data || []);
      } catch (contactsError) {
        console.error('Error fetching contacts:', contactsError);
        setContacts([]);
      }

      try {
        const whitelistResponse = await api.get('/whitelist', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWhitelist(whitelistResponse.data.data.whitelist || []);
      } catch (whitelistError) {
        console.error('Error fetching whitelist:', whitelistError);
        setWhitelist([]);
      }

      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch data');
      setLoading(false);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const token = localStorage.getItem('token');
      await api.patch(`/partner-requests/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPartnerRequests(prev => prev.map(request =>
        request._id === id ? { ...request, status } : request
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleAddToWhitelist = async () => {
    try {
      setEmailError(null);
      const token = localStorage.getItem('token');

      if (!newEmail) {
        setEmailError('Email is required');
        return;
      }

      const response = await api.post('/whitelist', { email: newEmail }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWhitelist([response.data.data.whitelistEntry, ...whitelist]);
      setNewEmail('');
    } catch (err: any) {
      setEmailError(err.response?.data?.message || 'Failed to add email to whitelist');
    }
  };

  const handleRemoveFromWhitelist = async (email: string) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/whitelist/${email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWhitelist(whitelist.filter(entry => entry.email !== email));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove email from whitelist');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const filteredRequests = partnerRequests.filter(request => {
    const matchesSearch =
      request.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === 'all' ||
      request.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredWhitelist = whitelist.filter(entry =>
    entry.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const stats = {
    totalRequests: partnerRequests.length,
    pendingRequests: partnerRequests.filter(r => r.status === 'pending').length,
    approvedRequests: partnerRequests.filter(r => r.status === 'approved').length,
    rejectedRequests: partnerRequests.filter(r => r.status === 'rejected').length,
    totalContacts: contacts.length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030329] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030329] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030329] relative overflow-hidden">
      {/* Logout Button */}
      <motion.button
        onClick={handleLogout}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </motion.button>

      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Admin Dashboard
                </span>
              </h1>
              <p className="text-gray-300">Manage partnership requests and user contacts</p>
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-6 h-6 text-blue-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search requests and contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-lg border border-white/10">
                  {['all', 'pending', 'approved', 'rejected'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-lg transition-colors ${selectedFilter === filter
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Requests</p>
                <h3 className="text-2xl font-bold text-white">{stats.totalRequests}</h3>
              </div>
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <h3 className="text-2xl font-bold text-yellow-400">{stats.pendingRequests}</h3>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Approved</p>
                <h3 className="text-2xl font-bold text-green-400">{stats.approvedRequests}</h3>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Rejected</p>
                <h3 className="text-2xl font-bold text-red-400">{stats.rejectedRequests}</h3>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Contacts</p>
                <h3 className="text-2xl font-bold text-purple-400">{stats.totalContacts}</h3>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Partnership Requests Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 lg:col-span-2"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">Partnership Requests</h2>
                <span className="text-sm text-gray-400">
                  {filteredRequests.length} of {stats.totalRequests} total
                </span>
              </div>
              <button
                onClick={() => {
                  // Implement export functionality
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Download className="w-5 h-5 text-blue-400" />
              </button>
            </div>
            <div className="space-y-4">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <motion.div
                    key={request._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-white">{request.companyName}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          request.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                          {request.status}
                        </span>
                        <button
                          onClick={() => setExpandedRequest(expandedRequest === request._id ? null : request._id)}
                          className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          {expandedRequest === request._id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedRequest === request._id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-gray-300">
                              <Mail className="w-4 h-4" />
                              <span>{request.email}</span>
                              <button
                                onClick={() => handleCopyToClipboard(request.email)}
                                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                              >
                                <Copy className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Phone className="w-4 h-4" />
                              <span>{request.phone}</span>
                              <button
                                onClick={() => handleCopyToClipboard(request.phone)}
                                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                              >
                                <Copy className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Globe className="w-4 h-4" />
                              <a
                                href={request.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-colors flex items-center gap-1"
                              >
                                {request.website}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <Briefcase className="w-4 h-4" />
                              <span>{request.businessType}</span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center gap-2 text-gray-300 mb-2">
                              <MessageSquare className="w-4 h-4" />
                              <span className="font-medium">Message</span>
                            </div>
                            <p className="text-gray-400 text-sm pl-6">{request.message}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                              <Clock className="w-4 h-4" />
                              <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                            </div>
                            {request.status === 'pending' && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleStatusUpdate(request._id, 'approved')}
                                  className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(request._id, 'rejected')}
                                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No partnership requests found</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Whitelist Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">Whitelist</h2>
                <span className="text-sm text-gray-400">
                  {filteredWhitelist.length} of {whitelist.length} total
                </span>
              </div>
              <button
                onClick={() => {
                  // Implement export functionality
                }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Download className="w-5 h-5 text-blue-400" />
              </button>
            </div>

            {/* Add Email Form */}
            <div className="mb-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Add email to whitelist..."
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  {emailError && (
                    <p className="absolute -bottom-5 left-0 text-red-400 text-sm">{emailError}</p>
                  )}
                </div>
                <button
                  onClick={handleAddToWhitelist}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Whitelist Entries */}
            <div className="space-y-4">
              {filteredWhitelist.length > 0 ? (
                filteredWhitelist.map((entry) => (
                  <motion.div
                    key={entry._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{entry.email}</span>
                        {entry.isRegistered ? (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            Registered
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                            Pending
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveFromWhitelist(entry.email)}
                        className="p-1 rounded-lg hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs mt-2">
                      <Clock className="w-3 h-3" />
                      <span>Added {new Date(entry.createdAt).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No whitelisted emails found</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contacts Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 lg:col-span-2"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">User Contacts</h2>
                <span className="text-sm text-gray-400">
                  {filteredContacts.length} of {stats.totalContacts} total
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    // Implement export functionality
                  }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Download className="w-5 h-5 text-blue-400" />
                </button>
                <button
                  onClick={handleRefresh}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`w-5 h-5 text-blue-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <span className="text-blue-400 font-medium">
                            {contact.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-white">{contact.name}</h3>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Mail className="w-4 h-4" />
                            <span>{contact.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyToClipboard(contact.email)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                          title="Copy email"
                        >
                          <Copy className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => setExpandedRequest(expandedRequest === contact._id ? null : contact._id)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          {expandedRequest === contact._id ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedRequest === contact._id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2 text-gray-300 mb-4">
                              <MessageSquare className="w-4 h-4" />
                              <span className="font-medium">{contact.subject}</span>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 mb-4">
                              <p className="text-gray-300 whitespace-pre-wrap">{contact.message}</p>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                              <Clock className="w-4 h-4" />
                              <span>Received on {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No contacts found</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;