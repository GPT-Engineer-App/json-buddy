import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

const BentoView = () => {
  const location = useLocation();
  const jsonData = location.state?.jsonData;

  const renderBentoItem = (key, value, depth = 0) => {
    const itemStyle = `p-4 rounded-lg ${depth === 0 ? 'bg-primary/10' : 'bg-secondary/10'}`;

    if (typeof value === 'object' && value !== null) {
      return (
        <Card key={key} className={`col-span-${Math.min(depth + 1, 3)} row-span-${Math.min(depth + 1, 3)}`}>
          <CardContent className={itemStyle}>
            <h3 className="font-bold mb-2">{key}</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(value).map(([subKey, subValue]) => renderBentoItem(subKey, subValue, depth + 1))}
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card key={key} className="col-span-1 row-span-1">
        <CardContent className={itemStyle}>
          <h3 className="font-bold mb-1">{key}</h3>
          <p className="text-sm">{JSON.stringify(value)}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Bento Grid View</h1>
      {jsonData ? (
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(jsonData).map(([key, value]) => renderBentoItem(key, value))}
        </div>
      ) : (
        <p>No JSON data available. Please go back and input some JSON.</p>
      )}
    </div>
  );
};

export default BentoView;