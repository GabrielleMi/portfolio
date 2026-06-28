import { isObject } from '@GabrielleMi/core';

export const ROOT_DIR = '~';
export const CLEAR = 'clear';
export const CAT = 'cat';
export const CD = 'cd';
export const LS = 'ls';
export const LL = 'll';
export const HELP = 'help';
export const PWD = 'pwd';
export const HISTORY = 'history';
export const TREE = 'tree';
export const ECHO = 'echo';

type Command = `${string}` | `cd ${string}` | `cat ${string}`;
export const parseCommandPath = (command: Command) => {
  const cleanCommand = command.replace(/^(cd |cat )\s*/, '').trim();
  const match = cleanCommand.match(/^(.*\/)?([^/]+)$/);

  if (!match) {
    return null;
  }

  const [, dirname, basename] = match;

  return { dirname, basename };
};

export const navigateDir = (dir: Record<string, unknown>, currentPath: string[], path: string) => {
  const pathsToUpdate = [...currentPath];
  const normalizedPath = path.replace(/^cd\s+/, '').trim();
  const segments = normalizedPath ? normalizedPath.split(/[/\\]/).filter(Boolean) : [];
  let currentDir = pathsToUpdate.reduce((acc, segment) => {
    if (segment && isObject(acc[segment])) {
      return acc[segment] as Record<string, unknown>;
    }
    return acc;
  }, dir);

  segments.forEach((segment) => {
    if (segment === ROOT_DIR) {
      pathsToUpdate.length = 0;
      currentDir = dir;
    } else if (segment === '..') {
      pathsToUpdate.pop();
      currentDir = pathsToUpdate.reduce((acc, key) => {
        if (isObject(acc[key])) {
          return acc[key] as Record<string, unknown>;
        }
        return acc;
      }, dir);
    } else if (segment && isObject(currentDir[segment])) {
      currentDir = currentDir[segment] as Record<string, unknown>;
      pathsToUpdate.push(segment);
    } else {
      throw new Error(`No such directory: ${segment}`);
    }
  });

  return pathsToUpdate;
};

const searchMatches = (
  partialBasename: string,
  dir: Record<string, unknown>
) => {
  const possibleKeys = Object.keys(dir).filter((key) => {
    return key.startsWith(partialBasename);
  });

  if (possibleKeys.length === 1) {
    return possibleKeys[0].slice(partialBasename.length);
  }
};

const resolvePathTarget = (
  dir: Record<string, unknown>,
  currentPath: string[],
  command: string
) => {
  const parts = parseCommandPath(command);

  if (!parts) {
    return null;
  }

  const { dirname, basename } = parts;
  const paths = navigateDir(dir, currentPath, dirname || '');

  if (paths.length === 0) {
    return { basename, current: dir };
  }

  let current = dir;
  for (let i = 0; i < paths.length; i++) {
    const segment = paths[i];

    if (!isObject(current[segment])) {
      throw new Error(`No such file or directory: ${basename}`);
    }

    current = current[segment] as Record<string, unknown>;
  }
  return { basename, current };
};

export const autoCompletePath = (dir: Record<string, unknown>, dirPath: string[], command: string) => {
  try {
    const resolved = resolvePathTarget(dir, dirPath, command);
    if (!resolved) {
      return;
    }

    return searchMatches(resolved.basename, resolved.current);
  } catch (_) {
    // ignore errors
  }
};

export const getFileContent = (dir: Record<string, unknown>, pos: string[], command: string) => {
  const resolved = resolvePathTarget(dir, pos, command);
  if (!resolved) {
    return;
  }

  return resolved.current[resolved.basename];
};
