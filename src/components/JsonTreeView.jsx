import React from 'react';

const JsonTreeView = ({ data }) => {
  const renderTree = (obj, depth = 0) => {
    if (typeof obj !== 'object' || obj === null) {
      return <span className="ml-4">{JSON.stringify(obj)}</span>;
    }

    return (
      <ul className="list-none pl-4">
        {Object.entries(obj).map(([key, value]) => (
          <li key={key} className="my-1">
            <span className="font-semibold">{key}: </span>
            {renderTree(value, depth + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return <div className="font-mono text-sm">{renderTree(data)}</div>;
};

export default JsonTreeView;