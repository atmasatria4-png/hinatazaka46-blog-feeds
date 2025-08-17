import { performance } from "perf_hooks"
import { main } from "../src/index"

const benchMain = async () => {
  const start = performance.now()
  await main()
  const end = performance.now()
  console.log(`main() took ${(end - start).toFixed(2)}ms`)
}

benchMain()