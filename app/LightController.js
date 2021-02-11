export class Light
{
    constructor(ledNumber, container)
    {
        this.ledNumber = ledNumber;
        this.container = container;
               
    };

    generateLed()
    {
        let i = 0;
        for (i = 0; i < (this.ledNumber*12); i++)
        {     
                  
            let led = document.createElement("div");            
            led.classList.add("led-dot");            
            this.container.appendChild(led);
            led.style.width = (100/(this.ledNumber*3))+ "%";            

            if(i <= this.ledNumber*3  || i >= ((this.ledNumber*6)-1) && i <= (this.ledNumber*6) || i >= (this.ledNumber*9)-1)

            {                      
                let dotes = document.createElement("div");
                dotes.classList.add("dot");
                led.appendChild(dotes);               
            };                    
        };    
    };

    runAnimation()
    {
        
    }

    


};