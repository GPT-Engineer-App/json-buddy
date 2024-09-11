import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const BentoView = () => {
  const location = useLocation();
  const jsonData = location.state?.jsonData;

  const renderBentoItem = (key, value, depth = 0) => {
    const itemStyle = `p-4 rounded-lg ${depth === 0 ? 'bg-primary/5' : 'bg-secondary/5'} backdrop-blur-sm transition-all duration-300 hover:shadow-md`;

    if (typeof value === 'object' && value !== null) {
      return (
        <Card key={key} className={`col-span-${Math.min(depth + 1, 3)} row-span-${Math.min(depth + 1, 3)} overflow-hidden`}>
          <CardContent className={`${itemStyle} h-full flex flex-col`}>
            <h3 className="font-bold mb-2 text-lg truncate text-primary">{key}</h3>
            <div className="grid grid-cols-2 gap-2 flex-grow overflow-auto">
              {Object.entries(value).map(([subKey, subValue]) => renderBentoItem(subKey, subValue, depth + 1))}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card key={key} className="col-span-1 row-span-1 overflow-hidden">
        <CardContent className={`${itemStyle} h-full flex flex-col justify-between`}>
          <h3 className="font-semibold mb-1 text-sm truncate text-primary">{key}</h3>
          <p className="text-xs truncate text-secondary-foreground">{JSON.stringify(value)}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-background to-background/50">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">Bento Grid View</h1>
        {jsonData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
            {Object.entries(jsonData).map(([key, value]) => renderBentoItem(key, value))}
          </div>
        ) : (
          <p className="text-center text-lg text-muted-foreground">No JSON data available. Please go back and input some JSON.</p>
        )}
      </div>
    </div>
  );
};

export default BentoView;