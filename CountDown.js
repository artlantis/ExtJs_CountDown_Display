/**
* @class Ext.ux.CountDown
* @extend Ext.Container
*
* Define control para mostrar mostrar un contador  de tiempo.
* @author Juan Carlos López Lopez
*/
Ext.define('Ext.ux.CountDown',
{
    extend: 'Ext.Container',
    xtype: 'countdown',
    alias: 'widget.countdown',
    /**
     * @cfg {Number} timeOut
     * Tiempo en milisegundos que contar el display digital.
     */
    timeOut: 0,
    /**
     * @cfg {Number} timer
     * Tiempo que va decrementando de timeOut
     */
    timer: 0,
    /**
    * @cfg {String} label
    * Etiqueta que se mostrara al lado del display digital.
    */
    label: '',
    /**
    * @cfg {String} status
    * Etiqueta que se mostrara el status del display digital.
    */
    status: 'stop',
    layout:
    {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },
    items:
    [
        {
            xtype: 'container',
            layout:
            {
                type: 'hbox',
                align: 'middle',
                pack:'center'
            },
            items:
            [
                {
                    xtype: 'label',
                    itemId: 'lblTitle',
                    margin: 10,
                    style: 'font-family:Arial;font-size:1.5em;',
                    text: ''
                },
                {
                    xtype: 'label',
                    itemId: 'lblTimer',
                    padding: 7,
                    width: 100,
                    style: 'background:black;color:yellow;font-family:ds-digi;font-size:2em;',
                    text: '00:00:00'
                }
            ]
        }                     
    ],

    initComponent: function ()
    {
        this.callParent(arguments);
        this.doInitialize();
    },

    setLabel: function(value)
    {
        var me = this;
        me.down('#lblTitle').setText(value);
    },

    setTimeOut: function (value)
    {
        var me = this;
        me.timeOut = value;
        me.down('#lblTimer').setText(me.MsToTime(me.timeOut));
    },

    doInitialize: function ()
    {
        var me = this;
        me.down('#lblTitle').setText(me.label);
        var value = me.MsToTime(me.timeOut);
        me.down('#lblTimer').setText('00:00:00');
    },

    start: function ()
    {
        var me = this;
        var value;
        if (me.status == 'running')
            me.stop();
        value = me.MsToTime(me.timeOut);
        me.down('#lblTimer').setText(value);
        me.timer = me.timeOut;
        me.thread =
        {
            run: function ()
            {
                me.timer = me.timer - 1000;
                if (me.timer < 0)
                {
                    Ext.TaskManager.stop(me.thread);
                    me.status = 'stop';
                    return;
                }
                else
                {
                    value = me.MsToTime(me.timer);
                    me.down('#lblTimer').setText(value);
                }
            },
            interval: 1000 //1 second
        };
        Ext.TaskManager.start(me.thread);
        me.status = 'running';
    },

    stop: function ()
    {
        var me = this;
        if (me.status == 'running')
        {
            Ext.TaskManager.stop(me.thread);
            me.status = 'stop';
            me.down('#lblTimer').setText('00:00:00');
        }        
    },

    /**
   *@method MsToTime
   * Método que parsea una determinada cantidad de milisegundos a dias, hora, minutos y segundos.
   *@param {int} miliseconds Milisegundos que se desea convertir a cadena en formato HH:mm:ss.ms
   *@param {int} inMillisec Indica si se incluye (true) o no (false) los milisegundos en el resultado de la función.
   */
    MsToTime: function (milliseconds, inMillisec)
    {
        var millisec = parseInt((milliseconds % 1000) / 100)
            , seconds = parseInt((milliseconds / 1000) % 60)
            , minutes = parseInt((milliseconds / (1000 * 60)) % 60)
            , hours = parseInt((milliseconds / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        if (Ext.isEmpty(inMillisec) || inMillisec == false)
            return hours + ":" + minutes + ":" + seconds;
        else
            return hours + ":" + minutes + ":" + seconds + "." + millisec;
    }
});