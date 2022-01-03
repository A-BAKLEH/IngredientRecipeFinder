import React from 'react';
import style from './recipe.module.css';

function Recipe({title,calories,image, ingredients}) {
    return (
        <div className={style.recipe}>
            <h2>{title}</h2>
            <p>Calories: {parseInt(calories)}</p>
            <ul className={style.list}>
                {ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ul>
            <img className={style.image} src={image} alt={title}/>
        </div>
    );
}

export default Recipe;