import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const BentoView = () => {
  const location = useLocation();
  const jsonData = location.state?.jsonData;

  const renderBentoItem = (key, value, depth = 0) => {
    const isArray = Array.isArray(value);
    const itemStyle = `p-6 bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-lg transition-all duration-300 hover:shadow-xl hover:scale-105`;

    if (typeof value === 'object' && value !== null) {
      return (
        <Card key={key} className={`col-span-${isArray ? 2 : 1} row-span-${isArray ? 2 : 1} overflow-hidden border-0 shadow-2xl`}>
          <CardContent className={`${itemStyle} h-full flex flex-col`}>
            <h3 className="font-bold mb-4 text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">{key}</h3>
            <div className={`grid ${isArray ? 'grid-cols-2' : 'grid-cols-1'} gap-4 flex-grow overflow-auto`}>
              {isArray
                ? value.map((item, index) => (
                    <Card key={index} className="overflow-hidden border-0 shadow-lg">
                      <CardContent className={`${itemStyle} h-full flex flex-col justify-center items-center`}>
                        <p className="text-2xl font-bold text-white text-center">{item}</p>
                      </CardContent>
                    </Card>
                  ))
                : Object.entries(value).map(([subKey, subValue]) => renderBentoItem(subKey, subValue, depth + 1))
              }
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card key={key} className="col-span-1 row-span-1 overflow-hidden border-0 shadow-2xl">
        <CardContent className={`${itemStyle} h-full flex flex-col justify-between items-center`}>
          <h3 className="font-semibold mb-2 text-lg text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">{key}</h3>
          <p className="text-4xl font-bold text-white text-center">{JSON.stringify(value)}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Bento Grid View</h1>
        {jsonData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {Object.entries(jsonData).map(([key, value]) => renderBentoItem(key, value))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-400">No JSON data available. Please go back and input some JSON.</p>
        )}
      </div>
    </div>
  );
};

export default BentoView;