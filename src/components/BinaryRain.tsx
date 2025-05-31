
import React, { useEffect, useState } from 'react';

const BinaryRain = () => {
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    const generateBinaryColumn = () => {
      const height = Math.floor(Math.random() * 100) + 50;
      let column = '';
      for (let i = 0; i < height; i++) {
        column += Math.random() > 0.5 ? '1' : '0';
        if (i < height - 1) column += '\n';
      }
      return column;
    };

    const createColumns = () => {
      const numColumns = Math.floor(window.innerWidth / 20);
      const newColumns = [];
      
      for (let i = 0; i < numColumns; i++) {
        newColumns.push(generateBinaryColumn());
      }
      
      setColumns(newColumns);
    };

    createColumns();
    window.addEventListener('resize', createColumns);

    return () => window.removeEventListener('resize', createColumns);
  }, []);

  return (
    <div className="binary-rain">
      {columns.map((column, index) => (
        <div
          key={index}
          className="binary-column"
          style={{
            left: `${index * 20}px`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        >
          {column}
        </div>
      ))}
    </div>
  );
};

export default BinaryRain;
