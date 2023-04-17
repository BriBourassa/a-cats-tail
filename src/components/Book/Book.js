import React, { useEffect, useState } from "react";
import "./Book.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFact, removeFact } from "../../features/bookSlice";
import { Route } from "react-router-dom";
import Page from "../Page/Page";

function Book() {
  const dayNum = useSelector((state) => state.day.value);
  const savedFacts = useSelector((state) => state.book.facts);
  const [fact, setFact] = useState("");
  const dispatch = useDispatch();
  const getFact = async () => {
    try {
      const response = await fetch("https://meowfacts.herokuapp.com/");
      const catFact = await response.json();
      setFact(catFact.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFact();
  }, []);

  return (
    <>
      <Route exact path="/book">
        <p className="fact-text">{fact}</p>
        <NavLink to={`/story/${dayNum + 1}/choices`}>
          <button 
            className="blue-button">
            BACK
          </button>
        </NavLink>
        <button
          className="yellow-button"
          onClick={getFact}>
            NEW FACT
        </button>
        {savedFacts[0] && (
          <NavLink to="/book/pages">
            <button className="yellow-button">MY BOOKMARKS</button>
          </NavLink>
        )}
        {!savedFacts.includes(fact) && (
          <button 
            className="save-button"
            onClick={() => dispatch(addFact(fact))}>
            BOOKMARK
          </button>
        )}
        {savedFacts.includes(fact) && (
          <button 
            className="remove-button" 
            onClick={() => dispatch(removeFact(fact))}>
            REMOVE
          </button>
        )}
      </Route>
      <Route path="/book/pages">
        <Page />
      </Route>
    </>
  );
}

export default Book;
