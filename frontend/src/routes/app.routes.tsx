import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../layout";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<div>Project List</div>} />
        <Route path="project/*">
          <Route path="new" element={<div>New Project</div>} />
          <Route path=":id" element={<div>Project Tasks</div>} />
        </Route>
      </Route>
    </Routes>
  );
}
