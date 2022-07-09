import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import axios from "axios";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");

  function handleSignUpToNewsletter(event: FormEvent) {
    event.preventDefault();
    axios.post("/api/subscribe", { email });
  }

  return (
    <form onSubmit={handleSignUpToNewsletter}>
      <input
        type="email"
        placeholder="Type your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit">Inscrever</button>
    </form>
  );
};

export default Home;
