/**
 * Bingo Object : initialize the game
 */
var Bingo = {
    
    container : null,
    
    itemPerCollum : 4,
    
    itemPerRow : 4,
    
    json : null,
    
    /**
     * 
     * @param {Object} selectors, Bingo game container
     */
    init : function (selectors)
    {
        var _this = this;
        if(typeof this.json === "undefined" || this.json === null)
            AjaxRequest('js/data/terms.json', 'GET', function (res)
            {
                
                _this.json = JSON.parse(res.response);
                Grid.init(_this.json);
            });
        else Grid.init(this.json);
        
        var victoryHandler = function ()
        {
            var confirmation = confirm('VICTORY ! play again ?');
            if(confirmation) Grid.init(_this.json);
        };  
        
        window.addEventListener('VICTORY', victoryHandler);
        
    }
};

if(document.loaded) Bingo.init();
else {
    if (window.addEventListener) window.addEventListener('load', Bingo.init, false);
    else window.attachEvent('onload', Bingo.init);
}
