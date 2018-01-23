walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			if(node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node);
            }
			break;
	}
}

function handleText(textNode) 
{
	var oldValue = textNode.nodeValue;
	v = oldValue;

	v = v.replace(/\bBitCoins\b/g, "Dunning-Krugerrands");
	v = v.replace(/\bBit Coins\b/g, "Dunning-Krugerrands");
	v = v.replace(/\bBit coins\b/g, "Dunning-Krugerrands");
	v = v.replace(/\bit Coins\b/g, "Dunning-Kruggerands");
	v = v.replace(/\bbit coins\b/g, "Dunning-Krugerrands");
	v = v.replace(/\bitcoins\b/g, "Dunning-Krugerrands");
	v = v.replace(/\bBitcoins\b/g, "Dunning-Krugerrands");
	v = v.replace(/\bBitcoin\b/g, "Dunning-Krugerrand");
	v = v.replace(/\bbitcoin\b/g, "Dunning-Krugerrand");
	v = v.replace(/\bbitCoin/g, "Dunning-Krugerrrand");
	v = v.replace(/\bBit-Coin\b/g, "Dunning-Krugerrand");
	v = v.replace(/\bBit-Coins\b/g, "Dunning-Krugerrands");
	v = v.replace(/\bbit-coin\b/g, "Dunning-Krugerrand");
	v = v.replace(/\bbitcoins\b/g, "Dunning-Kurgerrands");

	
	// avoid infinite series of DOM changes
	if (v !== oldValue) {
		textNode.nodeValue = v;
	}
}

if (window.MutationObserver) {
	var observer = new MutationObserver(function (mutations) {
		Array.prototype.forEach.call(mutations, function (m) {
			if (m.type === 'childList') {
				walk(m.target);
			} else if (m.target.nodeType === 3) {
				handleText(m.target);
			}
		});
	});

	observer.observe(document.body, {
		childList: true,
		attributes: false,
		characterData: true,
		subtree: true
	});
}