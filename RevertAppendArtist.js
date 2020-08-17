try {
	var Tracks = WScript.CreateObject("iTunes.Application").SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var currentTrack;

	while (i != tracksCount) {
		i++;
		currentTrack = Tracks.Item(i);
		
		var trackNameWithTitleAndArtist = currentTrack.Name;
		
		var separator = " - ";
		
		if(trackNameWithTitleAndArtist.search(separator) === -1)
			continue;
		
		var separatorIndex = trackNameWithTitleAndArtist.lastIndexOf(separator);
		var trackTitle = trackNameWithTitleAndArtist.slice(0, separatorIndex);
		var trackArtist = trackNameWithTitleAndArtist.slice((separatorIndex + separator.length), separatorIndex.length);

		currentTrack.Name = trackTitle;
		currentTrack.Artist = trackArtist;
	}
}
catch (err) {
		WScript.Echo(err.description + "\n\Maybe no tracks selected.");
}

WScript.CreateObject("WScript.Shell").AppActivate("iTunes");
WScript.Quit();
