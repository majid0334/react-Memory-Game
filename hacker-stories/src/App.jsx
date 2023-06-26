import { useState, useEffect } from "react";
import Singlecard from "./components/Singlecard";
import "./App.css";

const cardImages = [
  { src: "/images/1.jpg", matched: false },
  { src: "/images/2.jpg", matched: false },
  { src: "/images/3.jpg", matched: false },
  { src: "/images/4.jpg", matched: false },
  { src: "/images/5.jpg", matched: false },
  { src: "/images/6.jpg", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [cardOne, setcardOne] = useState(null);
  const [cardTwo, setcardTwo] = useState(null);
  //För att kunna ha mellan rum tills man kan flippa nästa kort
  const [disabled, setDisabled] = useState(false);

  function shuffle() {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
      }));
    setcardOne(null);
    setcardTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  function handleCardChoise(card) {
    // om var kort har ingen värde/null så körds setCardOne för att null är false. Om true om det har värde körs card två
    cardOne ? setcardTwo(card) : setcardOne(card);
  }
  /*  console.log(cardOne, cardTwo); */

  //useEffct körs när sidan renderas för förstå gången och när cardOne och cardTwo data ändras

  useEffect(() => {
    //båda måste vara sanna för att slippa buggar annrs köra den när bara en kort är valt
    if (cardOne && cardTwo) {
      /* I början funktionen disbaled */
      setDisabled(true);
      if (cardOne.src === cardTwo.src) {
        //Om korten är samma så ändrar vi var state matched till true för att kunna sedan flippa
        //annars inga ändringar
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === cardOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => reset(), 1000);
      }
    }

    console.log(cards);
    //när det sker ändringar på någon av dom värden så körd useEffect
  }, [cardOne, cardTwo]);
  useEffect(() => {
    shuffle();
  }, []);

  function reset() {
    setcardOne(null);
    setcardTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    //När resetes då är den it desibled
    setDisabled(false);
  }
  console.log(turns);

  return (
    <div className="App">
      <button className="start-game" onClick={shuffle}>
        Start Game
      </button>
      <div className="cards">
        {cards.map((card) => {
          return (
            <Singlecard
              key={card.id}
              card={card}
              handleCardChoise={handleCardChoise}
              //För att selectera våra kort och flippa och sedan om den är matched så ska den våra flippad och inte vända tillbaka
              flipped={card === cardOne || card === cardTwo || card.matched}
              disabled={disabled}
            />
          );
        })}
      </div>
      <p className="p">Turns:{turns}</p>
    </div>
  );
}

export default App;
