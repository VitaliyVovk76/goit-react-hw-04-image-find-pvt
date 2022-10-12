import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./Searchbar.module.css";

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const hendleChenge = (evt) => {
    const { value } = evt.currentTarget;
    setQuery(value.toLowerCase());
  };

  const hendleFormSubmit = (evt) => {
    evt.preventDefault();
    if (query.trim() === "") {
      toast("Enter the query");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={hendleFormSubmit}>
        <button className={s.button} type="submit">
          <ImSearch className={s.buttonLabel} />
        </button>
        <input
          className={s.input}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          type="text"
          name="query"
          value={query}
          onChange={hendleChenge}
        />
      </form>
    </header>
  );
};

export default Searchbar;
