import React, { useEffect, useState } from "react";
import GameOver from "./components/GameOver";
import game from "./game/game";
import GameBoard from "./components/GameBoard";
import Menu from "./components/Menu";
import messages from "./messages.json"; 

export default function MemoryGame() {
  const [gameOver, setGameOver] = useState(false);
  const [cards, setCards] = useState([]);
  const [matchMessage, setMatchMessage] = useState(""); // Estado para a mensagem de match

  useEffect(() => {
    setCards(game.createCards());
  }, []);

  function restart() {
    game.clearCards();
    setCards(game.createCards());
    setGameOver(false);
    setMatchMessage(""); // Limpa a mensagem quando o jogo reinicia
  }

  function handleFlip(card) {
    if (game.setCard(card.id)) {
      if (game.secondCard) {
        if (game.checkMatch()) {
          game.clearCards();
          console.log(card);
          const cardDescription = card.icon;
          setMatchMessage(messages[cardDescription]);
          if (game.checkGameOver()) {
            setGameOver(true);
          }
        } else {
          setTimeout(() => {
            game.unflipCards();
            setMatchMessage(""); // Limpa a mensagem se não houver match
            setCards([...game.cards]);
          }, 1000);
        }
      }
    }
    setCards([...game.cards]);
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <GameBoard handleFlip={handleFlip} cards={cards} />
          <Menu restart={restart} />
        </div>

        <div style={{ textAlign: 'justify', width: '200px', marginLeft: "5%" }}>
          {matchMessage && (
            <div style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              fontSize: "16px",
              fontFamily: "'Georgia', serif",
              backgroundColor: "#f9f9f9",
              color: "#333"
            }}>
              <p>{matchMessage}</p>
            </div>
          )}
        </div>
      </div>

      <GameOver show={gameOver} handleRestart={restart} />
    </>
  );
}
