from django.shortcuts import render, HttpResponse
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
#testing 123
#get request to render page
#post request for form submital search
#get request to return similar songs and attributes(i.e album cover/song title)
def index(request):
    # search for song with limit of 10 results
    sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='d5c02f804f4c43459bc60d6cb37ba13b', client_secret='0db63341d13d4197a37aa030d3cd5f7e'))
    
    #post request
    results = sp.search(q='weezer', limit=10)
    saved_uri = []
    for idx, track in enumerate(results['tracks']['items']):
        print(idx, track['name'] , track['id']) #prints index, track name, spotify track ID
        uri = track['uri']
        saved_uri.append(uri)#save a list to access audio features of soundtrack
    #######################
    # print(results['tracks']['items'][0]['uri'])#prints track ID
    #print(saved_uri[0])
    song1_features = sp.audio_features(saved_uri[0])#audio features of the first result of search
    print(song1_features)
    song1_tempo = song1_features[0]['tempo']


    results1 = sp.search(q='Sunburn', limit=1)
    saved1_uri = []
    for idx1, track1 in enumerate(results1['tracks']['items']):
        print(idx1, track1['name'] , track1['id']) #prints index, track name, spotify track ID
        uri1 = track1['uri']
        saved1_uri.append(uri1)#save a list to access audio features of soundtrack
    song2_features = sp.audio_features(saved1_uri[0])#audio features of the first result of search
    song2_tempo = song2_features[0]['tempo']
    print(song1_tempo, 'vs', song2_tempo)

    results3 = sp.recommendations(seed_tracks=[saved_uri[0]], limit=5, target_tempo = song1_tempo)
    print(results3)

    return HttpResponse("This is my response!")
# Create your views here.
