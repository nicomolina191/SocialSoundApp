import React from 'react'
import s from './Chat.module.css'
import logo from '../../images/logoicon.png'
function Chat() {
  return (
    <div className={s.wholeContainer}>
        <div className={s.conversations}>
            <div className={s.convHead}>
            <h2 className={s.convTitle}>Messages</h2>
            <input className={s.chatSearch} type="text" />
            </div>
        </div>
        <div className={s.chatContainer}>
            <div className={s.receiver}>
                <img className={s.recPc} width='50px' src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/755c80088d2c6fd111162efa8235ecda~c5_720x720.jpeg?x-expires=1663750800&x-signature=b4o8P68%2B9ZZrgWTPWjzlXwus9O8%3D" alt="a" />
                <h4>John Doe</h4>
            </div>
            <div className={s.messagesContainer}></div>
            <div className={s.mCont}><input className={s.messageInput} type="text" /></div>
        </div>
    </div>
  )
}

export default Chat