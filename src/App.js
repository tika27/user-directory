import React, { Component } from "react";
import API from "./utils/API";
import Container from "./components/Container";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import Alert from "./components/Alert";



class Search extends Component {
  state = {
    search: "",
    breeds: [],
    results: [],
    error: ""
    
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    API.getRandomName()
      .then(res => 
        this.setState({ breeds: res.data.results })
        // console.log(res.data.results)
        )
      .catch(err => console.log(err));
  }

  findUsers=()=>{
    var newArr = this.state.breeds.filter(function(rate){
      return rate.name.first.includes(this.state.search);
    });
    this.setState({ breeds: newArr });
  }

  handleInputChange = event => {
   event.preventDefault();

    this.setState({ search: event.target.value });
    console.log(this.state.search)
    //this.findUsers();
 
  };



  sortByName = () => {
  
    return this.state.breeds.sort((a, b) => a.name.first - b.name.first);
    //this.setState(breeds);

  };
  

  handleFormSubmit = event => {
    event.preventDefault();
    API.getDogsOfBreed(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  };
  render() {
    return (
      
      <div>
        <Container style={{ minHeight: "80%" }}>
           <h1 className="text-center">Search by Employee Name</h1>
          <Alert
            type="danger"
            style={{ opacity: this.state.error ? 1 : 0, marginBottom: 10 }}
          >
            {this.state.error}
          </Alert>
          <SearchForm
      
            handleInputChange={this.handleInputChange}
            breeds={this.state.breeds}
          />
          <SearchResults 
           sortByName={this.sortByName}
          results={this.state.breeds} />
        </Container>
      </div>
    );
  }
}

export default Search;
