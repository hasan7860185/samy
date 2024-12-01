const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-8">
            مرحباً بك في تطبيقك الجديد
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            ابدأ في بناء مشروعك الرائع هنا. نحن هنا لمساعدتك في كل خطوة!
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              ابدأ الآن
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-lg font-medium border border-gray-200 transition-colors">
              اعرف المزيد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;