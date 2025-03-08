try {
	var iTunesApp = WScript.CreateObject("iTunes.Application");

	var	mainLibrary = iTunesApp.LibraryPlaylist;
	// if you want to use some other playlist as the base to look through, uncomment this next line
	// and change the "-All Songs" to the base playlist you want to use.:
	//var mainLibrary = iTunesApp.LibrarySource.Playlists.ItemByName("Playlist");
	var tracks = mainLibrary.Tracks;
	var libraryTracksCount = tracks.Count; // Count for iTunes collection
	
	var sortingTracksPlaylist = iTunesApp.CreatePlaylist("SortingTracks");
	var sortedTracksPlaylist = iTunesApp.CreatePlaylist("SortedTracks");

	var i, j, k;

	// Add all tracks to sorting playlist so tracks can be removed from sorting 
	// playlist during processing instead of being removed from main library.
	for (i = 1 /*iTunes collection starting index*/; i <= libraryTracksCount; i++) {
		sortingTracksPlaylist.AddTrack(tracks.Item(i));
	}

	var sortingTracksPlaylistTracks = sortingTracksPlaylist.Tracks;
	var sortingTracksPlaylistCount = sortingTracksPlaylistTracks.Count;

	var folderName = "Artists";
	var ITUserPlaylistSpecialKindFolder = 4; // (4) Folder playlist
	var ITUserPlaylistSpecialKindNone = 0; // 	(0) No special kind
	var artistArray = new Array();

	// Delete folder as our iPod can hold entire library, so we don't need to maintain underlying GUID references of playlists inside folder.
	folder.Delete();

	folder = iTunesApp.CreateFolder(folderName);
	
	// Prepare my known track number convention. Increments of 50.
	var knownTrackNumbers = [];

	for (i = 1; i < 50; i++) {
		knownTrackNumbers.push(i);
	}

	for (i = 1; i < 20; i++) {
		knownTrackNumbers.push(i*50);
	}

	knownTrackNumbers.push(999);
	knownTrackNumbersCount = knownTrackNumbers.length;

	// First pass, add all tracks that match known track numbers
	/*Process tracks in reverse as we're removing tracks while processing*/
	for (i = 0; i < knownTrackNumbersCount; i++) {
		currKnownTrackNumber = knownTrackNumbers[i];

		for (j = sortingTracksPlaylistCount; j >= 1 /*iTunes collection index starts at 1*/	; j--) {
			var currTrack = sortingTracksPlaylistTracks.Item(j);
			
			if(currTrack.TrackNumber === currKnownTrackNumber) {
				sortedTracksPlaylist.AddTrack(currTrack);
				currTrack.Delete();
			}

			sortingTracksPlaylistCount = sortingTracksPlaylistTracks.Count;
		}

	}

	// Second pass, add all leftover tracks that didn't match known track numbers
	/*Process tracks in reverse as we're removing tracks while processing*/
	for (i = sortingTracksPlaylistCount; i >= 1 /*iTunes collection index starts at 1*/	; i--) {
		var currTrack = sortingTracksPlaylistTracks.Item(i);

		sortedTracksPlaylist.AddTrack(currTrack);
		currTrack.Delete();

		sortingTracksPlaylistCount = sortingTracksPlaylistTracks.Count;
	}	

	sortedTracks = sortedTracksPlaylist.Tracks;

	// Get list of AlbumArtists and Artists
	for (i = 1 /*iTunes collection starting index*/; i <= libraryTracksCount; i++) {
		var currTrack = sortedTracks.Item(i);
		var albumArtist = currTrack.AlbumArtist;
		var artist = currTrack.Artist;

		// Use AlbumArtist when available.
		if ((albumArtist != undefined) && (albumArtist != "")) {
			if (artistArray[albumArtist] == undefined) {
				artistArray[albumArtist] = new Array();
			}
			artistArray[albumArtist].push(currTrack);
		}
		else if ((artist != undefined) && (artist != "")) {
			if (artistArray[artist] == undefined) {
				artistArray[artist] = new Array();
			}
			artistArray[artist].push(currTrack);
		}
	}

	for (var artistNameKey in artistArray) {
		var playlist = iTunesApp.LibrarySource.Playlists.ItemByName(artistNameKey);

		if (playlist == undefined && playlist != "") {
			playlist = folder.CreatePlaylist(artistNameKey);
		}
		else if (playlist.SpecialKind !== ITUserPlaylistSpecialKindNone) {
			throw "[" + artistNameKey + "] is not a kind of music playlist";
		}

		var trackArray = artistArray[artistNameKey];
		var tracksCount = trackArray.length; // length for JavaScript array

		for (k = 0/*JavaScript array starting index*/; k < tracksCount; k++) {
			playlist.AddTrack(trackArray[k]);
		}
	}
	
	// Delete sort playlists
	var sortingTracksPlaylist = iTunesApp.LibrarySource.Playlists.ItemByName("SortingTracks");
	
	sortingTracksPlaylist.Delete();	
	
	var sortedTracksPlaylist = iTunesApp.LibrarySource.Playlists.ItemByName("SortedTracks");
	
	sortedTracksPlaylist.Delete();
	
	// Delete empty playlists
	var playlists = iTunesApp.LibrarySource.Playlists;
	var emptyPlaylistsDeleted = 0;
	
	var playlistsCount = playlists.Count;
	for (var i = 1; i <= playlistsCount; i++)
	{
		var playlist = playlists.Item(i);

		if (playlist.SpecialKind === ITUserPlaylistSpecialKindNone
			&& playlist.Tracks.Count === 0) {
				playlist.Delete();
				emptyPlaylistsDeleted++;
		}
	}
	
	WScript.Echo("Done.\nEmpty Playlists Deleted: " + emptyPlaylistsDeleted);
}
catch (err) {
	WScript.Echo(err.Name + "\n\nOr maybe no tracks selected.");
}

WScript.CreateObject("WScript.Shell").AppActivate("iTunes");
WScript.Quit();