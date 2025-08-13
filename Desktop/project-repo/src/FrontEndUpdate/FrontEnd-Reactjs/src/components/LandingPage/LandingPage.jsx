// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';

// // Import subcomponents
// import Navbar from './Navbar';
// import SearchForm from './SearchForm';
// import HeroCarousel from './HeroCarousel';
// import CategoriesSection from './CategoriesSection';


// // Categories data
// const categories = [
//   {
//     title: "Textiles",
//     items: [
//       { name: "Curtains", img: "/Textiles.jpg", link: "/textiles" },
//     ],
//   },
//   {
//     title: "Furniture",
//     items: [
//       { name: "Sofas", img: "/Furniture.jpg", link: "/furniture" },
//     ],
//   },
//   {
//     title: "Lighting",
//     items: [
//       { name: "Ceiling Lights", img: "/Lightning.jpg", link: "/lighting" },
//     ],
//   },
//   {
//     title: "Wall Art",
//     items: [
//       { name: "Paintings", img: "/WallArt.jpg", link: "/wallart" },
//     ],
//   },
// ];

// const LandingPage = () => {
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

//   // Using user from Redux store
//   const user = useSelector(state => state.auth.user);

//   // Search handler
//   const onSearchSubmit = (data) => {
//     if (data.searchTerm.trim() !== "") {
//       navigate(`/LandingPage/search?q=${encodeURIComponent(data.searchTerm.trim())}`);
//     }
//   };

//   // Category click handler
//   const handleCategoryClick = (link) => {
//     navigate(link);
//   };

//   return (
//     <div 
//       className="bg-light min-vh-100 min-vw-100" 
//       style={{
//         backgroundImage: `url('/LandingPage1.jpg')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <Navbar user={user}>
//         <SearchForm
//           register={register}
//           handleSubmit={handleSubmit}
//           errors={errors}
//           isSubmitting={isSubmitting}
//           onSearchSubmit={onSearchSubmit}
//         />
//       </Navbar>
//       <HeroCarousel /> 
//       <CategoriesSection categories={categories} handleCategoryClick={handleCategoryClick} />
//       <footer className="bg-dark text-white text-center py-4 mt-5">
//         <div>
//           © {new Date().getFullYear()} Home Decor Marketplace |{" "}
//           <span className="text-info">Buy. Sell. Inspire.</span>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

// Import subcomponents
import Navbar from './Navbar';
import SearchForm from './SearchForm';
import HeroCarousel from './HeroCarousel';
import CategoriesSection from './CategoriesSection';

// Categories data
const categories = [
  {
    title: "Textiles",
    items: [{ name: "Curtains", img: "/Textiles.jpg", link: "/textiles" }],
  },
  {
    title: "Furniture",
    items: [{ name: "Sofas", img: "/Furniture.jpg", link: "/furniture" }],
  },
  {
    title: "Lighting",
    items: [{ name: "Ceiling Lights", img: "/Lightning.jpg", link: "/lighting" }], 
  },
  {
    title: "Wall Art",
    items: [{ name: "Paintings", img: "/WallArt.jpg", link: "/wallart" }],
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const user = useSelector(state => state.auth.user);

  const onSearchSubmit = (data) => {
    if (data.searchTerm.trim() !== "") {
      navigate(`/LandingPage/search?q=${encodeURIComponent(data.searchTerm.trim())}`);
    }
  };

  const handleCategoryClick = (link) => {
    navigate(link);
  };

  return (
    <div
      className="bg-light min-vh-100 min-vw-100"
      style={{
        backgroundImage: `url('/LandingPage1.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar user={user}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: '500px',
            zIndex: 10,
          }}
        >
          <SearchForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            isSubmitting={isSubmitting}
            onSearchSubmit={onSearchSubmit}
          />
        </div>
      </Navbar>
      <HeroCarousel />
      <CategoriesSection categories={categories} handleCategoryClick={handleCategoryClick} />
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <div>
          © {new Date().getFullYear()} Home Decor Marketplace |{" "}
          <span className="text-info">Buy. Sell. Inspire.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;