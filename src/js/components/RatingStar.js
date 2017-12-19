/* eslint jsx-a11y/no-noninteractive-element-interactions: off */
import React from "react";

export default function RatingStar( { value, onMouseOver, onClick, filled, id } ) { // eslint-disable-line
    const defaultUrl = id === 0 ? "../../assets/x-button.png" : "../../assets/hollow-star.png";
    const filledUrl = id === 0 ? "../../assets/selected-x.png" : "../../assets/filled-star.png";

    return (
        <img
            className={ id === 0 ? "remove-rating-button" : null }
            onMouseOver={ onMouseOver }
            onFocus={ onMouseOver }
            onClick={ onClick }

            src={ filled ? filledUrl : defaultUrl }
            alt="rating-star"
        />

    );
}
