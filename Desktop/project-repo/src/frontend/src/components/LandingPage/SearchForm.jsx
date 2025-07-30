import React from 'react';


const SearchForm = ({ register, handleSubmit, errors, isSubmitting, onSearchSubmit }) => {
  return (
    <form
      className="d-flex mx-3 flex-grow-1"
      style={{ maxWidth: 500 }}
      onSubmit={handleSubmit(onSearchSubmit)}
      noValidate
    >
      <input
        className={`form-control me-2 ${errors.searchTerm ? "is-invalid" : ""}`}
        type="search"
        placeholder="Search Home Decor"
        {...register("searchTerm", {
          required: "Please enter a search term",
          minLength: { value: 2, message: "Search term must be at least 2 characters" },
          maxLength: { value: 50, message: "Search term cannot exceed 50 characters" },
          pattern: {
            value: /^[A-Za-z]+$/i,
            message: "Search term must contain alphabets only",
          },
        })}
      />
      <div className="invalid-feedback">{errors.searchTerm?.message}</div>
      <button className="btn btn-warning" type="submit" disabled={isSubmitting}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
