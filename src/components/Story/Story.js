import React, { useState } from "react";
import "./Story.css";
import Day from "../Day/Day";
import Choices from "../Choices/Choices";
import Result from "../Result/Result";
import { Switch, Route, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCatName } from "../../features/catSlice";
import { addName } from "../../features/storySlice";
function Story() {
  const dayNum = useSelector((state) => state.day.value);
  // const checkCatName = useSelector((state) => state.cat.name);
  const story = useSelector((state) => state.storyline);
  const [ catName, setCatName ] = useState('');
  const dispatch = useDispatch();
  const startStory = (event) => {
    if(catName) {
      event.preventDefault()
      dispatch(updateCatName(catName))
      // GOTTA USE A COPY OR something here... maybe a reduce instead of a foreach
      var newStory = [...story];
      const keys = Object.keys(newStory[0]);
      // console.log(newStory)
      newStory.forEach(obj => {
        keys.forEach(key => {
        obj[key] = obj[key].replaceAll('replaceME', catName)
        });
      });
      // dispatch(addName(newStory))
    }
  }
  return (
        <>
    <div className='intro'>
        <h2>Congrats, you adopted a cat!</h2>
        <form className='name-form'>
            <label htmlFor="nameInput" className='top-margin'>What's your cat's name?</label>
            <input type="text" value={catName} onChange={(event) => setCatName(event.target.value)} id="nameInput" className='top-margin' required/>
            <button className='top-margin' onClick={(event) => startStory(event)}>Begin Journey</button>
        </form>
    </div>

      <Switch>
        <Route exact path="/story">
          <NavLink to={`/story/${dayNum}/day`}>
            <button>Continue</button>
          </NavLink>
        </Route>
        <Route path="/story/:dayNum/day">
          <Day />
        </Route>
        <Route path="/story/:dayNum/choices">
          <Choices />
        </Route>
        <Route path="/story/:dayNum/result/:type" render={({match}) => <Result type={match.params.type}/>} />
        <Route path="/story/finale">
          <h2>Fin!</h2>
        </Route>
      </Switch>
    </>
  );
}

export default Story;
