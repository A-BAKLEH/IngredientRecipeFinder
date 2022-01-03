import React,{useState,useEffect} from "react";
import './App.css';
import Recipe from "./Recipe";

function App() {

    const APP_ID = "95b13110";
    const APP_KEY = "65396464066fe2be085b56fd78e72992";

    const [recipes,setRecipes] = useState([]);
    const [search,setSearch] = useState("");
    const [query,setQuery] = useState("chicken");
    const [filter,setFitler] = useState("balanced");

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=95b13110&app_key=65396464066fe2be085b56fd78e72992&diet=${filter}`);
        const data = await response.json();
        setRecipes(data.hits);
    };


    const filterHandler = (e) => {
        setFitler(e.target.value);
    }

    const updateSearch = (e) => {
        setSearch(e.target.value);
    }

    const getSearch = (e) => {
        e.preventDefault();
        setQuery(search);
        setSearch("");
    }

    useEffect(() => {
        getRecipes();
    },[query, filter]);


    return (
    <div className="App">
        <select onChange={filterHandler} className="filter-select">
            <option value="balanced">Balanced</option>
            <option value="high-protein">High Protein</option>
            <option value="high-fiber">High Fiber</option>
            <option value="low-carb">Low Carb</option>
            <option value="low-fat">Low Fat</option>
            <option value="low-sodium">Low Sodium</option>
        </select>
        <form onSubmit={getSearch} className="search-form">
            <input placeholder="Search Ingredient..." className="search-bar" type="text" onChange={updateSearch} value={search}/>
            <button className="search-button" type="submit">Search</button>
        </form>
        <div className="recipes">
        {recipes.map(recipe => (
            <Recipe key={recipe.recipe.image}
                title={recipe.recipe.label} calories={recipe.recipe.calories}
                    image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}></Recipe>
        ))}
        </div>
    </div>
  );
}

export default App;
