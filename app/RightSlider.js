export class Keyboard 
{

    constructor()
    {
        this.rightSliderWrapper = document.getElementById("right-slider");
    };

     show()
    {
        this.rightSliderWrapper.classList.add("show-right")        
    };

    hide()
    {
        this.rightSliderWrapper.classList.remove("show-right")        
    };


  

};