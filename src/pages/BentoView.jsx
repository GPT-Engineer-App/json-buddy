import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const BentoView = () => {
  const location = useLocation();
  const jsonData = location.state?.jsonData;

  const getRandomColor = () => {
    const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-pink-100', 'bg-purple-100', 'bg-indigo-100'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomSpan = () => {
    const spans = ['col-span-1', 'col-span-2', 'row-span-1', 'row-span-2'];
    return spans[Math.floor(Math.random() * spans.length)];
  };

  const renderBentoItem = (key, value, depth = 0) => {
    const isArray = Array.isArray(value);
    const itemStyle = `${getRandomColor()} shadow-lg transition-all duration-300 hover:shadow-xl rounded-lg overflow-hidden transform hover:-translate-y-1`;

    if (typeof value === 'object' && value !== null) {
      return (
        <Card key={key} className={`${getRandomSpan()} ${itemStyle}`}>
          <CardContent className="p-4 h-full flex flex-col justify-center">
            <h3 className="font-bold mb-2 text-xl text-center text-gray-800">{key}</h3>
            <div className="grid grid-cols-2 gap-2 w-full">
              {isArray
                ? value.map((item, index) => (
                    <div key={index} className="bg-white rounded p-2 text-center">
                      <p className="text-sm font-semibold text-gray-700">{item}</p>
                    </div>
                  ))
                : Object.entries(value).map(([subKey, subValue]) => renderBentoItem(subKey, subValue, depth + 1))
              }
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card key={key} className={`${getRandomSpan()} ${itemStyle}`}>
        <CardContent className="p-4 h-full flex flex-col justify-center items-center">
          <h3 className="font-semibold mb-1 text-base text-center text-gray-700">{key}</h3>
          <p className="text-2xl font-bold text-gray-800 text-center">{JSON.stringify(value)}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Bento Grid View</h1>
        {jsonData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
            {Object.entries(jsonData).map(([key, value]) => renderBentoItem(key, value))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600">No JSON data available. Please go back and input some JSON.</p>
        )}
      </div>
    </div>
  );
};

export default BentoView;