export class Light
{
    constructor(ledNumber, container)
    {
        this.ledNumber = ledNumber;
        this.container = container;
        this.topDotsOrderedCollection = this.dotArr;
        this.timeoutId;                         
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
    
    dotArr = function orderTopDots()
    {
        const dots = document.querySelectorAll(".dot")
        const topArr = [], bottomArr = [];
        let resultArr = [] ;
        for(let i = 0; i < dots.length/2-3; i++)
        {
            topArr.push(dots[i])            
        }

        topArr.push(dots[dots.length/2-3]);
        topArr.push(dots[dots.length/2-1]);
        topArr.push(dots[dots.length/2+1]);
        
        for(let j = dots.length-1; j >= (dots.length - ((dots.length-3)/2)); j-- )
        {
            bottomArr.push(dots[j]);
        };

        bottomArr.push(dots[dots.length/2])
        bottomArr.push(dots[dots.length/2-2])

        resultArr =[...topArr, ...bottomArr];        
        return resultArr;       
    };

    welcomeDotsDisplay(arr)
    {
        const array = arr;
        let index = 0;
        let isGoDown = false;
        this.timeoutId = setInterval(() => {
            if (index != array.length &&!isGoDown)
            {                
                array[index].classList.add("dot-welcome");              
            }else if (index >= array.length && index < array.length * 2)
            {                
                array[index - array.length].classList.remove("dot-welcome");
                isGoDown = true;
            }            
            else
            {
                index = 0;
                clearInterval(this.timeoutId)
            }
            index++;             
        }, 15);        
    };

    cubeLightsOn(container)
    {
        container.forEach((el) =>
        {
            el.classList.add("qmark-active");
        })
    };

    cubeLightsOf(container)
    {
        container.forEach((el) =>
        {
            el.classList.remove("qmark-active");
        })
    };

    clearWelcomeDots(id, container)
    {
        clearTimeout(id)
        container.forEach(element => {
            element.classList.remove("dot-welcome");
        });
    };
};