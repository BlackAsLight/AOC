interface FileSystem {
	dirSize: number,
	[ key: string ]: number | FileSystem
}

const { fileSystem } = (await Deno.readTextFile('./inputs/2022-12-07.txt'))
	.trim()
	.split('\n')
	.slice(1)
	.reduce((OS, line) => {
		if (line.startsWith('$ cd')) {
			if (line === '$ cd ..')
				OS.scope.pop()
			else
				OS.scope.push(line.slice(5))
		}
		else if (line !== '$ ls') {
			let currentDir = OS.fileSystem
			for (let i = 0; i < OS.scope.length; ++i)
				currentDir = currentDir[ OS.scope[ i ] ] as FileSystem
			if (line.startsWith('dir')) {
				const dir = line.slice(4)
				if (!currentDir[ dir ])
					currentDir[ dir ] = { dirSize: 0 } as FileSystem
			}
			else {
				const [ num, fileName ] = line.split(' ')
				const size = parseInt(num)
				currentDir[ fileName ] = size
				currentDir = OS.fileSystem
				currentDir.dirSize += size
				for (let i = 0; i < OS.scope.length; ++i) {
					currentDir = currentDir[ OS.scope[ i ] ] as FileSystem
					currentDir.dirSize += size
				}
			}
		}
		return OS
	}, { fileSystem: { dirSize: 0 } as FileSystem, scope: [] as string[] })

// console.log(fileSystem)

let total = 0
function travelFileSystem(dir: FileSystem, func: ((dirSize: number) => void)) {
	func(dir.dirSize)
	for (const [ key, value ] of Object.entries(dir))
		if (typeof value !== 'number')
			travelFileSystem(dir[ key ] as FileSystem, func)
}

travelFileSystem(fileSystem, dirSize => dirSize <= 100_000 ? total += dirSize : null)
console.log(total)

const spaceNeeded = Math.max(fileSystem.dirSize - 40_000_000, 0)
const validSizes: number[] = []
travelFileSystem(fileSystem, dirSize => {
	if (dirSize >= spaceNeeded)
		validSizes.push(dirSize)
})
console.log(Math.min(...validSizes))
