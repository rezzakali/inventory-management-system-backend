import app from './src/app';
import { config } from './src/config/app.config';
import connectDatabase from './src/config/database.config';

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
