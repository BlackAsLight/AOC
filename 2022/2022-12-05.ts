const [ stacks, instructions ] = await(async () => {
	const [ status, instructions ] = (await Deno.readTextFile('./inputs/2022-12-05.txt'))
		.trimEnd()
		.split('\n\n')

	const lines = status.split('\n')
	const stacks = Object.fromEntries(lines.pop()?.trim().split('   ').map(x => [ x, [] as string[] ]) ?? [])
	for (let i = lines.length - 1; i >= 0; --i) {
		for (let j = 1; j < lines[ i ].length; j += 4) {
			const crate = lines[ i ].slice(j, j + 1).trim()
			if (crate)
				stacks[ (j + 3) / 4 ].push(crate)
		}
	}

	return [
		stacks,
		instructions
			.split('\n')
			.map(instruction => {
				const segments = instruction.split(' ')
				return [ parseInt(segments[ 1 ]), parseInt(segments[ 3 ]), parseInt(segments[ 5 ]) ]
			})
	]
})()

let stackCopy: { [ k: string ]: string[] } = JSON.parse(JSON.stringify(stacks))
for (const instruction of instructions)
	for (let i = 0; i < instruction[ 0 ]; ++i)
		stackCopy[ instruction[ 2 ] ].push(stackCopy[ instruction[ 1 ] ].pop() as string)
console.log(Object.values(stackCopy).map(stack => stack.pop() as string).join(''))

stackCopy = JSON.parse(JSON.stringify(stacks))
for (const instruction of instructions) {
	stackCopy[ instruction[ 2 ] ].push(...stackCopy[ instruction[ 1 ] ].splice(-instruction[ 0 ]))
}
console.log(Object.values(stackCopy).map(stack => stack.pop() as string).join(''))
