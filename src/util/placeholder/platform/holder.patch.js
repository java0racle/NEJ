/*
 * ------------------------------------------
 * 占位提示接口平台适配实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/element',
	'base/event',
	'./holder.js'
],function(_e,_v,_h,_p,_o,_f,_r){
	// for ie9-
	NEJ.patch('TR<=5.0',function(){
		// variable declaration
		/**
		 * 节点占位符行为，高版本浏览器用样式处理
		 * @param  {String|Node} _element 节点
		 * @param  {String}      _clazz   样式
		 * @return {Void}
		 */
		_h.__setPlaceholder = (function(){
		    // placeholder flag
		    var _cache = {};
		    // input foucs hide placeholder
		    var _onFocus = function(_event){
		        var _input = _v._$getElement(_event);
		        _cache[_input.id] = 2;
		        if (!!_input.value) return;
		        _e._$setStyle(_e._$wrapInline(_input),'display','none');
		    };
		    // input blur check placeholder show
		    var _onBlur = function(_event){
		        var _input = _v._$getElement(_event);
		        _cache[_input.id] = 1;
		        if (!!_input.value) return;
		        _e._$setStyle(_e._$wrapInline(_input),'display','');
		    };
		    // input value change
		    var _onInput = function(_event){
		        var _input = _v._$getElement(_event);
		        if (_cache[_input.id]==2) return;
		        _e._$setStyle(
		            _e._$wrapInline(_input),
		            'display',!_input.value?'':'none'
		        );
		    };
		    // wrapper input control
		    var _doWrapInput = function(_input,_clazz){
		        var _id = _e._$id(_input),
		            _label = _e._$wrapInline(_input,{
		                tag:'label',
		                clazz:_clazz
		            });
		        _label.htmlFor = _id;
		        var _text = _e._$attr(_input,'placeholder')||'';
		        _label.innerText = _text=='null'?'':_text;
		        var _height = _input.offsetHeight+'px';
		        _e._$style(_label,{
		            left:0,
		            // width:_input.offsetWidth+'px',
		            // height:_height,lineHeight:_height,
		            display:!_input.value?'':'none'
		        });
		    };
		    return function(_input,_clazz){
                // has been placeholded
                if (_cache[_input.id]!=null)
                    return;
                _doWrapInput(_input,_clazz);
                _cache[_input.id] = 1;
                // listen blur and focus event
                _v._$addEvent(_input,'blur',_onBlur._$bind(null));
                _v._$addEvent(_input,'focus',_onFocus._$bind(null));
                _v._$addEvent(_input,'input',_onInput._$bind(null));
        	};
		})();
    });
    
	return _h;
});