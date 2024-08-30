import { execSync } from 'child_process';
import { join } from 'path';

export default async () => {
  const testDatabasePath = join(__dirname, '..', 'test-database.sqlite');
  try {
    execSync(`rm -f ${testDatabasePath}`);
    console.log(`Test database deleted: ${testDatabasePath}`);
  } catch (error) {
    console.error(`Error deleting test database: ${error.message}`);
  }
};
