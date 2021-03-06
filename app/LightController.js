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

      orderTopDots()
    {
        const dots = document.querySelectorAll(".dot")
        const topArr = [], bottomArr = [];
        let resultArr = [] ;
        for(let i = 0; i < dots.length/2-3; i++)
        {
            topArr.push(dots[i])            
        };

        topArr.push(dots[dots.length/2-1]);
        topArr.push(dots[dots.length/2+1]);

        for(let j = dots.length-1; j > dots.length-dots.length/2; j-- )
        {
            bottomArr.push(dots[j]);
        };

        bottomArr.push(dots[dots.length/2-2])

        resultArr =[...topArr, ...bottomArr];
     
        
    };

    


};