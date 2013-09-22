define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/query",
        "dojo/dom-class",
        "dojo/dom-style",
        "dojo/dom-geometry",
        "dojo/dom-construct",
        "dojo/on",
        "dojo/keys",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dojo/text!./DropDownMenuTemplates/DropDownMenuTemplate.html",
        "DropDownMenuWidget/DropDownMenuUtils",
        "dojo/NodeList-traverse"],
    function(declare,
    		 lang,
    		 array,
    		 query,
    		 domClass,
    		 domStyle,
    		 domGeom,
    		 domConstruct,
    		 on,
    		 keys,
    		 _WidgetBase,
    		 _TemplatedMixin,
    		 template,
    		 ddmUtils){
		
        return declare(_WidgetBase, {
        	baseClass: "ddm-default",
        	templateString: template,
        	
        	constructor: function(opts) {
        		if (lang.isString(opts.cname)) this.baseClass = opts.cname;
        		if (opts.targetNode) this.target = opts.targetNode;
        	},
        	
        	postCreate: function() {
        		this.inherited(arguments);
        	    this.setPosition();
        	    this.addStyle();
        	    var self = this;
        	    this.own(
	        	    on(window, "resize", function(evt){self.setPosition();}),
	        	    on(this.target, "blur", function(evt){self.hide();}),
	        	    on(this.target, "click", function(evt){
	        	    	evt.preventDefault();
	        	    	evt.stopPropagation();
	        	    	self.update();
	        	    	self.show();
	        	    }),
	        	    on(this.target, "keyup", function(evt){
	        	    	evt.preventDefault();
	        	    	evt.stopPropagation();
	        	    	var kc = evt.keyCode;
	    				var itemClass = self.getItemClass();
	    				var hltItemClass = self.getHighLightedItemClass();
	    				var hltItemNode = query("."+hltItemClass, self.domNode); //nodelist
	    				var allItems = query("."+itemClass, self.domNode);

	    				if (hltItemNode) {
	    					switch(kc) {
	    						case keys.UP_ARROW:
	    						case keys.LEFT_ARROW:
		    						hltItemNode.forEach(function(item) {domClass.remove(item, hltItemClass);});
		    						var prevNode = hltItemNode.prev();
		    						if (prevNode.length>0) prevNode.forEach(function(item) {domClass.add(item, hltItemClass);});
		    						else allItems.last().forEach(function(item) {domClass.add(item, hltItemClass);});
		    						break;
	    						case keys.DOWN_ARROW:
	    						case keys.RIGHT_ARROW:
		    						hltItemNode.forEach(function(item) {domClass.remove(item, hltItemClass);});
		    						var nextNode = hltItemNode.next();
		    						if (nextNode.length>0) nextNode.forEach(function(item) {domClass.add(item, hltItemClass);});
		    						else allItems.first().forEach(function(item) {domClass.add(item, hltItemClass);});
		    						break;
	    						case keys.ENTER:
		    						self.target.value = hltItemNode[0].innerHTML;
		    						self.hide();
		    						break;
		    					default:
		    						self.update();
		    						self.show();
	    					}
	    				}
	        	    })
        	    );
        	},
        	
        	getItemClass: function() {
        		return this.baseClass +"-item";
        	},
        	getHighLightedItemClass: function() {
        		return "active-"+this.baseClass+"-item";
        	},
        	
    		setPosition: function () {
    		    var pos = domGeom.position(this.target);
    		    if (this.domNode) domStyle.set(this.domNode, 
    		    		{"position": "absolute",
	    		    	 "left": pos.x + "px",
	    		    	 "top": (pos.y + pos.h)+"px" ,
	    		    	 "width": pos.w+"px"});
    		},
    		
    		addStyle: function () {
    			domStyle.set(this.domNode, {"overflow": "hidden", "background": "white"});
    			var style = query("style")[0];
    			if (!style) style = domConstruct.create("style", {"type" : "text/css"}, query("head")[0]);    			
    			var actRuleText =  "color: white; background-color: blue;";
    			var actSel = "div.active-" + this.baseClass +"-item";
    			var optRuleText = "cursor: pointer;";
    			var optSel = "div." + this.cname + "-item";
    			var cssTxtNode = domConstruct.toDom(optSel + " {" + optRuleText + "}\n" + actSel + " {" + actRuleText + "}");
    			domConstruct.place(cssTxtNode, style);
    		},
    		
    		hide: function() {
    			domStyle.set(this.domNode, "visibility", "hidden");
    		},
    		
    		show: function() {
    			domStyle.set(this.domNode, "visibility", "visible");
    		},
    		
    		fillItems: function(items) {
    			if (lang.isArray(items)) {
    				var itemClass = this.getItemClass();
    				var hltItemClass = this.getHighLightedItemClass();
    				var t = this.target;
    				var node = this.domNode;
    				domConstruct.empty(this.domNode);
    				array.forEach(items, function(item, index){
    					var itemNode = domConstruct.create("div", {}, node);
    					domClass.add(itemNode, itemClass);
    					if (index === 0) domClass.add(itemNode, hltItemClass);
    					itemNode.innerHTML = item;
    				});

    				this.own(
    					on(this.domNode, "div:mouseover", function(evt) {
    						query("div."+hltItemClass).forEach(function(hltItem) {
    							domClass.remove(hltItem, hltItemClass);
    						});
    						domClass.add(this, hltItemClass);
    					},
    					on(this.domNode, "div:mousedown", function(evt) {
    						t.value = this.innerHTML;
    					})
    				));
    			}
    		},
    		
    		//to be overwritten
    		update: function() {
    			/*
    			var serverList = ["ca.ibm.com","cn.ibm.com","in.ibm.com","uk.ibm.com","us.ibm.com"];
    			var items = ddmUtils.extendEmailServers(serverList, this.target.value);
    			this.fillItems(items);
    			*/
    		}
    		
        });
});