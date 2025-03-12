import { Button } from "@kksh/react"
import { connect } from 'unistore/preact';

// nostr-tools
import { generateSecretKey, finalizeEvent, verifyEvent} from 'nostr-tools/pure'
import { nsecEncode } from 'nostr-tools/nip19'

// store
import { storeActions } from "@store"

// functional component
export const Buttons = connect(['input'], storeActions)(({ input, setInput }) => {

  const generateKeyPair = () => {
    let nsec = nsecEncode(generateSecretKey())
    setInput(nsec)
  }

  const generateEvent = () => {
    let sk = generateSecretKey();
    let event = finalizeEvent({
      kind: 1,
      content: randomEventContents[Math.floor(Math.random() * randomEventContents.length)],
      tags: [],
      created_at: Math.floor(Date.now() / 1000),
    }, sk)
    if (verifyEvent(event)) {
      setInput(JSON.stringify(event, null, 4))
    }
  }

  return (<div class="flex flex-row gap-2">
    <Button onClick={generateKeyPair}>
      Generate Keypar
    </Button>
    <Button onClick={generateEvent}>
      Generate Event
    </Button>
    {input && <Button variant="destructive" style={{ marginLeft: 'auto' }} onClick={() => setInput('')}>
      Clear
    </Button>}
  </div>)
})

