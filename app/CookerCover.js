export class Door
{

      objectGeomProperties = {

        knobOutline: undefined,              
        outlinePositionY: undefined,        
        outlineHeight: undefined,        
        centerY: undefined
    };

    startTranslateValue = 0;
    translateValue = 0;
    angle = 0;
    readTranslatePosition = 0;
    isAngleValueReadable = false;
    isHandlePressed = false;

    constructor()
    {
        this.doorCoverWrapper = document.querySelector(".cooker-door-cover");
    };

    setMouseDown()
    {            
        this.doorCoverWrapper.addEventListener("mousedown", (e)=>
        {
            if(!this.isHandlePressed)
            {
                e.stopPropagation();
                this.startTranslateValue = e.clientY;                           
                this.isHandlePressed = true;
            };       
        })
    };

    setMouseMove()
    { 
       
        this.doorCoverWrapper.addEventListener("mousemove", (e)=>
        {
            if(this.isHandlePressed)
            { 
                e.stopPropagation();
                this.readTranslatePosition = e.clientY;
                this.translateValue = this.readTranslatePosition - this.startTranslateValue;
                let rotate = this.translateValue + this.angle;
                
                this.isHandlePressed = true; 
                this.doorCoverWrapper.style.transform =  "rotateX(" + (-rotate/(this.objectGeomProperties.outlineHeight * 0.012)) + "deg)"; 
                
                if(this.angValue(this.doorCoverWrapper) >= 78)
                {                   
                    this.doorCoverWrapper.style.transform =  "rotateX(" + (-77.99) + "deg)";
                    console.log((-rotate/(this.objectGeomProperties.outlineHeight * 0.012)))
                    console.log(this.angValue(this.doorCoverWrapper))
                }else if (this.angValue(this.doorCoverWrapper) <= 0)
                {
                    this.doorCoverWrapper.style.transform =  "rotateX(" + (-0.01) + "deg)";
                }
            };
        }) 
    };

    setMouseUp()
    {
        this.doorCoverWrapper.addEventListener("mouseup", (e) =>
        {
            if(this.isHandlePressed){
                e.stopPropagation(); 
                const translate = e.clientY;
                
                this.isHandlePressed = false;

                if(this.readTranslatePosition == translate)
                {
                    this.angle += this.translateValue;
                }
            };
        }) 
        this.isHandlePressed = false;        
    };

    mouseLeave()
    {
        this.doorCoverWrapper.addEventListener("mouseleave", () =>
        {
            this.setMouseUp();       
            
        })
        this.isHandlePressed = false;
    };

    getOutLineGeomProperties()
    {        
        this.objectGeomProperties.doorOutline = this.doorCoverWrapper.getBoundingClientRect(); 
        this.objectGeomProperties.outlinePositionY = this.objectGeomProperties.doorOutline.top;
        this.objectGeomProperties.outlineHeight = this.objectGeomProperties.doorOutline.height;        
        this.objectGeomProperties.centerY = this.objectGeomProperties.outlinePositionY + (this.objectGeomProperties.outlineHeight / 2);        
    };

    angValue = function getKnobAngleValue(element)
    {
        const st = window.getComputedStyle(element, null);
        const tr = st.getPropertyValue("transform");                      
        var values = tr.split('(')[1].split(')')[0].split(',');                                
        const pi = Math.PI,
        matrixVal10 = parseFloat(values[9]),
        a = Math.round(Math.asin(matrixVal10) * 180 / pi);                      

        return a;
    };
};