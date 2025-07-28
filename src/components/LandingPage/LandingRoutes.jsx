import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import Navbar from './Navbar';
import SearchForm from './SearchForm';
import HeroCarousel from './HeroCarousel';
import CategoriesSection from './CategoriesSection';
import CategoryCard from './CategoryCard';
import TextileProductsRoutes from '../Products/FurnitureProduct/FurnitureProductsRoutes';
import FurnitureProductsRoutes from '../Products/FurnitureProduct/FurnitureProductsRoutes';
import LightingProductsRoutes from '../Products/LightningProduct/LightningProductsRoutes';
import WallArtProductsRoutes from '../Products/WallArtProduct/WallArtProductsRoutes';

import AllProductsPage from '../AllProducts/AllProductsPage'; //.net

const LandingRoutes = () => (
  <Routes>
    {/* Main landing page */}
    <Route index element={<LandingPage />} />

    {/* Individual subcomponents routes for testing or direct access */}
    <Route path="navbar" element={<Navbar />} />
    <Route path="searchform" element={<SearchForm />} />
    <Route path="herocarousel" element={<HeroCarousel />} />
    <Route path="categories" element={<CategoriesSection categories={[]} handleCategoryClick={() => {}} />} />
    <Route 
      path="categorycard" 
      element={
        <CategoryCard 
          category={{
            title: "Sample Category", 
            items: [{ name: "Sample Item", img: "/placeholder.jpg", link: "/sample" }]
          }} 
          onCategoryClick={() => {}}
        />
      } 
    />

    {/* Category-specific routes */}
    <Route path="textiles/*" element={<TextileProductsRoutes />} />
    <Route path="furniture/*" element={<FurnitureProductsRoutes />} />
    <Route path="lighting/*" element={<LightingProductsRoutes />} />
    <Route path="wallart/*" element={<WallArtProductsRoutes />} />


    {/* All products page route */}
    <Route path="all-products" element={<AllProductsPage />} />

    {/* Fallback route */}
  </Routes>
);

export default LandingRoutes;