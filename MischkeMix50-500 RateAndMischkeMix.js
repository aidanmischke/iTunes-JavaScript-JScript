try {
	var Tracks = WScript.CreateObject('iTunes.Application').SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var currentTrack;

	var fields = ["Name", "Artist", "Album", "AlbumArtist", "Year"];
	
	var album = "Mischke Mix";
	
	var artist2 = "AA MIX";
	var album2 = artist2;
	
	while (i != tracksCount) {
		i++;
		currentTrack = Tracks.Item(i);
		
		// Skip tracks that have been processed before.
		if(currentTrack.Album === album)
			continue;
		
		// Only keep AlbumArtist if it differs to Artist.
		if(currentTrack.AlbumArtist === currentTrack.Artist)
			currentTrack.AlbumArtist = "";
		
		// Add metadata to comments.
		if (!(currentTrack.Artist === artist2 || currentTrack.Album === album2))
		{		
			var metadata = '{';
			for(var j = 0; j < fields.length; j++)
			{
				metadata += '"' + fields[j] + '":"' + currentTrack[fields[j]] + '"';
				
				if(j !== (fields.length-1))
					metadata += ',\n';
			}

			metadata += '}';
			
			currentTrack.Comment = metadata;
		}
		
		// Change track number based on star TrackNumber: 50 for 5 stars, 500 for half a star.
		var firstTrackNumber = 50;
		
		switch (currentTrack.Rating) {
			case 100:
				currentTrack.TrackNumber = getTrackNumber(0);
				break;
			case 90:
				currentTrack.TrackNumber = getTrackNumber(1);
				break;
			case 80:
				currentTrack.TrackNumber = getTrackNumber(2);
				break;
			case 70:
				currentTrack.TrackNumber = getTrackNumber(3);
				break;
			case 60:
				currentTrack.TrackNumber = getTrackNumber(4);
				break;
			case 50:
				currentTrack.TrackNumber = getTrackNumber(5);
				break;
			case 40:
				currentTrack.TrackNumber = getTrackNumber(6);
				break;
			case 30:
				currentTrack.TrackNumber = getTrackNumber(7);
				break;
			case 20:
				currentTrack.TrackNumber = getTrackNumber(8);
				break;
			case 10:
				currentTrack.TrackNumber = getTrackNumber(9);
				break;			
			default:
				// Intentionally empty.
				break;		
		}
		
		// Remove fields we don't want.
		currentTrack.Compilation = false;
		currentTrack.AlbumArtist = "";
		currentTrack.Grouping = "";
		currentTrack.Genre = "";
		
		currentTrack.TrackCount = 0;
		currentTrack.DiscNumber = 0;
		currentTrack.DiscCount = 0;

		currentTrack.SortName = "";
		currentTrack.SortArtist = "";
		currentTrack.SortAlbumArtist = "";
		currentTrack.SortAlbum = "";
		currentTrack.SortComposer = "";

		// Rename Album
		currentTrack.Album = album;
	}
	
	//WScript.Echo("Done!");
}
catch (err) {
		WScript.Echo(err.description + '\n\Maybe no tracks selected.');
}

WScript.CreateObject('WScript.Shell').AppActivate('iTunes');
WScript.Quit();


function getTrackNumber(multiplier) {
	return firstTrackNumber + (multiplier * 50);
};
