var Grid = {
    
    container : '.wrapper',
    
    $container : null,
    
    itemPerCollum : 4,
    
    itemPerRow : 4,
    
    dataJson : null,
    
    arrayBox : [],
    
    init : function (dataJson)
    {
        this.dataJson = dataJson;
        this.$container = document.querySelectorAll(this.container);
        this.generateBox();
    },
    
    generateBox : function ()
    {
        for (var i = 0; i < this.dataJson.length; i++) {
            this.arrayBox.push( new Box(this.$container, this.dataJson[i].term, this.dataJson[i].id) );
        };
    }
    
};
