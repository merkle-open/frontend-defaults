import path from 'path';
import fs from 'fs-extra';

export const existPackage = (cwd?: string) => cwd ? fs.pathExists(path.join(cwd, 'package.json')) : false;
