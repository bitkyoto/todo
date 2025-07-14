import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainPage } from "./pages/MainPage";
import { CalendarPage } from "./pages/CalendarPage";
import { HistoryPage } from "./pages/HistoryPage";
import { Layout } from "./components/Layout";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
