import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const BentoView = () => {
  const location = useLocation();
  const jsonData = location.state?.jsonData;

  const renderBentoItem = (key, value, depth = 0) => {
    const isArray = Array.isArray(value);
    const itemStyle = `p-6 bg-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] border border-gray-200`;

    if (typeof value === 'object' && value !== null) {
      return (
        <Card key={key} className={`col-span-${isArray ? 2 : 1} row-span-${isArray ? 2 : 1} overflow-hidden border-0 shadow-lg`}>
          <CardContent className={`${itemStyle} h-full flex flex-col justify-center items-center`}>
            <h3 className="font-bold mb-4 text-2xl text-center text-gray-800">{key}</h3>
            <div className={`grid ${isArray ? 'grid-cols-2' : 'grid-cols-1'} gap-4 w-full`}>
              {isArray
                ? value.map((item, index) => (
                    <Card key={index} className="overflow-hidden border-0 shadow-md">
                      <CardContent className={`${itemStyle} h-full flex flex-col justify-center items-center`}>
                        <p className="text-2xl font-bold text-gray-700 text-center">{item}</p>
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
      <Card key={key} className="col-span-1 row-span-1 overflow-hidden border-0 shadow-lg">
        <CardContent className={`${itemStyle} h-full flex flex-col justify-center items-center`}>
          <h3 className="font-semibold mb-2 text-lg text-center text-gray-700">{key}</h3>
          <p className="text-4xl font-bold text-gray-800 text-center">{JSON.stringify(value)}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Bento Grid View</h1>
        {jsonData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
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