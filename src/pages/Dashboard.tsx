const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">لوحة التحكم</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">إجمالي العملاء</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">العقارات النشطة</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">المشاريع الحالية</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">المهام المعلقة</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;