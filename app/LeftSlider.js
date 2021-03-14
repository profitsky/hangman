export class Items 
{

    constructor()
    {
        this.leftSliderWrapper = document.getElementById("left-slider");
        this.leftTriggerWrapper = document.getElementById("trigger-left");
        this.fishBowlWrapper = document.getElementById("fish-container");
        this.avatarWrapper = document.getElementById("avatar");        
        this.loadFunctionality = this.loadLeftSiderFunctionality();
        this.dropped = false;
    };

    show()
    {
        if(!this.dropped)
        this.leftSliderWrapper.classList.add("show-left")        
    };   

    openLeftMenu()
    {
        if(!this.dropped)
        this.leftTriggerWrapper.addEventListener("click", (e) => {
            e.stopPropagation();                   
            this.leftSliderWrapper.classList.toggle("open-left");
        });
    };

    hide()
    {
        this.leftSliderWrapper.classList.remove("show-left");
        this.leftSliderWrapper.classList.remove("open-left");       
    };

    dragStart()
    {
        this.fishBowlWrapper.addEventListener("dragstart", () =>{

            setTimeout(()=>{
                this.fishBowlWrapper.classList.add("dragging")
            }, 0);
        })
    };

    dragDrop()
    {
        this.fishBowlWrapper.addEventListener("dragend", (e) =>{
            e.preventDefault();        
           
           this.hide();
           this.dropped = true;           
           this.leftSliderWrapper.classList.remove("show-left");
        })
    };

    loadLeftSiderFunctionality()
    {            
        this.openLeftMenu();
        this.dragStart();
        this.dragDrop()
    };
};