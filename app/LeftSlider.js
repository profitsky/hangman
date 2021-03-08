export class Items 
{

    constructor()
    {
        this.leftSliderWrapper = document.getElementById("left-slider");
        this.loadFunctionality = this.loadLeftSiderFunctionality();  
        
    };
    show()
    {
        this.leftSliderWrapper.classList.add("show-left")        
    };   

    openLeftMenu()
    {
        this.leftSliderWrapper.addEventListener("click", (e) => {
            e.stopPropagation();                   
            this.leftSliderWrapper.classList.toggle("open-left");
            
        });
    };

     hide()
    {
        this.leftSliderWrapper.classList.remove("show-left");
        this.leftSliderWrapper.classList.remove("open-left");       
    };

    loadLeftSiderFunctionality()
    {            
        this.openLeftMenu();     
         
    };



};