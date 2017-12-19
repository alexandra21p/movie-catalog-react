/* eslint react/prop-types: off */
import React from "react";
import RatingStar from "./RatingStar";

export default function Rating( {
    hidden, ratingStars, onClickHandler, onMouseLeaveHandler,
    rating, onMouseOverPopup, onFocusPopup, onClickStar,
} ) {
    const currentRating = !rating ? (
        <div className="current-rating">
            <span className="not-rated">Not Rated Yet</span>
        </div>
    ) : (
        <div className="current-rating">
            <img src="../../assets/golden-star.png" alt="golden-star" />
            <span> { rating } </span>
        </div>
    );

    return (
        <div className="rating-container">
            { currentRating }
            <div
                className="rate-movie"
                onClick={ onClickHandler }
                role="button"
                tabIndex={ 0 }
            >
                <img src="../../assets/hollow-star.png" alt="empty-star" />
                <span>Rate This</span>

                <div
                    className={ hidden ? "rate-popup hidden" : "rate-popup visible" }
                    onMouseLeave={ onMouseLeaveHandler }
                >
                    <ul className="rating-stars">
                        { ratingStars.map( ( value, ind ) =>
                            (
                                <li key={ `${ value }-${ ind.toString() }` }>
                                    <RatingStar
                                        filled={ value }
                                        id={ ind }
                                        onMouseOver={ () => onMouseOverPopup( ind ) }
                                        onFocus={ () => onFocusPopup( ind ) }
                                        onClick={ () => onClickStar( ind ) }
                                    />
                                </li> ) )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}
