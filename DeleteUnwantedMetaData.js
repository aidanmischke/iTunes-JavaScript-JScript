try {
	var Tracks = WScript.CreateObject('iTunes.Application').SelectedTracks;
	var i = 0;
	var tracksCount = Tracks.Count;
	var currentTrack;

	var fields = [
"Composer",
"Genre",
"TrackCount",
"DiscNumber",
"DiscCount"
/*
"Name",
"Artist",
"Album",
"AlbumArtist",
"Year"

"Rating",

"Index", // Index increments from 1 starting at bottom of an unsorted playlist.
"DateAdded",
"Time",
"Duration",
"Composer",
"Genre",

"BitRate",
"SampleRate",
"TrackNumber",
"TrackCount",
"DiscNumber",
"DiscCount",
"VolumeAdjustment",

"Eq",
"KindAsString", // MPEG audio file, AAC audio file
"Kind", // Audio always seems to be 1. Videos too.
"MediaKind",
"VideoKind",
"Enabled", // Whether checkbox is ticked. Use for syncing only enabled tracks.
"Start",
"Finish",
"PlayedCount",
"SkippedCount",
"Compilation",
"Grouping",
"Category",
"Unplayed",
"ReleaseDate",
"Bpm",
*/

//"Comment",
//"Lyrics",

// undefined
/*
"Class",
"Id",
"PersistentId",
"DatabaseId",
"Bookmarkable", // NOT Options > Remember playback position.
"Bookmark", 
"Shufflable", // NOT Options > Skip when shuffling.
*/

// Newer iTunes features
/*
"Loved", // Newer iTunes feature.
"AlbumLoved", // Newer iTunes feature.
*/

// Video
/*
"Description", // Video. 255 char max.
"Show", // Video
"SeasonNumber", // Video
"EpisodeId", // Video
"EpisodeNumber", // Video
*/

// Sorting
/*
"SortName",
"SortAlbum",
"SortArtist",
"SortComposer",
"SortAlbumArtist",
"SortShow", // Video
*/
	];
	
	var emptySting = "";

	while (i != tracksCount) {
		i++;
		currentTrack = Tracks.Item(i);
		
		// Only keep AlbumArtist if it differs to Artist.
		if(currentTrack.AlbumArtist === currentTrack.Artist)
			currentTrack.AlbumArtist = "";
		
		for(var j = 0; j < fields.length; j++)
		{
			currentTrack[fields[j]] = emptySting;
		}
	}
	
}
catch (err) {
		WScript.Echo(err.description + '\n\Maybe no tracks selected.');
}

WScript.CreateObject('WScript.Shell').AppActivate('iTunes');
WScript.Quit();
