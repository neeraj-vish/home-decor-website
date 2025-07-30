import React from 'react';
import CategoryCard from './CategoryCard';


const CategoriesSection = ({ categories, handleCategoryClick }) => {
  return (
    <div
      className="container position-relative"
      style={{ marginTop: "-80px", zIndex: 5 }}
    >
      <div className="row g-4">
        {categories.map((category, idx) => (
          <CategoryCard
            key={idx}
            category={category}
            onCategoryClick={handleCategoryClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