// random event contents
const randomEventContents = [
  "Those bad jokes are the LLM's fault.",
  "Just deployed my first nostr client - it only shows cat memes, but it's sovereign cat memes!",
  "My Bitcoin node is so sovereign it refuses to sync with nodes it doesn't philosophically agree with.",
  "Who needs permission when you have private keys?",
  "Building permissionless software is like cooking without a recipe - chaotic but delicious.",
  "My nostr feed is just me talking to myself, but at least I own my data!",
  "Sovereign engineering is just spicy programming.",
  "Build -> Show -> Talk -> Realize you forgot to git push.",
  "Self-validating data is like having a very picky friend who fact-checks everything you say.",
  "Just wrote 'gm' on nostr. I'm basically a developer now.",
  "My Bitcoin wallet is so sovereign it won't even let ME access it sometimes.",
  "Who needs social media when you have decentralized social media that's down half the time?",
  "Permissionless software: because asking for permission is so Web2.",
  "My code is so self-validating it refuses to compile until Mercury is out of retrograde.",
  "Build -> Show -> Talk -> Watch 3 hours of Bitcoin podcasts -> Forget what you were building.",
  "Just made my software so sovereign it declared independence from my repository.",
  "My nostr client is so minimal it doesn't even display posts - peak sovereignty achieved!",
  "Who needs a database when you have the blockchain? (Everyone. Sometimes you need a database.)",
  "Wrote my first zap request, accidentally zapped my whole wallet.",
  "Self-validating data is like having a math teacher that always shows their work.",
  "My private key is so private even I don't know where it is.",
  "Just achieved perfect decentralization - now I can't find anything.",
  "Build -> Show -> Talk -> Get distracted by crypto Twitter -> Start over.",
  "Made my software so permissionless it won't even listen to my commands anymore.",
  "My Bitcoin node is running on a potato - organic, sovereign computing.",
  "Sovereign engineering is just regular engineering with extra philosophical debates.",
  "Just wrote a nostr client that only posts 'few understand this' - revolutionary!",
  "My code is so decentralized it's currently scattered across 17 different hard drives.",
  "Who needs user interfaces when you have command lines? (Please someone help with CSS).",
  "Build -> Show -> Talk -> Realize you're talking to yourself in the mirror.",
  "Just made my software so sovereign it started its own cryptocurrency.",
  "My nostr relays are so selective they only relay positive vibes.",
  "Permissionless development: when your code does whatever it wants anyway.",
  "Self-validating data is like having a very strict librarian in your code.",
  "Just deployed to mainnet! (It's a Hello World program but it's sovereign).",
  "My private keys are stored in a secret location (I forgot where).",
  "Build -> Show -> Talk -> Get into a philosophical debate about true decentralization.",
  "Made my app so decentralized even I don't know where the servers are.",
  "Just wrote a smart contract that only makes dumb decisions.",
  "My Bitcoin node is validating so hard it's questioning its own existence.",
  "Sovereign software: because sometimes you need your computer to have a superiority complex.",
  "Who needs cloud storage when you can have sovereign storage? (Please backup your keys).",
  "Build -> Show -> Talk -> Spend 5 hours explaining what nostr is.",
  "Just made my code so self-validating it rejected its own pull requests.",
  "My nostr client is so minimal it's basically just a blank screen - peak UX!",
  "Permissionless innovation is great until your code starts innovating without you.",
  "Self-validating data is like having a conspiracy theorist verify your groceries.",
  "Just achieved perfect sovereignty - now my software won't talk to any other software.",
  "My private key generation is so random it surprised even me (I lost everything).",
  "Build -> Show -> Talk -> Realize nobody understands what you built.",
  "Made my dapp so decentralized it decentralized itself out of existence.",
  "Just wrote a Bitcoin script that only accepts transactions on full moons.",
  "My code is so sovereign it refuses to use external libraries on principle.",
  "Permissionless systems: because chaos is a feature, not a bug.",
  "Self-validating code is like having a very pedantic friend review your life choices.",
  "Just deployed a truly sovereign solution (it's a text file on my desktop).",
  "My nostr feed is so curated it only shows posts I wrote while sleepwalking.",
  "Build -> Show -> Talk -> Fork -> Abandon -> Start over.",
  "Made my wallet so secure it won't let anyone use it, including me.",
  "Just achieved perfect decentralization by deleting all my code.",
  "My Bitcoin node is so independent it started its own consensus rules.",
  "Sovereign engineering is just regular engineering with more Twitter debates.",
  "Who needs documentation when you have sovereign code that explains itself?",
  "Build -> Show -> Talk -> Get into a heated debate about the definition of sovereignty.",
  "Just made my app so trustless it doesn't even trust itself.",
  "My private keys are protected by a very sophisticated security system (my cat).",
  "Permissionless development: when your code has more freedom than you do.",
  "Self-validating systems are like having a very strict parent for your data.",
  "Just deployed a new feature (it's a bug but we're calling it sovereign behavior).",
  "My nostr client is so advanced it posts to the future.",
  "Build -> Show -> Talk -> Realize you're the only user.",
  "Made my software so decentralized it's now a distributed system of bugs.",
  "Just wrote a smart contract that makes all the dumb mistakes so you don't have to.",
  "My code is so sovereign it declared independence from my git history.",
  "Permissionless innovation is great until your AI starts innovating without you.",
  "Self-validating code is like having a math professor grade their own homework.",
  "Just achieved perfect trustlessness - now my programs don't trust my input either.",
  "My Bitcoin wallet is so cold it's somewhere in Antarctica.",
  "Build -> Show -> Talk -> Spend 6 hours explaining why Web3 is the future.",
  "Made my app so secure it disappeared into its own encryption.",
  "Just wrote a decentralized app that centralizes everything (oops).",
  "My nostr keys are so private they're having a party without me.",
  "Sovereign software is like having a teenager - it does whatever it wants.",
  "Who needs servers when you have sovereign peers? (Please someone seed my data).",
  "Build -> Show -> Talk -> Watch your users build something completely different.",
  "Just made my code so immutable it won't let me fix bugs.",
  "My relay is so selective it only relays messages it personally agrees with.",
  "Permissionless systems: because sometimes you need your code to rebel.",
  "Self-validating data is like having a very paranoid friend check your work.",
  "Just deployed a truly sovereign solution (it only works on my machine).",
  "My private key backup strategy is based on interpretive dance.",
  "Build -> Show -> Talk -> Pivot -> Build something completely different.",
  "Made my software so trustless it fact-checks its own documentation.",
  "Just achieved perfect decentralization by losing all my data.",
  "My code is so sovereign it started its own digital nation.",
  "Permissionless development is just chaos with a fancy name.",
  "Self-validating systems are like having a very strict HOA for your data.",
  "Just wrote a Bitcoin script that only works during mercury retrograde.",
  "My nostr client is so minimal it's basically just a very expensive notepad.",
  "Build -> Show -> Talk -> Question everything -> Start over."
]