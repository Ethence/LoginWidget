define(["dojo/_base/declare",
        "dojo/on",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin", 
        "dijit/_WidgetsInTemplateMixin",
        "dijit/layout/LayoutContainer",
        "dijit/layout/ContentPane",
        "dijit/form/Form",
        "dijit/form/TextBox",
        "dijit/form/CheckBox",
        "dijit/form/ToggleButton",
        "dijit/form/Button",
        //"dojo/text!./LoginTemplates/LoginTemplate.html"],
        "dojo/text!./LoginTemplates/LoginTemplateWithDijit.html"],
    function(declare,
             on,
    		 _WidgetBase,
    		 _TemplatedMixin,
    		 _WidgetsInTemplateMixin,
    		 LayoutContainer,
    		 ContentPane,
    		 Form,
    		 TextBox,
    		 CheckBox,
    		 ToggleButton,
    		 Button,
    		 template){
        return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        	baseClass: "loginbox",
        	templateString: template,
        	postCreate: function () {
        	    this.inherited(arguments);
        	    //alert(this.lgmcheckButton);
        	    this.own(
        	        on(this.lgmcheckButtonWidget, "click", function() {
                        if (!this.checked)this.set('iconClass', 'lgmchecked');
                        else this.set('iconClass', 'lgmunchecked');        	            
        	        })
        	    );
        	}
        });
});