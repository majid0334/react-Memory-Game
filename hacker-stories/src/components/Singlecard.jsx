import React from "react";

function Singlecard({ card, handleCardChoise, flipped, disabled }) {
  //Funktionen körs bara om det är inte disabled
  function flip() {
    if (!disabled) {
      handleCardChoise(card);
    }
  }

  return (
    <div className="card-container">
      {/* 'Om macthed är true ska vi flippa och då aktiveras klassen flipped annars ingen class */}
      <div className={flipped ? "flipped" : ""}>
        <img className="frontCard" src={card.src} alt="front of card" />
        <img
          onClick={flip}
          className="backCard"
          src="/images/cover.jpg"
          alt="Back of card"
        />
      </div>
    </div>
  );
}

export default Singlecard;
