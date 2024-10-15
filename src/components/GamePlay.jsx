import styled from "styled-components"
import NumberSelector from "./NumberSelector"
import TotalScore from "./TotalScore"
import RoleDice from "./RoleDice"
import { useState } from "react"
import { Button, OutLineButton } from "../styled/Button"
import Rules from "./Rules"


const GamePlay = () => {
  const [score, setSecore] = useState(0);

  const [selectedNumber,        setSelectedNumber] = useState();

  const [currentDice, setCurrentDice] = useState(1);

  const [error, setError] = useState("");
  const [showRules, setShowRules] = useState(false);

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const roleDice = () => {
    if(!selectedNumber){
      setError("You have not selected any Number");
      return
    } 
    
    const randomNumber = generateRandomNumber(1,7);
    setCurrentDice((prev) => randomNumber)

    if(selectedNumber == randomNumber){
      setSecore((prev) => prev + randomNumber)
    }else{
      setSecore((prev) => prev-2)
    }

    setSelectedNumber(undefined)
  }

  const resetScore = () => {
    setSecore(0);
  }

  return (
    <MainContainer>
      <div className="top_section">
      <TotalScore score={score}></TotalScore>
      <NumberSelector selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} error={error} setError={setError}></NumberSelector>
      </div>
      <RoleDice currentDice={currentDice} roleDice={roleDice}></RoleDice>

      <div className="btns">
        <OutLineButton onClick={resetScore}>Reset</OutLineButton>
        <Button onClick={() => setShowRules((prev) => !prev)}>{showRules ? "Hide" : "Show"} Rules</Button>
      </div>

      {showRules && <Rules></Rules>}
    </MainContainer>
  )
}

export default GamePlay;

const MainContainer = styled.main`
  padding-top: 70px;
  .top_section{
    display: flex;
    justify-content: space-around;
    align-items: end;
  }

  .btns{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 40px;
  }
`