import React, { useState } from "react";
import { Container, Button } from "@material-ui/core";

function App() {
  const [greeting, setGreeting] = useState("");

  async function testDatabaseFetch() {
    let response = await fetch("/api");
    let item = await response.json();
    setGreeting(JSON.stringify(item));
  }

  return (
    <Container
      maxWidth="lg"
      className="App"
      style={{
        textAlign: "center"
      }}
    >
      <h1>react-speedrun</h1>
      <h2>Development Environment Bootstrap</h2>
      <Button variant="contained" color="primary" onClick={testDatabaseFetch}>
        Test Backend
      </Button>
      {greeting && (
        <>
          <h3>Got a response from backend:</h3>
          <p>{greeting}</p>
        </>
      )}
    </Container>
  );
}

export default App;
