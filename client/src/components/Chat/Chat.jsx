import React, { useEffect } from 'react'
import s from './Chat.module.css'
import logo from '../../images/logoicon.png'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/features/users/usersGetSlice'

function Chat() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.usersListAll)
    useEffect(() => {
        dispatch(getUser())
    }, [])
  const handleOnSearch = (string, results) => {
    console.log('SEARCHED', results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log('SELECTED', item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };
  return (
    <div className={s.wholeContainer}>
        {console.log(users)}
        <div className={s.conversations}>
            <div className={s.convHead}>
            <h2 className={s.convTitle}>Messages</h2>
            <ReactSearchAutocomplete
            items={users}
            fuseOptions={{ keys: ["name", "username"] }} // Search on both fields
            resultStringKeyName="name" // String to display in the results
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            showIcon={false}
            styling={{
              
              height: "34px",
              border: "none",
              borderRadius: "15px",
              backgroundColor: "white",
              boxShadow: "none",
              hoverBackgroundColor: "lightgreen",
              color: "darkgreen",
              fontSize: "12px",
              fontFamily: "Courier",
              iconColor: "green",
              lineColor: "lightgreen",
              placeholderColor: "darkgreen",
              // clearIconMargin: "3px 8px 0 0",
              zIndex: 2,
            }}
          />
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