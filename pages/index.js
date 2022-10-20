import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [historyInput, setHistoryInput] = useState("");
  const [modelInput, setModelInput] = useState("");
  const [tokenInput, setTokentInput] = useState("");
  const [temperatureInput, setTemperatureInput] = useState("");
  const [buttonValue, setButtonValue] = useState("");

  const [result, setResult] = useState();

  async function onSubmit(event) {
    setButtonValue("Wait a minute, i am processing...");
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ history: historyInput, model: modelInput, token: tokenInput, temperature: temperatureInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setHistoryInput("");
    setModelInput("");
    setTokentInput("");
    setTemperatureInput("");
    setButtonValue("Magic Here");

  }

  return (
    <div>
      <Head>
        <title>OpenAI - Tests & Fun</title>
        <link rel="icon" href="/ia.png" />
      </Head>

      <main className={styles.main}>
        <img src="/ia.png" className={styles.icon} />
        <h3>Test OpenAI</h3>

        <form onSubmit={onSubmit}>
          <small>Davinci is the most capable GPT-3 model. He can do any task the other models can do, often with less context. In addition to responding to prompts, also supports inserting completions within text.</small>
          <select
            required
            name="model"
            id="modem-select"
            value={modelInput}
            onChange={(e) => setModelInput(e.target.value)}
            className={styles.modelStyle}
          >
            <option value="">--Please choose a model--</option>
            <option value="text-davinci-002">text-davinci-002</option>
            <option value="text-curie-001">text-curie-001</option>
            <option value="text-babbage-001">text-babbage-001</option>
            <option value="text-ada-001">text-ada-001</option>
          </select>

          <small>4000 max for davinci, 2048 max for other :</small>
          <input
            required
            type="number"
            max="4000"
            min="0"
            step="1"
            name="token"
            placeholder="Enter max token"
            value={tokenInput}
            onChange={(e) => setTokentInput(e.target.value)}
            className={styles.tokenStyle}
          />

          <small>Temperature : {temperatureInput}</small>
          <input
            required
            type="range"
            step="0.01"
            max="1"
            min="0"
            name="temperature"
            placeholder="Enter temperature"
            value={temperatureInput}
            onChange={(e) => setTemperatureInput(e.target.value)}
            className={styles.temperatureStyle}
          />

          <small>Here we go :)</small>
          <input
            required
            type="text"
            name="history"
            placeholder="Enter some words"
            value={historyInput}
            onChange={(e) => setHistoryInput(e.target.value)}
          />
          <input type="submit" id="submit" value={buttonValue} />
        </form>
        <div className={styles.result}>
          {result}
        </div>
      </main>
    </div>
  );
}
