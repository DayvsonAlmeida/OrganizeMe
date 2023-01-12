import env from "./config/env";
import app from "./config/app";

app.listen(env.PORT, () => {
  console.log(`Server runnig at http://localhost:${env.PORT}`);
});
