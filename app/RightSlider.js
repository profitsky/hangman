export class Keyboard 
{

    constructor()
    {
        this.rightSliderWrapper = document.getElementById("right-slider");
        this.rightTriggerWrapper = document.getElementById("trigger-right");
        this.loadFunctionality = this.loadRightSiderFunctionality();
    };

    show()
    {
        this.rightSliderWrapper.classList.add("show-right")        
    };

    openLeftMenu()
    {
        
        this.rightTriggerWrapper.addEventListener("click", (e) => {
            e.stopPropagation();                   
            this.rightSliderWrapper.classList.toggle("open-right");
        });
    };

    hide()
    {
        this.rightSliderWrapper.classList.remove("show-right")        
    };

     loadRightSiderFunctionality()
    {            
        this.openLeftMenu()
    };
};