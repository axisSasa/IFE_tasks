(function() {
	var rootNode = document.querySelector('.root'),
		time = 0,
		controler = document.querySelector('.control'),
		display = document.querySelector('.display');

	//节点展示
	function showNode( node, order, isQuery ) {

		setTimeout( function() {
			node.dataset.isBeingOrder = order;
			displayInfo(node.firstElementChild.innerHTML);
		}, time++ * 500);

		if (!isQuery) {
			setTimeout( function() {
				node.dataset.isBeingOrder = '';
			}, time * 500);
		}		
	}

	//生成span
	function getSpan( data ) {

		var textNode = document.createTextNode(data);
		var element = document.createElement("span");
		element.appendChild(textNode);
		return element;				
	}
	//展示span
	function displayInfo( data ) {
		var el = getSpan( data );
		display.appendChild( el );
	}

	//递归遍历
	var recursive = ( function recursiveFun( node ) {

		if ( node.children.length < 1 ) {
			console.log(false);
			return;
		} else {
			showNode( node, 'recursive' );
		}
		
		for (var i = 1, len = node.children.length; i < len; i++) {
			var child = node.children[i];
			
			if ( child && child.children.length >= 1 ) {
				recursiveFun( child );
			} 
		}
	} );

	//非递归
	function NonRecursive ( node, isDeepFir, val) {
		var stack = [],
			data_set = isDeepFir ? 'depth-first' : 'breadth-first';

		//先将根节点入队列
		stack.push( node );

		while( stack.length ) {

			let item = stack.shift(),
				i = 1,
				children = [];

			//处理搜索查询的情况
			if (item.firstElementChild.innerHTML.toLowerCase() == val) {
				showNode( item, data_set, true );
				break;
			} else {
				showNode( item, data_set, false );
			}

			while( i < item.children.length ) {
				//把当前节点的所有有用子节点放到children中
				children.push( item.children[i++] );
			}
			//广度优先、深度优先
			stack = isDeepFir ? children.concat(stack) : stack.concat(children);
		}
	}

	//统一在处理器这里处理遍历事件
	function handler( order, isDeepFir, val ) {	
		//清除上次搜索效果
		display.innerHTML = null;
		//搜索
		order( rootNode, isDeepFir, val );
		//重置计时器
		time = 0;		
	}

	//处理查询
	function query() {
		var val = document.querySelector('.control input').value.trim().toLowerCase(), 
			isDeepFir = document.querySelector('.control select').value === 'depth';

		handler(NonRecursive, isDeepFir, val);
	}

	var handleClick = function( ev ) {
		switch(ev.target.className) {
			case 'recursive' :
				handler(recursive);
				break;
			case 'depth-first' :
				handler(NonRecursive, true);
				break;
			case 'breadth-first' :
				handler(NonRecursive, false);
				break;
			case 'query' :
				query();
				break;
			default :
				console.log('无效点击');
		}
	};
	controler.addEventListener('click', handleClick, false);
})()