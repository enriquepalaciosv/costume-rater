import React from "react";
import { initializeApp } from "firebase/app";
import { Flex } from "antd";
import { Rater } from "./components/Rater";

const firebaseConfig = {
  apiKey: "AIzaSyCgkeUzThpgmdzY6UgUpVTZqmWr-2kbrrQ",
  authDomain: "costume-rater.firebaseapp.com",
  databaseURL: "https://costume-rater-default-rtdb.firebaseio.com",
  projectId: "costume-rater",
  storageBucket: "costume-rater.appspot.com",
  messagingSenderId: "410923968247",
  appId: "1:410923968247:web:49604b99ae9ab281b495f2",
  measurementId: "G-FT40JQ97W5"
};

initializeApp(firebaseConfig);

function App() {
  return (
    <Flex vertical justify="center" align="center" style={{ margin: '16px' }}>
      <Rater />
    </Flex>
  );
}

export default App;
