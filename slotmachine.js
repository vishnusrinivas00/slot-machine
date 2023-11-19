const prompt = require("prompt-sync")();
const ROWS = 3;
const COLMN = 3; 

const SYMBOL_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8,
};
const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};
const deposit = () => {
while(true){
    const deposit_amount = prompt("How much would you like to deposit: ");
    const number_deposit = parseFloat(deposit_amount);

    if(isNaN(number_deposit)||number_deposit<=0){
        console.log("Invalid amount entered");
    }else{
        return(number_deposit);
    }
}
};
const getNumberoflines = () => {
while(true){
    const lines = prompt("Enter of lines you want to bet on (1-3): ");
    const numberoflines=parseFloat(lines);

    if(isNaN(numberoflines)||numberoflines<=0||numberoflines>3){
        console.log("Invalid number of lines bet on")
    }else{
        return(numberoflines)
    }
}
};
const getbet = (balance,numberoflines) => {
    while(true){
        const better = prompt("Enter your bet amount:  ");
        const numberofbet=parseFloat(better);
    
        if(isNaN(numberofbet)||numberofbet<=0||numberofbet>balance/numberoflines){
            console.log("You have bet more than your balance amount");
        }else{
            return(numberofbet);
        }
    }

};
const spin = () => {
    const symbols = [];
    for(const [symbol,count] of Object.entries(SYMBOL_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
      
    }

const reels = [];
for(let i=0;i<COLMN;i++){
    reels.push([]);
    const reel = [...symbols]
    for(let j=0;j<ROWS;j++){
        const random= Math.floor(Math.random() * reel.length );
        const reeler = reel[random];
        reels[i].push(reeler);
        reel.splice(random, 1);

    }

}
    return reels;

};
const transpose = (reels) => {
    const row = [];
    for(let i =0 ; i < ROWS ; i++){
        row.push([]);
        for(let j =0; j < COLMN ; j++){
            row[i].push(reels[j][i]);
        }
    }
    return row;
}
const printrows = (rows) => {
    for(const row of rows){
        let rowstring = "";
        for(const[i,symbol] of row.entries()){
            rowstring += symbol 
            if(i!= row.length-1){
                rowstring += " | "
            }
        }
        console.log(rowstring);
    }
 
};

const getwinnings = (numlines,getbett,rows) => {
    let winnings = 0;

    for (let row = 0; row < numlines; row++) {
      const symbols = rows[row];
      let allSame = true;
  
      for (const symbol of symbols) {
        if (symbol != symbols[0]) {
          allSame = false;
          break;
        }
      }
  
      if (allSame) {
        winnings += getbett * SYMBOL_VALUES[symbols[0]];
      }
    }
  
    return winnings;
  };

  const checkBalance = (balance) => {
    console.log("Current Balance: ", balance);
  };



brother = spin();
let balance = deposit();
const numlines = getNumberoflines();
const getbett = getbet(balance , numlines);
const rows = transpose(brother);
printrows(rows);
const winnings = getwinnings(numlines,getbett,rows);
console.log( "your winnings" , winnings)
checkBalance(balance - getbett + winnings);


