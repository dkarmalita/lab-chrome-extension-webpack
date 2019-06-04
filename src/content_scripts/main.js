// content_script

import { getUserData } from './utils';
import { sendMessage, addExtensionListener } from './messenger';
import { log } from './logger';

const sendPandeInfo = (payload) => sendMessage('panda-info', payload)

const extensionListener = ((message, sender, sendResponse) => {
  console.log('got a message', message.type)
  switch (message.type) {
    case "super-power":
      console.log('got super-power message from BG')
      sendMessage('echo', 'super-power')
      break;

    // when a content_script get such request, it parses the cookie jwt token and broadcast the result.
    case 'get-crm-id':
      console.log('GET CRM ID REQ')
      const userData = getUserData()
      const { tabId } = message
      console.log('response', userData)
      console.log('cb', sendResponse)
      sendPandeInfo({ userData, tabId })
      break;

    case 'get-echo':
      console.log(`'get-echo' received`)
      sendResponse({ type: 'ECHO' })
      break;
  }
});

export default function main(){
  sendPandeInfo(getUserData())
  addExtensionListener(extensionListener)
  log('context_script is loaded', { window })
}