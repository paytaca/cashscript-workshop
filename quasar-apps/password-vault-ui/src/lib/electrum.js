import { ElectrumClient, } from '@electrum-cash/network';
import { ElectrumWebSocket } from '@electrum-cash/web-socket';

const websocket = new ElectrumWebSocket('electrum.paytaca.com', 443)
export const electrum = new ElectrumClient('CashScript Application', '1.4.1', websocket, { disableBrowserVisibilityHandling: true });
