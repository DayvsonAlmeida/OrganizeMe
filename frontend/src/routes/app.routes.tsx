import { Route, Routes } from "react-router-dom";

import { AppLayout } from "../layout";
import { NewProjectPage } from "../views/project/new";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<div>Project List</div>} />
        <Route path="project/*">
          <Route path="new" element={<NewProjectPage />} />
          <Route path=":id" element={<div>Project Tasks</div>} />
        </Route>
      </Route>
    </Routes>
  );
}
