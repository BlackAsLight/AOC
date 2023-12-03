const lines = (await Deno.readTextFile('./inputs/2023-12-01.txt'))
	.trim()
	.split('\n')

console.log(lines.reduce((sum, line) => {
	let num = ''
	for (let i = 0; i < line.length; ++i)
		if (parseInt(line[ i ]).toString() !== 'NaN') {
			num += line[ i ]
			break
		}
	for (let i = line.length - 1; 0 <= i; --i)
		if (parseInt(line[ i ]).toString() !== 'NaN') {
			num += line[ i ]
			break
		}
	return sum + parseInt(num)
}, 0))

const words = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ]
console.log(lines.reduce((sum, line) => {
	let num = ''
	x: for (let i = 0; i < line.length; ++i)
		switch (line[ i ]) {
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				num += parseInt(line[ i ])
				break x
			default:
				for (let j = 0; j < words.length; ++j)
					if (line.slice(i).startsWith(words[ j ])) {
						num += j + 1
						break x
					}
		}
	x: for (let i = line.length - 1; 0 <= i; --i)
		switch (line[ i ]) {
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				num += parseInt(line[ i ])
				break x
			default:
				for (let j = 0; j < words.length; ++j)
					if (line.slice(0, i + 1).endsWith(words[ j ])) {
						num += j + 1
						break x
					}
		}
	return sum + parseInt(num)
}, 0))
