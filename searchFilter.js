// search filter

(function () {

	String.prototype.toUnicodeRegex = function () {
		return this 
			// support Unicode equivalence
			.replace(/A|[\u00c2]|[\u00c0]|[\u00c1]|[\u00c5]|[\u00c3]/g, '(A|\u00c2|\u00c0|\u00c1|\u00c5|\u00c3)')   // Â|À|Á|Å|Ã
			.replace(/a|[\u00e2]|[\u00e0]|[\u00e1]|[\u00e5]|[\u00e3]/g, '(a|\u00e2|\u00e0|\u00e1|\u00e5|\u00e3)')   // â|à|á|å|ã
			.replace(/C|[\u00c7]/g, '(C|\u00c7)')                                                                   // Ç
			.replace(/c|[\u00e7]/g, '(c|\u00e7)')                                                                   // ç
			.replace(/E|[\u00c9]|[\u00ca]|[\u00c8]|[\u00cb]/g, '(E|\u00c9|\u00ca|\u00c8|\u00cb)')                   // É|Ê|È|Ë
			.replace(/e|[\u00e9]|[\u00ea]|[\u00e8]|[\u00eb]/g, '(e|\u00e9|\u00ea|\u00e8|\u00eb)')                   // é|ê|è|ë
			.replace(/I|[\u00cf]|[\u00ce]|[\u0130]/g, '(I|\u00cf|\u00ce|\u0130)')                                   // Ï|Î|?
			.replace(/i|[\u00ef]|[\u00ee]|[\u0131]/g, '(i|\u00ef|\u00ee|\u0131)')                                   // ï|î|?
			.replace(/O|[\u00d3]|[\u00d4]|[\u00d2]|[\u00d5]|[\u00c8]/g, '(O|\u00d3|\u00d4|\u00d2|\u00d5|\u00c8)')   // Ó|Ô|Ò|Õ|Ø
			.replace(/o|[\u00f3]|[\u00f4]|[\u00f2]|[\u00f5]|[\u00f8]/g, '(o|\u00f3|\u00f4|\u00f2|\u00f5|\u00f8)')   // ó|ô|ò|õ
			.replace(/S|[\u0160]/g, '(S|\u0160)')                                                                   // Š
			.replace(/s|[\u0161]/g, '(s|\u0161)')                                                                   // š
			.replace(/U|[\u00da]|[\u00db]|[\u00d9]/g, '(U|\u00da|\u00db|\u00d9)')                                   // Ú|Û|Ù
			.replace(/u|[\u00fa]|[\u00fb]|[\u00f9]/g, '(u|\u00fa|\u00fb|\u00f9)')                                   // ú|û|ù
			.replace(/Y|[\u00dd]|[\u0178]/g, '(Y|\u00dd|\u0178)')                                                   // Ý|Ÿ
			.replace(/y|[\u00fd]|[\u00ff]/g, '(y|\u00fd|\u00ff)')                                                   // ý|ÿ
			.replace(/Z|[\u017d]/g, '(Z|\u017d)')                                                                   // Ž
			.replace(/z|[\u017e]/g, '(z|\u017e)');                                                                  // ž
	};

	function searchFilter(searchArray) {

		var filteredArray = [], regExp;

		if (searchArray && searchArray.length > 0) {
			for (var i=0; i < searchArray.length; i++) {
				
				regExp = new RegExp(queryText.toUnicodeRegex(), 'ig');
				if (searchArray[i].trim().match(regExp)) {
					filteredArray.push(searchArray[i]);
				}
			}
		}

		// Sending filtered search list back to workerService
		postMessage(filteredArray);
	}
	
	onmessage = function (event) {
		if (event.data.text !== null || event.data.text !== '') {
			queryText = event.data.text;
		}
		searchFilter(event.data.list);
	};

}());