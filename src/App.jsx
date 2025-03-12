import { ui } from "@kksh/api/ui/custom"
import {
  ThemeProvider,
  ThemeWrapper
} from "@kksh/react"

import { useEffect } from "preact/hooks"
import { connect } from 'unistore/preact';

// store
import { storeActions } from "@store"

// components
import { Textarea } from "@components/Textarea"
import { Output } from "@components/Output"
import { Buttons } from "@components/Buttons"
// functional component
export const App = connect([], storeActions)(({}) => {
  useEffect(() => {
    ui.registerDragRegion()
    ui.showMoveButton({
      bottom: 0.2,
      left: 0.2
    })
  }, [])
  
  return (
    <ThemeProvider storageKey="kk-ui-theme">
      <ThemeWrapper>
        <main class="h-screen pt-14">
          <div class="container px-10">
            <h1 class="text-2xl font-bold pb-4">Nostr NIP-19 Tools</h1>
            <div class="flex flex-col gap-4">
              <Buttons />
              <Textarea />
              <Output />
            </div>
          </div>
        </main>
      </ThemeWrapper>
    </ThemeProvider>
  )
})
