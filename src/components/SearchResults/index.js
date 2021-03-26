import React from "react";
import "./style.css";

function SearchResults(props) {
  return (
    <ul className="list-group search-results">
      {props.results.map(result => (
        <li key={result.email } className="list-group-item">
          <img alt="user" src={result.picture.medium} className="img-fluid" />
          {result.name.first + " " + result.name.last} 
        </li>
      ))}
    </ul>
  );
}

// var var1="hello";
// var var2 ="world";
// var space =" ";
// var1+space+ var2

// "hello world"



export default SearchResults;