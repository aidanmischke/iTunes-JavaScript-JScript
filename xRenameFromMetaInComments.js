try {
	var Tracks = WScript.CreateObject('iTunes.Application').SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var currentTrack;

	var fields = ["Name", "Artist", "Album", "AlbumArtist", "Year"];
	
	while (i != tracksCount) {
		i++;
		currentTrack = Tracks.Item(i);
		
		if(currentTrack.Comment === "")
			continue;
		
		var regexPattern = '^{';
		for(var j = 0; j < fields.length; j++)
		{
			regexPattern += '"[A-Za-z]+":"(.*)"';			
			if(j !== (fields.length-1))
				regexPattern += ',\n';			
		}
		
		regexPattern += '}$';
		
		var regex = RegExp(regexPattern);
		
		var match = regex.exec(currentTrack.Comment);

		if(match === null)
			continue;
			
		for(var k = 0; k < fields.length; k++)
		{
			currentTrack[fields[k]] = match[k+1];
		}
	}
}
catch (err) {
		WScript.Echo(err.description + '\n\Maybe no tracks selected.');
}

WScript.CreateObject('WScript.Shell').AppActivate('iTunes');
WScript.Quit();
