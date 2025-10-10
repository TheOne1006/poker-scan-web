import { setToken, getToken as storageGetToken } from './storage';



type JSMessage = {
    type: String,
    data: any
}


function inject() {
    let localWindow = (window as any);
    // PokerScan Bridge
    localWindow.PokerScanBridge = localWindow.PokerScanBridge || {
        networkStatus: 'online',

        // 接收来自App的消息
        receiveMessage: function (message: JSMessage) {
            console.log('收到App消息:', message);

            switch (message.type) {
                case 'setToken':
                    let token = message.data.token;
                    setToken(token);
                    break;
                case 'networkStatus':
                    this.networkStatus = message.data.status;
                    this.onNetworkStatusChanged && this.onNetworkStatusChanged(this.networkStatus);
                    break;
            }
        },

        // 获取Token
        getToken: function () {
            return storageGetToken();
        },

        // 获取网络状态
        getNetworkStatus: function () {
            return this.networkStatus;
        },

        // 回调函数（供Web端设置）
        onTokenReceived: null,
        onNetworkStatusChanged: null
    };

    // 通知Web端Bridge已准备就绪
    if (typeof localWindow.onPokerScanBridgeReady === 'function') {
        localWindow.onPokerScanBridgeReady();
    }   
}

inject();


