import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const BentoView = () => {
  const location = useLocation();
  const jsonData = location.state?.jsonData;

  const renderBentoItem = (key, value, depth = 0) => {
    const itemStyle = `p-4 rounded-lg ${depth === 0 ? 'bg-primary/10' : 'bg-secondary/10'} backdrop-blur-sm`;

    if (typeof value === 'object' && value !== null) {
      return (
        <Card key={key} className={`col-span-${Math.min(depth + 1, 3)} row-span-${Math.min(depth + 1, 3)} overflow-hidden`}>
          <CardContent className={`${itemStyle} h-full`}>
            <h3 className="font-bold mb-2 text-lg truncate">{key}</h3>
            <div className="grid grid-cols-2 gap-2 h-[calc(100%-2rem)] overflow-auto">
              {Object.entries(value).map(([subKey, subValue]) => renderBentoItem(subKey, subValue, depth + 1))}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card key={key} className="col-span-1 row-span-1 overflow-hidden">
        <CardContent className={`${itemStyle} h-full flex flex-col justify-between`}>
          <h3 className="font-bold mb-1 text-sm truncate">{key}</h3>
          <p className="text-xs truncate">{JSON.stringify(value)}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Bento Grid View</h1>
        {jsonData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
            {Object.entries(jsonData).map(([key, value]) => renderBentoItem(key, value))}
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600 dark:text-gray-400">No JSON data available. Please go back and input some JSON.</p>
        )}
      </div>
    </div>
  );
};

export default BentoView;