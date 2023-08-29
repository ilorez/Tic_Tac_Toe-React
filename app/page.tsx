'use client';
import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react';


function GameSection(){
  // const selfRef = useRef<Array<HTMLButtonElement | null>>([])
  const [btnsValue,setBtnsValue] = useState<Array<Array<string|number>>>([["","",""],["","",""],["","",""]]);
  const [message,setMessage] = useState<string>("it's X turn");
  const [isOTurn,setIsOTurn] = useState<boolean>(false);
  const [isLastTurnWasO,setIsLastTurnWasO] = useState<boolean>(false);
  const [isOver,setIsOver] = useState<boolean>(false);

  
  
  const clickedOn = (index:Array<number>) =>{

    if (btnsValue[index[0]][index[1]] != "" || isOver) return 
    let btnsCopy = [...btnsValue]
    btnsCopy[index[0]][index[1]]= isOTurn ? "O":"X"
    setBtnsValue(btnsCopy)
    setIsOTurn(!isOTurn)
    console.log(isOTurn)
    setMessage(isOTurn ? "it's O turn ":"it's X turn ")
  }
    const possibleWins = [
      [[0,0],[0,1],[0,2]],[[1,0],[1,1],[1,2]],[[2,0],[2,1],[2,2]],[[0,0],[1,0],[2,0]],[[0,1],[1,1],[2,1]],[[0,2],[1,2],[2,2]],[[0,2],[1,1],[2,0]],[[0,0],[1,1],[2,2]]
    ]
    const possibleWinsIds = [
      [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[3,5,7],[1,5,9]

    ]
  const checkWin = () =>{
    console.log('checking win...')
    possibleWins.forEach((win,index)=>{
      if(btnsValue[win[0][0]][win[0][1]] && btnsValue[win[0][0]][win[0][1]]===btnsValue[win[1][0]][win[1][1]] && btnsValue[win[1][0]][win[1][1]]===btnsValue[win[2][0]][win[2][1]]){
        console.log(`${btnsValue[win[1][0]][win[1][1]]} wins`);
        setMessage(`${btnsValue[win[1][0]][win[1][1]]} has won`)
        setIsOver(true);
        
        possibleWinsIds[index].forEach(id=>{
          let btn = document.querySelector(`#btn${id}`);
          if (btn){
            btn.classList.add(styles.bgGreen)
          }
          
        })
        
        
        
      }
      
    });
  }
  const checkDraw = () =>{
    console.log('checking draw')
    return btnsValue.every(row=> row.includes("") ? false:true);
    
    
  }


  useEffect(()=>{
    console.log('handlePlay')
    checkWin();
    if(!isOver){
      if(checkDraw()){
        setIsOver(true);
        console.log('draw')
        setMessage("Draw")
        const allBtns = document.querySelectorAll("[id^='btn']");
        allBtns.forEach(btn=>{
      btn.classList.add(styles.bgYellow)
    })
      }
    }
  },[btnsValue])

  const restartGame = () =>{
    setBtnsValue([["","",""],["","",""],["","",""]])
    setIsOver(false);
    setIsOTurn(!isLastTurnWasO)
    setIsLastTurnWasO(!isLastTurnWasO)
    setMessage(isOTurn ? "it's O turn ":"it's X turn ")
    console.log(message)
    const btnsGreen = document.querySelectorAll(`.${styles.bgGreen},.${styles.bgYellow}`);
    btnsGreen.forEach(btn=>{
      btn.classList.remove(styles.bgGreen,styles.bgYellow)
    })
    
  }

  return (
    <section className={styles.container}>
      <div className={styles.message}>{message}</div>
      <div className={styles.btnsSection}>
        {btnsValue.map((row, rowIndex) => (
          <div className={styles.row} >
            {row.map((col, colIndex) => (
              <button
                
                id={`btn${rowIndex * 3 + colIndex + 1}`}
                onClick={() => clickedOn([rowIndex, colIndex])}
              >
                {col}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div  className={styles.restartBtn}>
        <button  onClick={restartGame}>Restart</button>
      </div>
    </section>
  );
  
  
}

export default function Home() {
  
  return (
    <main className={styles.main}>  
      <GameSection />  
    </main>
  )
  }
