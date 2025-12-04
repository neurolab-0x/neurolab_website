#!/usr/bin/env node
import { cpSync, rmSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const cwd = process.cwd()
const standaloneDir = resolve(cwd, '.next', 'standalone')
const nextDir = resolve(cwd, '.next')
const dest = resolve(cwd, 'dist')

rmSync(dest, { recursive: true, force: true })

if (existsSync(standaloneDir)) {
  // Copy the standalone folder (preferred for server deployments)
  cpSync(standaloneDir, dest, { recursive: true })
  console.log('Copied .next/standalone -> dist')
} else if (existsSync(nextDir)) {
  // Fallback: copy entire .next
  cpSync(nextDir, dest, { recursive: true })
  console.log('Copied .next -> dist')
} else {
  console.error('No .next build directory found. Run `pnpm build` first.')
  process.exit(1)
}
