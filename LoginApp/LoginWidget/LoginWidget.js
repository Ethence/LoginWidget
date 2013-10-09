define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin", 
        "dojo/text!./LoginTemplates/LoginTemplate.html"],
    function(declare, 
    		 _WidgetBase,
    		 _TemplatedMixin,
    		 template){
        return declare([_WidgetBase, _TemplatedMixin], {
        	baseClass: "loginbox",
        	templateString: template,

        });
});