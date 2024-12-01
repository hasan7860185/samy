import React, { useState } from 'react';
import { 
  BarChart as BarChartIcon, 
  Download, 
  Calendar,
  Users,
  Building2,
  TrendingUp,
  Filter
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const getSalesData = (language: string) => [
  { month: language === 'ar' ? 'يناير' : 'January', sales: 65, target: 50 },
  { month: language === 'ar' ? 'فبراير' : 'February', sales: 59, target: 50 },
  { month: language === 'ar' ? 'مارس' : 'March', sales: 80, target: 60 },
  { month: language === 'ar' ? 'أبريل' : 'April', sales: 81, target: 60 },
  { month: language === 'ar' ? 'مايو' : 'May', sales: 56, target: 70 },
  { month: language === 'ar' ? 'يونيو' : 'June', sales: 55, target: 70 },
];

const getClientStatusData = (language: string) => [
  { name: language === 'ar' ? 'عملاء جدد' : 'New Clients', value: 30, color: '#3B82F6' },
  { name: language === 'ar' ? 'مهتمون' : 'Interested', value: 25, color: '#10B981' },
  { name: language === 'ar' ? 'محجوز' : 'Reserved', value: 15, color: '#F59E0B' },
  { name: language === 'ar' ? 'تم البيع' : 'Sold', value: 20, color: '#6366F1' },
  { name: language === 'ar' ? 'ملغي' : 'Cancelled', value: 10, color: '#EF4444' },
];

const getPropertyTypeData = (language: string) => [
  { name: language === 'ar' ? 'شقق' : 'Apartments', value: 40, color: '#8B5CF6' },
  { name: language === 'ar' ? 'فلل' : 'Villas', value: 30, color: '#EC4899' },
  { name: language === 'ar' ? 'أراضي' : 'Lands', value: 20, color: '#14B8A6' },
  { name: language === 'ar' ? 'تجاري' : 'Commercial', value: 10, color: '#F97316' },
];

const Reports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('all');
  const { language } = useLanguage();

  const salesData = getSalesData(language);
  const clientStatusData = getClientStatusData(language);
  const propertyTypeData = getPropertyTypeData(language);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 space-x-reverse">
          <BarChartIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            {language === 'ar' ? 'التقارير والإحصائيات' : 'Reports & Statistics'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="week">{language === 'ar' ? 'آخر أسبوع' : 'Last Week'}</option>
            <option value="month">{language === 'ar' ? 'آخر شهر' : 'Last Month'}</option>
            <option value="quarter">{language === 'ar' ? 'آخر 3 أشهر' : 'Last Quarter'}</option>
            <option value="year">{language === 'ar' ? 'آخر سنة' : 'Last Year'}</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            {language === 'ar' ? 'تصدير التقرير' : 'Export Report'}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'ar' ? 'إجمالي المبيعات' : 'Total Sales'}
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {language === 'ar' ? '2.5M ريال' : 'SAR 2.5M'}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm">+12.5%</span>
            <span className="text-gray-500 text-sm">
              {language === 'ar' ? ' مقارنة بالفترة السابقة' : ' vs previous period'}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'ar' ? 'العملاء الجدد' : 'New Clients'}
              </p>
              <p className="text-2xl font-bold text-gray-900">128</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm">+8.2%</span>
            <span className="text-gray-500 text-sm">
              {language === 'ar' ? ' مقارنة بالفترة السابقة' : ' vs previous period'}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'ar' ? 'العقارات النشطة' : 'Active Properties'}
              </p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-red-500 text-sm">-2.3%</span>
            <span className="text-gray-500 text-sm">
              {language === 'ar' ? ' مقارنة بالفترة السابقة' : ' vs previous period'}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'ar' ? 'المواعيد هذا الشهر' : 'Appointments This Month'}
              </p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-500 text-sm">+15.8%</span>
            <span className="text-gray-500 text-sm">
              {language === 'ar' ? ' مقارنة بالفترة السابقة' : ' vs previous period'}
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {language === 'ar' ? 'أداء المبيعات' : 'Sales Performance'}
            </h2>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="text-sm border-none focus:ring-0"
              >
                <option value="all">
                  {language === 'ar' ? 'جميع العقارات' : 'All Properties'}
                </option>
                <option value="residential">
                  {language === 'ar' ? 'سكني' : 'Residential'}
                </option>
                <option value="commercial">
                  {language === 'ar' ? 'تجاري' : 'Commercial'}
                </option>
              </select>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="sales" 
                  fill="#3B82F6" 
                  name={language === 'ar' ? 'المبيعات' : 'Sales'} 
                />
                <Bar 
                  dataKey="target" 
                  fill="#E5E7EB" 
                  name={language === 'ar' ? 'المستهدف' : 'Target'} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Client Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {language === 'ar' ? 'توزيع حالات العملاء' : 'Client Status Distribution'}
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clientStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {clientStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Property Type Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {language === 'ar' ? 'توزيع أنواع العقارات' : 'Property Type Distribution'}
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {propertyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;