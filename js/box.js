;(function ()
{
    /**
     * 
     */
    this.Box = (function ()
    {
        
        /**
         * Constructor
         * @param {Object} daddy
         * @param {String} term
         * @param {int} id
         */
        function Box (daddy, term, id)
        {
            this.daddy = daddy;
            this.term = term;
            this.id = id;
            this.$el = null;
            
            this.create();
        }
        
        /**
         * Create a box html object
         */
        Box.prototype.create = function ()
        {
            this.$el = addElement('div', '<div class="box box-' + this.id + '" >' + this.term + '</div>', this.daddy)
            
            this.$el.addEventListener('click', function ()
            {
                console.log('string');
            });
        };
        return Box;

    })();

}).call(this);