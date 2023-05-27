import { useState, useEffect } from 'react'
import './App.css'
import { db } from './firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


function App() {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("No Username set");
  const [number, setNumber] = useState("No number set");

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {

    onSnapshot(collection(db, "chat"), fetchedChat => {
      const fetchedData = [];
      fetchedChat.forEach(doc => {
        fetchedData.push(doc.data());
      })

      setMessages(fetchedData);
    })
  }

  const handleChatChange = (e) => {
    setMessage(e.target.value);
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  }

  const sendChat = async () => {
    if (message === "" || username === "") {
      alert(`Username or message cannot be empty!`);
    } else {
      await addDoc(collection(db, 'chat'), {
        user: username,
        message: message
      });
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <input type="text" placeholder='Enter username...' className="bg-info-subtle form-control mt-5" onChange={handleUsernameChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <input type="text" placeholder='Enter your number...' className="bg-info-subtle form-control mt-2" onChange={handleNumberChange} />
          </div>
        </div>
      </div>

      <main className='container p-2 my-5 border bg-dark-subtle'>
        <nav className="bg-info rounded p-2">
          <FontAwesomeIcon icon={faCoffee} />
        </nav>
        <div className="row p-3 ">
          <div className="col-4 border">
            <div className="input-group col-12 my-2">
              <button class="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
              <input type="text" className="form-control bg-secondary-subtle" placeholder='Search..' />
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-3 border">
                  <img src="https://www.pngmart.com/files/10/User-Account-PNG-Clipart.png" className='img-fluid' alt="#" />
                </div>
                <div className="col-9 border">
                  <div class="form-floating">
                    <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                      <option disabled></option>
                      <option value="1">Mute notification</option>
                      <option value="2">Delete chat</option>
                      <option value="3">Mark as read</option>
                    </select>
                    <label for="floatingSelect">{number}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-8 border ">
            <div className="container">

              {messages.map((text) => (
                <div className={`row  ${(text.user === username) ? "justify-content-end" : "justify-content-start"}`}>
                  <div className="col-sm-8 col-md-8">
                    <small className="text-muted">{(text.user === username) ? "You" : text.user}</small>
                    <p className={`alert ${(text.user === username) ? "alert-success" : "alert-info"}`}>{text.message}</p>
                  </div>
                </div>
              ))}

              <hr />
              <div className="row mb-2">
                <div className="col-md-10 col-sm-8">
                  <input type="text" className="form-control" placeholder='Write your message...'
                    onChange={handleChatChange} />
                </div>
                <div className="col-md-2 col-sm-2">
                  <button className="btn btn-info" onClick={sendChat}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
