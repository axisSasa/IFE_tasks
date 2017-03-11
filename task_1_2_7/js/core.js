(function() {
	var rootNode = document.querySelector('.root'),
		time = 0,
		controler = document.querySelector('.control');

	function isDisableClick( bool ) {

		var controlers = controler.children;

		for (var i = 0; i < controlers.length; i++) {
			//h5之前的写法
			// if (bool ) {
			// 	controlers[i].setAttribute('disabled', 'disabled');
			// } else {
			// 	controlers[i].removeAttribute('disabled');
			// }
			//这是h5的disabled属性，为布尔值
			controlers[i].disabled = bool;
		}
	}

	function handler( order ) {	
		//开始遍历前禁用点击，遍历后开启
		//isDisableClick( true );
		order(rootNode);
		//isDisableClick( false );
		//重置计时器
		time = 0;		
	}
	//前序遍历
	function preOrder( node ) {
		if ( node ) {
			showNode( node );
			preOrder( node.children[0] );
			preOrder( node.children[1] );
		} 
	}
	//中序遍历
	function inOrder( node ) {
		if ( node ) {
			inOrder( node.children[0] );
			showNode( node );
			inOrder( node.children[1] );
		}
	}
	//后序遍历
	function postOrder( node ) {
		if ( node ) {
			postOrder( node.children[0] );
			postOrder( node.children[1] );
			showNode( node );
		}
	}
	//节点展示
	function showNode( node ) {

		setTimeout( function() {
			node.dataset.isBeingOrder = 'order';
		}, time++ * 500);

		setTimeout( function() {
			node.dataset.isBeingOrder = '';
		}, time * 500);
	}
	var handleClick = function( ev ) {
		switch(ev.target.className) {
			case 'preOrder' :
				handler(preOrder);
				break;
			case 'inOrder' :
				handler(inOrder);
				break;
			case 'postOrder' :
				handler(postOrder);
				break;
			default :
				console.log('无效点击');
		}
	};
	controler.addEventListener('click', handleClick, false);
})()