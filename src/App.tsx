import "./App.css";
import CountryCapitalGame from "./components/CountryCapitalGame";

function App() {
  return (
    <>
      <CountryCapitalGame
        data={{
          Denmark: "Copenhagen",
          Italy: "Rome",
        }}
      />
    </>
  );
}

export default App;
