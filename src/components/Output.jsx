import { connect } from 'unistore/preact';

// nostr-tools
import * as nip19 from "nostr-tools/nip19";
import { bytesToHex, hexToBytes } from "@noble/hashes/utils"
import { getPublicKey, verifyEvent } from "nostr-tools/pure"

// store
import { storeActions } from "@store"

// components
import { OutputField } from "@components/OutputField"

// vars
const relays = ['wss://relay.damus.io', 'wss://relay.snort.social', 'wss://relay.nostr.bg', 'wss://relay.nostr.band', 'wss://relay.nostr.info', 'wss://relay.nostr.land', 'wss://relay.nostr.ws', 'wss://relay.nostr.zone']

// functional component
export const Output = connect([ 'input'], storeActions)(({ input }) => {
  const unparsable = () => {
    let emojis = ['🥺', '🫣', '🤪', '🤨', '🤔', '🤷‍♂️', '🤷‍♀️', '🤷‍♂️', '🤷‍♀️', '🤷‍♂️', '🤷‍♀️', '🙈', '🫨', '😬', '😦', '😵‍💫', '🥴', '😷', '🙀', '🤌']
    return <p class="text-sm text-gray-500">{emojis[Math.floor(Math.random() * emojis.length)]} No valid JSON nor NIP-19 conform data.</p>
  }

  // return nothing if input is empty
  if (input.length === 0) return '';

  // Handle nostr: URI scheme (NIP-21)
  if (input.startsWith('nostr:')) {
    input = input.substring(6);
  }

  let nip19Entity = false;
  try {
    nip19Entity = nip19.decode(input);
    console.log('nip-19', nip19Entity.type, nip19Entity.data);
  } catch (error) {
    // console.error('No NIP-19 entity', error);
  }
  
  if (nip19Entity) {

    let conversions = {
      pubKey: { value: false, label: 'Public Key (HEX)'},
      privKey: { value: false, label: 'Pivate Key (HEX)'},
      nsec: { value: false, label: 'Nsec'},
      npub: { value: false, label: 'Npub'},
      nprofile: { value: false, label: 'Nprofile'},
      nevent: { value: false, label: 'Nevent'},
      nrelay: { value: false, label: 'Nrelay'},
    }

    switch (nip19Entity.type) {
      case 'nsec':
        conversions.nsec.value = nip19.nsecEncode(nip19Entity.data);
        conversions.privKey.value = bytesToHex(nip19Entity.data);
        conversions.pubKey.value = getPublicKey(nip19Entity.data);
        conversions.npub.value = nip19.npubEncode(conversions.pubKey.value);
        conversions.nprofile.value = nip19.nprofileEncode({ pubkey: conversions.pubKey.value });
        break;
      case 'npub':
        conversions.pubKey.value = nip19Entity.data;
        conversions.npub.value = nip19.npubEncode(nip19Entity.data);
        conversions.nprofile.value = nip19.nprofileEncode({ pubkey: conversions.pubKey.value });
        break;
      case 'nprofile':
        console.log('nprofile', nip19Entity.data.pubkey);
        conversions.pubKey.value = nip19Entity.data.pubkey;
        conversions.npub.value = nip19.npubEncode(nip19Entity.data.pubkey);
        conversions.nprofile.value = input;
        break;
    }

    return (
      <div class="results flex flex-col gap-2 pb-20">
        {Object.keys(conversions).map((key) => {
          return conversions[key].value ? <OutputField title={conversions[key].label} text={conversions[key].value} /> : null
        })}
      </div>
    )
  }

  let hexString = false;
  try {
    hexString = hexToBytes(input);
    console.log('hexString', hexString);
  } catch (error) {
    //console.error('No valid hex string', error);
  }

  if (hexString && (input.length === 64)) {
    let conversions = {
      isPubKey: {
        label: 'If this is a Public Key',
          values: {
          npub: { value: nip19.npubEncode(input), label: 'Npub'},
          nprofile: { value: nip19.nprofileEncode({ pubkey: input }), label: 'Nprofile'},
        }
      },
      isPrivKey: {
        label: 'If this is a Private Key',
          values: {
          nsec: { value: nip19.nsecEncode(hexToBytes(input)), label: 'Nsec'},
          npub: { value: nip19.npubEncode(getPublicKey(hexToBytes(input))), label: 'Npub'},
          nprofile: { value: nip19.nprofileEncode({ pubkey: getPublicKey(hexToBytes(input)) }), label: 'Nprofile'},
        }
      },
      isEvent: {
        label: 'If this is an Event ID',
          values: {
          nevent: { value: nip19.neventEncode({ id: input }), label: 'Nevent'},
          note: { value: nip19.noteEncode(input), label: 'Note'},
        }
      }
    }

    return (
      <div class="results flex flex-col gap-2 pb-20">
        {Object.keys(conversions).map((tKey) => {
          return (
            <div class="flex flex-col gap-2">
              <h2 class="text-lg font-bold">{conversions[tKey].label}</h2>
              {Object.keys(conversions[tKey].values).map((cKey) => {
                return <OutputField title={conversions[tKey].values[cKey].label} text={conversions[tKey].values[cKey].value} />
              })}
            </div>
          )
        })}
      </div>
    )
  }

  let isJSON = false;
  try {
    JSON.parse(input);
    isJSON = true;
  } catch (error) {
    //console.error('No valid JSON', error);
  }

  if (isJSON && verifyEvent(JSON.parse(input))) {

    let conversions = {
      isSigValid: {
        label: 'Is signature valid?',
        value: verifyEvent(JSON.parse(input), JSON.parse(input).sig) ? 'YES' : 'NO'
      },
      nevent: {
        label: 'Nevent',
        value: nip19.neventEncode({ id: JSON.parse(input).id })
      },
      note: {
        label: 'Note',
        value: nip19.noteEncode(JSON.parse(input).id)
      }
    }

    return (
      <div class="results flex flex-col gap-2 pb-20">
        {Object.keys(conversions).map((key) => {
          return conversions[key].value ? <OutputField title={conversions[key].label} text={conversions[key].value} copy={key === 'isSigValid' ? false : true} /> : null
        })}
      </div>
    )
  }

  // return unparsable if nothing else matches
  return (<div class="results flex flex-col gap-2 pb-20">{unparsable()}</div>)
})
