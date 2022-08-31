import './messages.css';
import { format } from "timeago.js";

function Messages({friend, message, own}) {
     const PF = process.env.REACT_APP_PUBLIC_FOLDER;
     console.log(message)
     
     return (
          <>
               <div id='message1' className={own ? "Messgae own" : "Messgae"}>
                         {own ?
                              <div className="content-inner">
                                   <div className="cMessCont">
                                        <ion-icon
                                             class='aFMAll' 
                                             name="ellipsis-horizontal-outline"
                                        ></ion-icon>
                                        <p className="cFMess ">
                                        {message.text}
                                        </p>
                                   </div> 
                                   <div className="cTime">{format(message.createdAt)}
                                   </div>
                              </div> :
                              <div className="content-inner first-message">
                                   <img src={friend.userphoto ? friend.userphoto : PF+"noAvatar.png"} 
                                   alt="" 
                                   className="cFImg" 
                                   />
                                   <div className="cMessCont">
                                        <p className="cFMess ">
                                        {message.text}
                                        </p>
                                        <ion-icon
                                        class='aFMAll' 
                                        name="ellipsis-horizontal-outline"
                                        ></ion-icon>
                                   </div>
                              </div>
                              }
               </div>
          </>
     )
}

export default Messages