import { builtinEnvironments } from 'vitest/environments';

// React Router uses Node's Request in jsdom. Its AbortSignal must come from
// the same realm; jsdom's browser AbortSignal is rejected by Node's fetch API.
export default {
  ...builtinEnvironments.jsdom,
  async setup(global, options) {
    const { AbortController, AbortSignal } = global;
    const environment = await builtinEnvironments.jsdom.setup(global, options);
    global.AbortController = AbortController;
    global.AbortSignal = AbortSignal;
    return environment;
  },
};
