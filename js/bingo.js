var Bingo = {
    
    container : null,
    
    itemPerCollum : 4,
    
    itemPerRow : 4,
    
    init : function (selectors)
    {
        AjaxRequest('js/data/terms.json', 'GET', function (res)
        {
            Grid.init(JSON.parse(res.response));
        });
        
    }
    
};

if(document.loaded) Bingo.init();
else {
    if (window.addEventListener) window.addEventListener('load', Bingo.init, false);
    else window.attachEvent('onload', Bingo.init);
}
