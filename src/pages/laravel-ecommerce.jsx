import React from "react";
import MainLayout from "../layouts/MainLayout";

const LaravelEcommerce = () => {
  return (
    <MainLayout>
      <div className="bg-gray-500 p-8 ">
        <div className="flex-grow text-white mt-14">
          <h1 className="mb-5">Laravel Ecommerce Demo Project</h1>
          <p className="mb-5 w-3/5">
            A comprehensive multi-vendor ecommerce platform that enables multiple vendors to sell their products through
            a unified marketplace. The platform features a sophisticated vendor management system, complex product
            variations, secure payment processing with automatic vendor payouts, and a modern React-based frontend with
            server-side rendering capabilities.
          </p>
          <div className="flex justify-between">
            <div className="grid grid-cols-2 gap-4 mt-4 w-1/2">
              <img src="images/10/product.png" alt="" />
              <img src="images/10/payment.png" alt="" />
              <img src="images/10/checkout.png" alt="" />
              <img src="images/10/admin.png" alt="" />
              <img src="images/10/admin_product.png" alt="" />
            </div>
            <div className="w-1/2 ">
              <h3>Tech Stack</h3>
              <h4>Front End</h4>
              <ul className="*:list-disc *:ml-5">
                <li>React</li>
                <li>Tailwind CSS</li>
                <li>TypeScript</li>
                <li>DaisyUI</li>
                <li>SSR</li>
              </ul>
              <h4>Back End</h4>
              <ul className="*:list-disc *:ml-5">
                <li>Laravel</li>
                <li>PHP CSS</li>
                <li>Filament</li>
                <li>Spaite Laravel Permission & Media Library</li>
                <li>SSR</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LaravelEcommerce;
