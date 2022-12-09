enum Direction {
	L,
	D,
	R,
	U
}

const motions = (await Deno.readTextFile('./inputs/2022-12-09.txt'))
	.trim()
	.split('\n')
	.map(line => {
		const [ direction, steps ] = line.split(' ')
		return [ Direction[ (direction as 'U') ], parseInt(steps) ]
	})

console.log(simulateRope(2))
console.log(simulateRope(10))

function simulateRope(length: number) {
	const rope = []
	for (let i = 0; i < length; ++i)
		rope.push([ 0, 0 ])

	const positions = new Set<string>()
	positions.add(rope[ rope.length - 1 ].join(','))

	for (const [ direction, steps ] of motions)
		for (let i = 0; i < steps; ++i) {
			// Move Up, Down, Left or Right.
			rope[ 0 ][ direction % 2 ] += direction > 1 ? 1 : -1
			for (let j = 1; j < rope.length; ++j) {
				const diff = [ rope[ j - 1 ][ 0 ] - rope[ j ][ 0 ], rope[ j - 1 ][ 1 ] - rope[ j ][ 1 ] ]
				if (!(Math.abs(diff[ 0 ]) > 1 || Math.abs(diff[ 1 ]) > 1))
					continue

				if (rope[ j - 1 ][ 0 ] === rope[ j ][ 0 ] || rope[ j - 1 ][ 1 ] === rope[ j ][ 1 ]) {
					// Move Up, Down, Left or Right.
					const pos = Math.abs(diff[ 0 ]) > 1 ? 0 : 1
					rope[ j ][ pos ] += diff[ pos ] > 0 ? 1 : -1
				}
				else {
					// Move diagonally.
					rope[ j ][ 0 ] += diff[ 0 ] > 0 ? 1 : -1
					rope[ j ][ 1 ] += diff[ 1 ] > 0 ? 1 : -1
				}
			}
			positions.add(rope[ rope.length - 1 ].join(','))
		}

	return positions.size
}
