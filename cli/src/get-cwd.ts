import fs from 'fs';
export const getCwd = () => fs.realpathSync(process.cwd());
