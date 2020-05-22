import { resolve as resolvePath } from 'https://deno.land/std@0.52.0/path/mod.ts'

function getAppPath() {
  switch (Deno.build.os) {
    case 'windows':
      return Deno.env.get('LOCALAPPDATA') + '\\gitkraken\\Update.exe'
    case 'darwin':
      return '/Applications/GitKraken.app/Contents/MacOS/GitKraken'
    default:
      throw 'This os is not currently supported!'
  }
}

function getArgs() {
  switch (Deno.build.os) {
    case 'windows':
      return ['--processStart', 'gitkraken.exe']
    default:
      return []
  }
}

function getTargetArgs(path: string) {
  const fullpath = resolvePath(path)

  switch (Deno.build.os) {
    case 'windows':
      return ['--process-start-args', `--path "${fullpath}"`]
    default:
      return ['--fullpath', path]
  }
}

async function execApp(cmd: string[]) {
  const p = Deno.run({ cmd })
  await p.status()
}

async function main() {
  const path = getAppPath()
  const args = getArgs()

  if (Deno.args.length < 1) {
    await execApp([path, ...args])
  } else {
    const target = getTargetArgs(Deno.args[0])
    await execApp([path, ...args, ...target])
  }
}

main().catch(error => console.log(error))
