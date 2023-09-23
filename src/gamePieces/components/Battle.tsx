import React, { useEffect, useRef, useState } from "react";
import "../styles/battle.css";

function Battle() {
  const logEntryWelcome1 = ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n';
  const logEntryWelcome2 = ',,,,,,,,,,,,,,,,,,&&&&&&&&&&&&&&&&&#,,,,,,,,,,,,,,,,,\n'
  const logEntryWelcome3 = ',,,,,,,,&&&&,*&&&&&&&&&&&&&&&&&&&&&&&&&&/,&&&&,,,,,,,\n'
  const logEntryWelcome4 = ',,,,,,,&,,&&&&&&&&&&,,&&&&&&&&&&,,&&&&&&&&&&,,&,,,,,,\n'
  const logEntryWelcome5 = ',,,,,,,&&&&&&&&&&&&,,,&&&&&&&&&&,,,&&&&&&&&&&&&,,,,,,\n'
  const logEntryWelcome6 = ',,,,,,,,,&&&&&&&&&&,,,&&&&&&&&&&,,,&&&&&&&&&&,,,,,,,,\n'
  const logEntryWelcome7 = ',,,,,,,,,&&&&&&&&&&,,,&&&&&&&&&%,,,&&&&&&&&&&,,,,,,,,\n'
  const logEntryWelcome8 = ',,,,,,,,,&&&&&&&&&&,,,&&&&&&&&&*,,,&&&&&&&&&&,,,,,,,,\n'
  const logEntryWelcome9 = ',,,,,,,,,&&&&&&&&&&,,,#&&&&&&&&,,,,&&&&&&&&&&,,,,,,,,\n'
  const logEntryWelcome10 = ',,,,,,,,,%&&&&&&&&&,,,,&&&&&&&&,,,,&&&&&&&&&&,,,,,,,,\n'
  const logEntryWelcome11 = ',,,,,,,,,,&&&&&&&&&,,,,&&&&&&&&,,,,&&&&&&&&&,,,,,,,,,\n'
  const logEntryWelcome12 = ',,,,,,,,,,,&&&&&&&&,,,,&&&&&&&&,,,,&&&&&&&&,,,,,,,,,,\n'
  const logEntryWelcome13 = ',,,,,,,,,,,,,&&&&&&&&&&&,,& ,,&&,,,*&&,&&,,,,,,,,,,,,\n'
  const logEntryWelcome14 = ',,,,,,,,        &    ,&#   &,,&      #&  &,,  &,,,,,,\n'
  const logEntryWelcome15 = ',,,,,,,&&   ,,&&,,   ,,,   ,&*        ,%  &  &&,,,,,,\n'
  const logEntryWelcome16 = ',,,,,,,,&   % #,,,   &,,   ,,,  %&  &,,,    &,,,,,,,,\n'
  const logEntryWelcome17 = ',,,,,,,,,,  &,,,,,&        ,,,  &,&  ,,,   ,,,,,,,,,,\n'
  const logEntryWelcome18 = ',,,,,,,,,,&&&,,,,,,,%,,,,,,,,,,,,,,,&,, &&,,,,,,,,,,,\n'
  const logEntryWelcome19 = ',,,,,,,,,,,,,&&,,,,&,,,,,&,,,&##&,,,&,,,,,,,,,,,,,,,,\n'
  const logEntryWelcome20 = ',,,,,,,,,,,,,&&&&,,&,,,,,&,,,&##&&&&&,,,,,,,,,,,,,,,,\n'
  const logEntryWelcome21 = ',,,,,,,,,,,,,*****,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\n';
  const simulationName = `Simulation Name\n`;
  const year = 'Year: 3212\n';
  const [log, setLog] = useState<string[]>([logEntryWelcome1, logEntryWelcome2, logEntryWelcome3, logEntryWelcome4, logEntryWelcome5, logEntryWelcome6, logEntryWelcome7, logEntryWelcome8, logEntryWelcome9, logEntryWelcome10, logEntryWelcome11, logEntryWelcome12, logEntryWelcome13, logEntryWelcome14, logEntryWelcome15, logEntryWelcome16, logEntryWelcome17, logEntryWelcome18, logEntryWelcome19, logEntryWelcome20, logEntryWelcome21, simulationName, year]);
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

  const delayBetweenTurns = 2000; // 2 seconds delay

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
    const logEntryBaseAtkCalculations = `Turn ${turn}: Calculating Base Atk... Base Atk is ${baseAttack}`;
    console.log(logEntryBaseAtkCalculations);
    setLog((prevLog) => [...prevLog, logEntryBaseAtkCalculations]);


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
    if(criticalAttack === 1) {
      const logEntryAtkCalculations = `Turn ${turn}: Calculating Critical Strike Chance… No Critical Strike. Resuming Atk Calculations…`;
      console.log(logEntryAtkCalculations);
      setLog((prevLog) => [...prevLog, logEntryAtkCalculations]);
    } else {
      const logEntryAtkCalculations = `Turn ${turn}: Calculating Critical Strike Chance… Critical Strike is x${criticalAttack}!`;
      console.log(logEntryAtkCalculations);
      setLog((prevLog) => [...prevLog, logEntryAtkCalculations]);
    }
    

    const totalAttack = baseAttack * criticalAttack;

    // Check categories for strong or weak (you can implement this logic here)

    return Math.round(totalAttack);
  };

  const calculateDefense = () => {
    // Base Defense Value
    const maxDefense = isPlayer1Turn ? player1MaxDefense : player2MaxDefense;
    const baseDefense = Math.floor(Math.random() * maxDefense);

    // Random value for Total DEF Value
    const x = Math.floor(Math.random() * 5) + 1;

    // Ensure x is not greater than baseDefense
    const totalDefense = Math.min(baseDefense, maxDefense / x);

    return Math.round(totalDefense);
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom of the log when the log state changes
  }, [log]);

  const handlePlayer1Attack = () => {
    if (isPlayer1Turn && !gameOver) {
        // Scroll to the bottom of the log when an attack is initiated
        scrollToBottom();  
        const player1Attack = calculateAttack();
        const logEntryAtkCalculations = `Turn ${turn}: Calculating Total Atk... Total Atk is ${player1Attack}`;
        console.log(logEntryAtkCalculations);
        setLog((prevLog) => [...prevLog, logEntryAtkCalculations]);

        const player2Defense = calculateDefense();

        // Ensure a minimum damage of 1
        const damage = Math.max(player1Attack - player2Defense, 1);
        // const damage = player1Attack - player2Defense; //does not ensure min 1 dmg
        const newPlayer2Health = Math.round(Math.max(player2Health - damage, 0));

        // Log the attack and defense calculations for Player 1
        const logEntryPlayer1 = `Turn ${turn}: Player 1 attacked with ${player1Attack} damage. Player 2 defended with ${player2Defense} defense. Player 2 now has ${newPlayer2Health} health.`;

        setLog((prevLog) => [...prevLog, logEntryPlayer1]);
        setPlayer2Health(newPlayer2Health);
        setTurn(turn + 1);
         
        // Check if Player 2's health reached 0 (end of the game)
        if (newPlayer2Health <= 0) {
            setGameOver(true);
            setGameOverMessage('You won!');
            return;
        }

        // Switch to Player 2's turn with a delay
        setTimeout(() => {
          setIsPlayer1Turn(false);
        }, delayBetweenTurns);
        
  
        }
  };

  const handlePlayer2Attack = () => {
    if (!isPlayer1Turn && !gameOver) {
        
      const player2Attack = calculateAttack();
      const logEntryAtkCalculations = `Turn ${turn}: Calculating Total Atk... Total Atk is ${player2Attack}`;
      console.log(logEntryAtkCalculations);
      setLog((prevLog) => [...prevLog, logEntryAtkCalculations]);

      const player1Defense = calculateDefense();

      // Ensure a minimum damage of 1
      const damage = Math.max(player2Attack - player1Defense, 1);
      //const damage = player2Attack - player1Defense; //does not ensure min dmg of 1
      const newPlayer1Health = Math.round(Math.max(player1Health - damage, 0));

      // Log the attack and defense calculations for Player 2
      const logEntryPlayer2 = `Turn ${turn}: Player 2 attacked with ${player2Attack} damage. Player 1 defended with ${player1Defense} defense. Player 1 now has ${newPlayer1Health} health.`;

      setLog((prevLog) => [...prevLog, logEntryPlayer2]);
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
      <div className={`health-bars ${isPlayer1Turn ? "green-bg" : ""}`}>
        <div className={`health-bar ${isPlayer1Turn ? 'green-bg' : ''}`}>
          <div className="health-info">
            Player 2: {player2Health.toFixed(0)} / 10000 {/* Use toFixed(0) to round to the nearest integer */}
          </div>
          <div className={`health-inner ${isPlayer1Turn ? 'green-bg' : ''}`} style={{ width: `${Math.floor((player2Health / 10000) * 100)}%` }}></div>
        </div>
      </div>
      <div className="battle-log" >
        {log.map((message, index) => (
          <div ref={logContainerRef}>
            {index<21
              ? <span key={index}>{message}</span> 
              : <p key={index}>{message}</p> 
            }
          </div>
          
          
        ))}
      </div>
      <div className={`health-bars ${isPlayer1Turn ? "green-bg" : ""}`}>
        <div className={`health-bar ${isPlayer1Turn ? 'green-bg' : ''}`}>
          <div className="health-info">
            Player 1: {player1Health.toFixed(0)} / 12000 {/* Use toFixed(0) to round to the nearest integer */}
          </div>
          <div className={`health-inner ${isPlayer1Turn ? 'green-bg' : ''}`} style={{ width: `${Math.floor((player1Health / 12000) * 100)}%` }}></div>
        </div>
      </div>
      <button onClick={handlePlayer1Attack}>Attack</button>
    </div>
  );
}
//   return (
//     <div className={`battle-container ${isPlayer1Turn ? "green-bg" : ""}`}>
//       <div className="battle-log" >
//         {log.map((message, index) => (
//           <p key={index} ref={logContainerRef}>{message}</p>
//         ))}
//         {gameOver && <p ref={gameOverRef} className="game-over-message">{gameOverMessage}</p>}

//       </div>
//       <button onClick={handlePlayer1Attack}>Attack</button>
//       <div className={`health-bars ${isPlayer1Turn ? "green-bg" : ""}`}>
//       <div className={`health-bar ${isPlayer1Turn ? 'green-bg' : ''}`}>
//   <div className="health-info">
//     Player 1: {player1Health.toFixed(0)} / 12000 {/* Use toFixed(0) to round to the nearest integer */}
//   </div>
//   <div className={`health-inner ${isPlayer1Turn ? 'green-bg' : ''}`} style={{ width: `${Math.floor((player1Health / 12000) * 100)}%` }}></div>
// </div>
// <div className={`health-bar ${isPlayer1Turn ? 'green-bg' : ''}`}>
//   <div className="health-info">
//     Player 2: {player2Health.toFixed(0)} / 10000 {/* Use toFixed(0) to round to the nearest integer */}
//   </div>
//   <div className={`health-inner ${isPlayer1Turn ? 'green-bg' : ''}`} style={{ width: `${Math.floor((player2Health / 10000) * 100)}%` }}></div>
// </div>
//       </div>
//     </div>
//   );
// }

export default Battle;
