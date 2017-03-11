(function() {
	var rootNode = document.querySelector('.root'),
		time = 0,
		controler = document.querySelector('.control');

	//节点展示
	function showNode( node, order ) {

		setTimeout( function() {
			node.dataset.isBeingOrder = order;
		}, time++ * 500);

		setTimeout( function() {
			node.dataset.isBeingOrder = '';
		}, time * 500);
	}
	//前序遍历
	var preOrder = (function preOrderFun( node ) {
		if ( node ) {
			showNode( node, 'preorder' );
			preOrderFun( node.children[0] );
			preOrderFun( node.children[1] );
		} 
	});
	//中序遍历
	var inOrder = (function inOrderFun( node ) {
		if ( node ) {
			inOrderFun( node.children[0] );
			showNode( node, 'inorder' );
			inOrderFun( node.children[1] );
		}
	});
	//后序遍历
	var postOrder = (function postOrderFun( node ) {
		if ( node ) {
			postOrderFun( node.children[0] );
			postOrderFun( node.children[1] );
			showNode( node, 'postorder' );
		}
	});

	function handler( order ) {	

		order(rootNode);
		//重置计时器
		time = 0;		
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
			case 'together' :
				handler(preOrder);
				handler(inOrder);
				handler(postOrder);
				break;
			default :
				console.log('无效点击');
		}
	};
	controler.addEventListener('click', handleClick, false);
})()