import path from 'path';
import fs from 'fs-extra';
import { getCwd } from './get-cwd';

const cwd = getCwd();

export const existPackage = () => fs.pathExists(path.join(cwd, 'package.json'));
