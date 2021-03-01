export class Sufler
{
   
    messagesForUser = {
        welcome: "* W E L C O M E *  CAN YOU GUESS THE FILM TITLE FROM THE EMOJIS? UNPRESS TWO KNOBS AND TURN ON THE OVEN",
        rules: "TEST"
    }  

    constructor()
    {    
        this.hourskWrapper = document.getElementById("hours");
        this.timerDoteskWrapper = document.getElementById("dot-separator"); 
        this.minutesWrapper = document.getElementById("minutes");
        this.messageOutputWrapper = document.getElementById("message-output");
        this.infOutputWrapper = document.querySelectorAll(".disp-sufler")
        this.knobIndicatorWrapper = document.querySelectorAll(".knob-indicator")
        this.knobLabelWrapper = document.querySelectorAll(".knob-label > span")
        
        this.temporaryMessageContainer = "";           
        this.letterIndex = 0;
        this.addLetter = "";
        this.characterNumber = 18;
        this.idInterval;
        this.isMessageRunning = false;
        this.message = "";      
    };

    timer()
    {
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();                
        this.hourskWrapper.innerText = hour;
        this.timerDoteskWrapper.classList.toggle("hide-dot")
        this.minutesWrapper.innerText = minute;                   
    };

    timeStarter()
    {
        setInterval(() => {
            this.timer();            
        }, 1000);
    };

    splitMessage(txt)
    {
        let message = txt;        
        let tempArray = [];
        let sentence = "";
        let counter = 0;
        let i = 0;
        let arr = message.split(" ");

        for (let i = 0; i < arr.length; i++)
        {   
            sentence += arr[i] + (" ");
            if(sentence.trim().length <= this.characterNumber)
            {              
                tempArray[counter] = sentence.trim();        
            }
            else
            {
                sentence = arr[i] + (" ");
                counter++;
                tempArray[counter] = sentence.trim();
            }    
        };
        return tempArray;
    };
    
    typeMessage(txt)
    {
        const message = txt;
        const messageArray =  this.splitMessage(message);
        let index = 0;
        let rowIndex = 0;
        let addedLetter = " ";
        this.messageOutputWrapper.innerHTML = "";
        
        this.idInterval = setInterval(() => {
            if(index !== messageArray[rowIndex].length + 25)
            {
                addedLetter += messageArray[rowIndex].charAt(index);
                this.messageOutputWrapper.innerHTML = addedLetter;
                index++                                           
            }
            else if(rowIndex < messageArray.length-1 && messageArray.length > 1)
            {   
                index = 0;                
                rowIndex++;
                addedLetter = " ";                    
                this.messageOutputWrapper.innerHTML = addedLetter;             
            }
            else
            {
                index = 0;                
                rowIndex = 0;
                addedLetter = " ";                    
                this.messageOutputWrapper.innerHTML = addedLetter;      
            }            
            
        }, 75);   
    };

    stopMessage(interval)
    {
        clearInterval(interval);
        this.messageOutputWrapper.innerHTML = "";
    }
};





