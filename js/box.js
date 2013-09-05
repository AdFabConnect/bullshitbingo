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
         * @param {Object} position
         */
        function Box (daddy, term, id, position)
        {
            this.daddy = daddy;
            this.term = term;
            this.id = id;
            this.position = position;
            this.$el = null;
            
        }
        
        /**
         * Create a box html object
         */
        Box.prototype.create = function ()
        {
            var _this = this;
            this.$el = addElement('div', '<div class="box box-' + this.id + '" >' + this.term + '</div>', this.daddy)
            this.$el.position = this.position;
            this.$el.addEventListener('click', function ()
            {
                event = document.createEvent("HTMLEvents");
                event.initEvent("BOX_SELECTED", true, true);
                _this.$el.dispatchEvent(event);
                _this.$el.style.color = 'red';
            });
        };
        return Box;

    })();

}).call(this);