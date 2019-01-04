import path from 'path';
import fs from 'fs-extra';

export const existPackage = (cwd: string) => fs.pathExists(path.join(cwd, 'package.json'));
