"use client"
import { Button, Prompt } from "@medusajs/ui"
import React from "react"

const PromtMedusa = () => {
  return (
    <Prompt>
      <Prompt.Trigger asChild>
        <Button>Open</Button>
      </Prompt.Trigger>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Delete something</Prompt.Title>
          <Prompt.Description>
            Are you sure? This cannot be undone.
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel>Cancel</Prompt.Cancel>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  )
}

export default PromtMedusa
