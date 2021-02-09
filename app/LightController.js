export class Light
{
    constructor(ledNumber, container)
    {
        this.ledNumber = ledNumber;
        this.container = container;
    };

    generateLed()
    {
        for (let i = 0; i < this.ledNumber*1; i++)
        {
            let dot = document.createElement("div");
            dot.classList.add("led-dot");
            this.container.appendChild(dot);
        }
    }


};