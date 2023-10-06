import c from "./App.module.css";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";





function App() {
  return (
    <div className={c.wrapper}>
      <div className={c.container}>
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
