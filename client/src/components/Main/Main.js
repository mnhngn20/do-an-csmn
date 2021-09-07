import React, {useState, useEffect, useRef} from 'react';
import Auxi from '../../helpers/Auxi/Auxi';
import Social from '../Social/Social';
import ChatView from '../ChatView/ChatView';
import classes from './Main.module.css';

const Main = (props) => {
    const [isOnConversation, setIsOnConversation] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const container = useRef()
    let containerClasses = [classes.Container, classes.preload]
    const toggleConversation = () => {
        setIsOnConversation(true);
        console.log(isOnConversation);
    }
    useEffect(() => {
        setTimeout(function(){
            containerClasses = [classes.Container];
            setIsLoaded(true)
            console.log(isLoaded)
        },500);
    }, []);
    return (
        <Auxi>
            <div className = {[classes.Container, isLoaded ? null :classes.preload].join(' ')} ref={container}>
                <div className = {classes.Left}>
                    <Social setConversation={toggleConversation}/>
                </div>
                <div className = {[classes.Right, isOnConversation ? classes.Show : classes.Hide].join(' ')}>
                    <ChatView isOnConversation={isOnConversation} goBack={()=>setIsOnConversation(false)}/>
                </div>
                <div className = {classes.Social}>
                    <Social setConversation={toggleConversation}/>
                </div>
                <div className = {[classes.ChatView, isOnConversation ? classes.Show : classes.Hide].join(' ')}>
                    <ChatView isOnConversation={isOnConversation} goBack={()=>setIsOnConversation(false)}/>
                </div>
            </div>
        </Auxi>
    )
}

export default Main;