import React, { useEffect, useRef, useState } from "react";
import "../styles/battle.css";

function Battle() {
  const [log, setLog] = useState<string[]>([]);
  const [player1Health, setPlayer1Health] = useState(12000); // Updated max HP
  const [player1MaxAttack] = useState(650); // Added max attack
  const [player1MaxDefense] = useState(750); // Added max defense

  const [player2Health, setPlayer2Health] = useState(10000); // Updated max HP
  const [player2MaxAttack] = useState(600); // Added max attack
  const [player2MaxDefense] = useState(376); // Added max defense

  const [turn, setTurn] = useState(1);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);

  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');

  // Create a ref for the log container
  const logContainerRef = useRef<HTMLDivElement | null>(null);

  // Create a ref for game over container
  const gameOverRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to the bottom of the log
  const scrollToBottom = () => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  };

  // Function to scroll to the bottom of the log
  const scrollToBottomGameOver = () => {
    if (gameOverRef.current) {
        gameOverRef.current.scrollIntoView(
            {
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
            })
        }
  };

  // Use useEffect to scroll to the bottom when the component initially renders
  useEffect(() => {
    if(gameOver) {
        scrollToBottomGameOver();
    } else {
        scrollToBottom();
    }
    
  }, [isPlayer1Turn, gameOver]);

  const calculateAttack = () => {
    // Base Attack Value
    const maxAttack = isPlayer1Turn ? player1MaxAttack : player2MaxAttack;
    const baseAttack = Math.floor(Math.random() * maxAttack);

    // Weighted random selection for Critical Attack Value
    const criticalOptions = [
      { value: 1, weight: 60 },
      { value: 2, weight: 15 },
      { value: 3, weight: 13 },
      { value: 4, weight: 10 },
      { value: 5, weight: 2 },
    ];

    const totalWeight = criticalOptions.reduce(
      (sum, option) => sum + option.weight,
      0
    );
    const randomValue = Math.random() * totalWeight;

    let criticalAttack = 1;
    let cumulativeWeight = 0;

    for (const option of criticalOptions) {
      cumulativeWeight += option.weight;
      if (randomValue <= cumulativeWeight) {
        criticalAttack = option.value;
        break;
      }
    }

    const totalAttack = baseAttack * criticalAttack;

    // Check categories for strong or weak (you can implement this logic here)

    return totalAttack;
  };

  const calculateDefense = () => {
    // Base Defense Value
    const maxDefense = isPlayer1Turn ? player1MaxDefense : player2MaxDefense;
    const baseDefense = Math.floor(Math.random() * maxDefense);

    // Random value for Total DEF Value
    const x = Math.floor(Math.random() * 5) + 1;

    // Ensure x is not greater than baseDefense
    const totalDefense = Math.min(baseDefense, maxDefense / x);

    return totalDefense;
  };

  const handlePlayer1Attack = () => {
    if (isPlayer1Turn && !gameOver) {
        // Scroll to the bottom of the log when an attack is initiated
        scrollToBottom();  
        const player1Attack = calculateAttack();
        const player2Defense = calculateDefense();

        // Ensure a minimum damage of 1
        const damage = Math.max(player1Attack - player2Defense, 1);
        // const damage = player1Attack - player2Defense; //does not ensure min 1 dmg
        const newPlayer2Health = Math.max(player2Health - damage, 0);

        // Log the attack and defense calculations for Player 1
        const logEntryPlayer1 = `Turn ${turn}: Player 1 attacked with ${player1Attack} damage. Player 2 defended with ${player2Defense} defense. Player 2 now has ${newPlayer2Health} health.`;

        setLog([...log, logEntryPlayer1]);
        setPlayer2Health(newPlayer2Health);
        setTurn(turn + 1);
         
        // Check if Player 2's health reached 0 (end of the game)
        if (newPlayer2Health <= 0) {
            setGameOver(true);
            setGameOverMessage('You won!');
            return;
        }

        // Switch to Player 2's turn
        setIsPlayer1Turn(false);
        
  
        }
  };

  const handlePlayer2Attack = () => {
    if (!isPlayer1Turn && !gameOver) {
        
      const player2Attack = calculateAttack();
      const player1Defense = calculateDefense();

      // Ensure a minimum damage of 1
      const damage = Math.max(player2Attack - player1Defense, 1);
      //const damage = player2Attack - player1Defense; //does not ensure min dmg of 1
      const newPlayer1Health = Math.max(player1Health - damage, 0);

      // Log the attack and defense calculations for Player 2
      const logEntryPlayer2 = `Turn ${turn}: Player 2 attacked with ${player2Attack} damage. Player 1 defended with ${player1Defense} defense. Player 1 now has ${newPlayer1Health} health.`;

      setLog([...log, logEntryPlayer2]);
      setPlayer1Health(newPlayer1Health);
      setTurn(turn + 1);

      // Check if Player 1's health reached 0 (end of the game)
      if (newPlayer1Health <= 0) {
        setGameOver(true);
        setGameOverMessage('You lost, better luck next time!');
        return;
      }

      // Switch back to Player 1's turn
      setIsPlayer1Turn(true);
    }
  };

  // Automatically trigger Player 2's attack when it's their turn
  useEffect(() => {
    if (!isPlayer1Turn) {
      handlePlayer2Attack();
    }
  }, [isPlayer1Turn]);

  return (
    <div className={`battle-container ${isPlayer1Turn ? "green-bg" : ""}`}>
      <div className="battle-log" >
        {log.map((message, index) => (
          <p key={index} ref={logContainerRef}>{message}</p>
        ))}
        {gameOver && <p ref={gameOverRef} className="game-over-message">{gameOverMessage}</p>}

      </div>
      <button onClick={handlePlayer1Attack}>Attack</button>
      <div className={`health-bars ${isPlayer1Turn ? "green-bg" : ""}`}>
      <div className={`health-bar ${isPlayer1Turn ? 'green-bg' : ''}`}>
  <div className="health-info">
    Player 1: {player1Health.toFixed(0)} / 12000 {/* Use toFixed(0) to round to the nearest integer */}
  </div>
  <div className={`health-inner ${isPlayer1Turn ? 'green-bg' : ''}`} style={{ width: `${Math.floor((player1Health / 12000) * 100)}%` }}></div>
</div>
<div className={`health-bar ${isPlayer1Turn ? 'green-bg' : ''}`}>
  <div className="health-info">
    Player 2: {player2Health.toFixed(0)} / 10000 {/* Use toFixed(0) to round to the nearest integer */}
  </div>
  <div className={`health-inner ${isPlayer1Turn ? 'green-bg' : ''}`} style={{ width: `${Math.floor((player2Health / 10000) * 100)}%` }}></div>
</div>
      </div>
    </div>
  );
}

export default Battle;
