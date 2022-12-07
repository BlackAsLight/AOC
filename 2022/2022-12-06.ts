const chars = (await Deno.readTextFile('./inputs/2022-12-06.txt'))
	.trim()
	.split('')

function distinctChars(size: number) {
	let i = 0
	for (; i < chars.length - size; ++i)
		if (new Set(chars.slice(i, i + size)).size === size) {
			console.log(chars.slice(i, i + size), i + size)
			break
		}
}

distinctChars(4)
distinctChars(14)
