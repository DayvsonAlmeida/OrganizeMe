import { BrowserRouter as HistoryRouter } from "react-router-dom";

import { AppRoutes } from "./routes/app.routes";
import { ProjectsProvider } from "./providers/projects";

function App() {
  return (
    <HistoryRouter>
      <ProjectsProvider>
        <AppRoutes />
      </ProjectsProvider>
    </HistoryRouter>
  );
}

export default App;
