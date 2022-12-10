const instructions = (await Deno.readTextFile('./inputs/2022-12-10.txt'))
	.trim()
	.split('\n')

{
	let cycles = 0
	let x = 1
	let sum = 0
	for (let i = 0; i < instructions.length; ++i) {
		if (!((++cycles + 20) % 40))
			sum += cycles * x
		const [ type, value ] = instructions[ i ].split(' ') as [ 'noop', undefined ] | [ 'addx', string ]
		if (type === 'addx') {
			if (!((++cycles + 20) % 40))
				sum += cycles * x
			x += parseInt(value)
		}
	}
	console.log(sum)
}

const screen: boolean[][] = []
let cycles = 0
let x = 1
for (let i = 0; i < instructions.length; ++i) {
	if (!cycles)
		screen.push([])
	screen[ screen.length - 1 ].push(cycles + 1 === x || cycles === x || cycles - 1 === x)
	cycles = (cycles + 1) % 40

	const [ type, value ] = instructions[ i ].split(' ') as [ 'noop', undefined ] | [ 'addx', string ]
	if (type === 'addx') {
		if (!cycles)
			screen.push([])
		screen[ screen.length - 1 ].push(cycles + 1 === x || cycles === x || cycles - 1 === x)
		cycles = (cycles + 1) % 40
		x += parseInt(value)
	}
}
console.log(screen.map(row => row.map(bool => bool ? '#' : '.').join('')).join('\n'))
