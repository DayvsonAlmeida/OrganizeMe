import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { AppRoutes } from "./routes/app.routes";
import { history } from "./history";

function App() {
  return (
    <HistoryRouter history={history}>
      <AppRoutes />
    </HistoryRouter>
  );
}

export default App;
