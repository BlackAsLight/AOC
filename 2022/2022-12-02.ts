const hand: Record<string, string> = {
	Rock: 'A',
	Paper: 'B',
	Scissors: 'C',
	A: 'Rock',
	B: 'Paper',
	C: 'Scissors',
	X: 'Rock',
	Y: 'Paper',
	Z: 'Scissors'
}

const points: Record<string | number, number | string> = {
	Rock: 1,
	Paper: 2,
	Scissors: 3,
	1: 'Rock',
	2: 'Paper',
	3: 'Scissors'
}

const lines = (await Deno.readTextFile('./inputs/2022-12-02.txt'))
	.trim()
	.split('\n')

let total = lines
	.reduce((total, line) => {
		const theirHand = hand[ line[ 0 ] ]
		const myHand = hand[ line[ 2 ] ]
		total += points[ myHand ] as number
		if (theirHand === myHand)
			return total + 3
		if (((points[ theirHand ] as number) + 1) % 3 === (points[ myHand ] as number) % 3)
			return total + 6
		return total
	}, 0)
console.log(total)

const select: Record<string, (hand: string) => string> = {
	X: (hand: string) => points[ ((points[ hand ] as number) + 2) % 3 || 3 ] as string,
	Y: (hand: string) => hand,
	Z: (hand: string) => points[ ((points[ hand ] as number) + 1) % 3 || 3 ] as string
}

total = lines
	.reduce((total, line) => {
		const theirHand = hand[ line[ 0 ] ]
		const myHand = select[ line[ 2 ] ](theirHand)
		total += points[ myHand ] as number
		if (theirHand === myHand)
			return total + 3
		if (((points[ theirHand ] as number) + 1) % 3 === (points[ myHand ] as number) % 3)
			return total + 6
		return total
	}, 0)
console.log(total)
