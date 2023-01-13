import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import { history } from "./history";
import { AppRoutes } from "./routes/app.routes";
import { ProjectsProvider } from "./providers/projects";

function App() {
  return (
    <HistoryRouter history={history}>
      <ProjectsProvider>
        <AppRoutes />
      </ProjectsProvider>
    </HistoryRouter>
  );
}

export default App;
