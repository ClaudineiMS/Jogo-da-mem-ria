import React, { Fragment } from "react";
import Fim from "../assets/fim.gif"

export default function GameOver(props) {
  return props.show ? (
   
    <div id="gameOver">
    <img id="imgAliens" src={Fim} alt="Fim"  width={ 700} />
    <br></br> <br></br>
    <p>Vamos jogar novamente?</p>
      <button id="restart" onClick={props.handleRestart}>
        Jogue novamente
      </button>
    </div>
     
  ) : (
    <Fragment></Fragment>
  );
}
