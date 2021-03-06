import { SockJS as SockJSBrowser } from '../../external/sockjs-0.3.4';
import SockJSNode from 'sockjs-client';

/**
 * Check if socket is open
 *
 * @param {object} connector - A connector object
 *
 * @return {boolean} - True if open, false otherwise
 */
let checkReadyState = function(connector) {
	var self = connector;
	if (SockJSBrowser ? self.socket.readyState !== SockJSBrowser.OPEN : self.socket.readyState !== SockJSNode.OPEN) {
        return false;
    } 
    return true;
}

/**
 * Subscribe to the new blocks channel 
 *
 * @param {object} connector - A connector object
 * @param {function} callback - A callback function where data will be received
 *
 * @return the received data in the callback
 */
let subscribeNewBlocks = function(connector, callback) {
	var self = connector;
	if (!checkReadyState(connector)) {
        return false;
    }
	self.stompClient.subscribe('/blocks', function(data) {
        callback(JSON.parse(data.body));
    });
}

/**
 * Subscribe to the new height channel
 *
 * @param {object} connector - A connector object
 * @param {function} callback - A callback function where data will be received
 *
 * @return the received data in the callback
 */
let subscribeNewHeight = function(connector, callback) {
	var self = connector;
	if (!checkReadyState(connector)) {
        return false;
    }
	self.stompClient.subscribe('/blocks/new', function(data) {
        callback(JSON.parse(data.body));
	});
}

module.exports = {
	requests: {
		
	},
	subscribe: {
		height: subscribeNewHeight,
		blocks: subscribeNewBlocks
	}	
}