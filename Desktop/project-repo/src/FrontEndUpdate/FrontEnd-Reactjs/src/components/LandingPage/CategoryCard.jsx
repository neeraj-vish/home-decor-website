import React from 'react';

const CategoryCard = ({ category, onCategoryClick }) => {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card h-100 shadow hover-shadow-lg transition">
        <div
          className="card-body bg-white rounded-3"
          style={{ minHeight: "300px" }}
        >
          <h5 className="card-title fw-semibold">{category.title}</h5>
          <div
            className="row row-cols-2 g-2 flex-grow-1"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "calc(100% - 40px)", 
            }}
          >
            {category.items.map((item, i) => (
              <div className="col h-100 w-100" key={i}>
                <div
                  className="border rounded p-2 text-center bg-light hover-shadow-sm h-100 w-100"
                  style={{
                    transition: "transform 0.3s",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                  onClick={() => onCategoryClick(item.link)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "150px", 
                      objectFit: "cover",
                      borderRadius: 6,
                      flexGrow: 1,
                    }}
                  />
                  <div className="small mt-2">{item.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;