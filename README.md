# FbMessengerBot
This repository contains the source to demo a Facebook messenger bit which can listen to messages from end-users, query sender's first & last name, and echo back the received message showing capability for machines to programmatically respond to all their messages in real-time.

## Tools

1. We use [Glitch](https://glitch.com/) which is a platform which provides free hosting of NodeJS server over an `https` URL.
2. Alternatively, one can use [ngrok](https://ngrok.com/) which provides a tunnel from a public URL to local development PC for easier testing and debugging.
3. [Nodemon](https://www.npmjs.com/package/nodemon) helps live reload applications when the source is changed and loaded locally.


## How to run

1. `nodemon --inspect server.js` [use `require('dotenv').config();` when not on glitch]

2. `ngrok http 3000` -- https link is needed here actually

3. Paste the domain obtained from #2 to app callback URL, like this: 
callback_url: https://anand-messenger-bot.glitch.me/webhook
verification token: TRAINING_BOT

4. Go to the messenger link of the page `https://www.messenger.com/t/${PAGE_NAME}` and start pinging.

5. Every ping is responded with a message: 
```
Hello Mr. ${last_name}, thanks for responding to us. We are currently busy but would respond to your following message later:
${message_text}
``` 

## Flow

1. When any user sends a message from messenger UI to page, we get a webhook ping like below:
```
{
    sender: { id: '2872396396200934' },
    recipient: { id: '308443763363318' },
    timestamp: 1586360660992,
    message: {
        mid: 'm_M2-JIMCQwQp0cFQ5zJPG8eY7lzkyVX8zM1Mq-eplFTg0bmgLsd0YfdFFkGPu-oNyoJAJk2511AZzX2p5QZS8UQ',
        text: 'Where are you located?'
    }
}
```

2. Details of params:
`psid` or `sender` is EntMessengerPageScopedID and does not represent a FB User but just an entity for user to page conversation.
`recipient` is the page id.
`mid` represents a unique id of every message.
`timestamp` is the unix timestamp in millis with GMT timezone.
`text` is the unicode encoded text

3. We can get the details of who the user is by making the following call:
`https://graph.facebook.com/${psid}?fields=first_name,last_name,profile_pic&access_token=${page_access_token}`

4. We can send a message back by a POST call to the message sender like below:

```
https://graph.facebook.com/v6.0/me/messages
{
    recipient: {
            id: ${psid},
        },
        message: {
            text: ${message}
        }
}
```

## Preview

![Messenger bot receive and reply](https://raw.githubusercontent.com/vishwarajanand/FbMessengerBot/master/demos/message_preview.png "Messenger bot receive and reply")

## Demo Video

[![Watch on YouTube](https://img.youtube.com/vi/AgRWCDcBHL4/hqdefault.jpg)](https://youtu.be/AgRWCDcBHL4)

https://youtu.be/AgRWCDcBHL4

## Common issues

1. FB Page only replies to me, but not someone else?

> The Facebook app is likely still in Development Mode. You can add someone as a tester of the app, if they accept, the app will be able to message them. Once ready, you may request the pages_messaging permission to be able to reply to anyone.

2. Nowhere to host the FB Messenger bot

> Use glitch (free) or ngrok (paid to use https) or any other tunnelling software to get a public URL for your deployment. `ngrok http 3000`

3. Cannot connect to the server

> Check whether `require('dotenv').config();` is enabled or not. If not enabled and not running in glitch (where .env files are autoloaded), the server may not run on port 3000.
