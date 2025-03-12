// unistore
import createStore from 'unistore';

// Initial state
export const initialState = {
  input: '',
  placeholder: 'Paste something nostric (event JSON, nprofile, npub, nevent etc or hex key or id)',
  output: '',
  pubKeyHex: false,
  privKeyHex: false,
  nsec: false,
  npub: false,
  nprofile: false,
  event: false,
  seriazlizedEvent: false,
  impliedEventId: false,
  isSignatureValid: false,
  nevent: false,
  note: false
};

// Create store with initial state
export const store = createStore(initialState);

// Actions that can be used to update the store
export const storeActions = store => ({
  setInput: (state, input) => ({ input })
});
