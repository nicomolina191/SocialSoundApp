import React, { useContext, useEffect } from 'react'
import s from './Chat.module.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getUserByFirebaseId } from '../../redux/features/users/usersGetSlice'
import { doc, getDoc, getDocFromServer, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../context'
import Conversations from './Conversations/Conversations'
import { changeUserChat } from '../../redux/features/chat/chatGetSlice'
import Input from './Input/Input'
import Messages from './Messages/Messages'


function Chat() {
    const dispatch = useDispatch()
    const {userFirebase} = useAuth()
    const users = useSelector(state => state.users.usersListAll)
    const currentUser = useSelector(state => state.users.currentUser)
    const destination = useSelector(state => state.chat.destination)
    useEffect(async() => {
      try{
        await dispatch(getUser())
        const docRef = doc(db, "userConversations", userFirebase?.uid);
        const docSnap = await getDocFromServer(docRef);
        userFirebase?.uid && !docSnap.exists() && await setDoc(doc(db, "userConversations", userFirebase.uid), {})
        userFirebase?.uid && await dispatch(getUserByFirebaseId(userFirebase?.uid))
      } catch(err) {
        console.log(err)
      } 
    }, [])


  const handleOnSearch = (string, results) => {
    console.log('SEARCHED', results);
  };

  const handleOnSelect = async(user) => {
    const combinedId = currentUser.idgoogle > user.idgoogle ? currentUser.idgoogle + user.idgoogle : user.idgoogle + currentUser.idgoogle;
    dispatch(changeUserChat({destination: user, chatId: combinedId}))
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userConversations", currentUser.idgoogle), {
          [combinedId + ".userInfo"]: {
            uid: user.idgoogle,
            displayName: user.name,
            photoURL: user.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userConversations", user.idgoogle), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.idgoogle,
            displayName: currentUser.name,
            photoURL: currentUser.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err){console.log(err)}
  };

  return (
    <div className={s.wholeContainer}>
        <div className={s.conversations}>
            <div className={s.convHead}>
            <h2 className={s.convTitle}>Messages</h2>
            <ReactSearchAutocomplete
            items={users}
            fuseOptions={{ keys: ["name", "username"] }} // Search on both fields
            resultStringKeyName="name" // String to display in the results
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
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
            {currentUser?.name ? <Conversations/> : <h3>loading...</h3>}
        </div>
        { currentUser?.name && destination?.name 
        ? <div className={s.chatContainer}>
            <div className={s.receiver}>
                <img className={s.recPc} width='50px' src={destination.avatar} alt="a" />
                <h4>{destination.name}</h4>
            </div>
            <div className={s.messagesContainer}><Messages/></div>
            <div className={s.mCont}><Input/></div>
         </div>

        : <div className={s.chatContainer}>
            <div className={s.receiver}></div>
            <div className={s.messagesContainer}><h2>Start a new chat or select a conversation</h2></div>
          <div className={s.mCont}></div>
        </div>
        }
    </div>
  )
}

export default Chat