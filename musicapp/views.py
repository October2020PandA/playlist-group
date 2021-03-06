from django.shortcuts import render, HttpResponse
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import json
#testing 123
#get request to render page
#post request for form submital search

from django.http import JsonResponse
from django.middleware.csrf import get_token

def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

def ping(request):
    return JsonResponse({'result': 'OK'})

# sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='d5c02f804f4c43459bc60d6cb37ba13b', client_secret='0db63341d13d4197a37aa030d3cd5f7e'))

def index(request):
    return render(request, 'index.html')

# ORIGINAL
# def search(request):
#     sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='d5c02f804f4c43459bc60d6cb37ba13b', client_secret='0db63341d13d4197a37aa030d3cd5f7e'))
#     # search for song with limit of 10 results
#     query = request.POST['search_query']#example = weezer
#     results = sp.search(q= query, limit=5)
#     saved_uri = []
#     for idx, track in enumerate(results['tracks']['items']):
#         print(idx, track['name'] , track['id']) #prints index, track name, spotify track ID
#         uri = track['uri']
#         saved_uri.append(uri)#save a list to access audio features of soundtrack
#     context = {
#         'list_songs': results 
#     }
#     return render(request, 'index.html', context)


def search(request):
    sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='d5c02f804f4c43459bc60d6cb37ba13b', client_secret='0db63341d13d4197a37aa030d3cd5f7e'))
    # search for song with limit of 10 results
    # query = request.POST['search_query'] #example = weezer
    # print(request._body.decode("utf-8"), type(request._body.decode("utf-8")))
    res = json.loads(request._body.decode("utf-8")) 
    # print(res, type(res))
    print(res['search_query'])
    #query = request._body #example = weezer
    query = res['search_query']
    results = sp.search(q= query, limit=5)
    saved_uri = []
    for idx, track in enumerate(results['tracks']['items']):
        print(idx, track['name'] , track['id']) #prints index, track name, spotify track ID
        uri = track['uri']
        saved_uri.append(uri)#save a list to access audio features of soundtrack
    context = {
        'list_songs': results 
    }
    # return render(request, 'index.html', context)
    return JsonResponse({'response': context})


def selected_song(request):
    sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='d5c02f804f4c43459bc60d6cb37ba13b', client_secret='0db63341d13d4197a37aa030d3cd5f7e'))
    res = json.loads(request._body.decode("utf-8"))

    #print('\n\n\n', res['select_uri'], '\n\n\n')

    print('\n\n\n', res, type(res), '\n\n\n')
    #print('\n\n\n', request._body, '\n\n\n')
    select_uri = res['select_uri'] #POST request to get selected song URI string
    # selected_feature = request.POST['feature_type'] # bpm or tempo
    song_features = sp.audio_features(select_uri)#audio features of result of selected
    print(song_features)
    song_desiredtype = song_features[0]['tempo'] # Create your views here.
    similar_songs = sp.recommendations(seed_tracks=[select_uri], limit=5, target_tempo = song_desiredtype)
    print(similar_songs)
    context1 = {
        'recommended_songs': similar_songs
    }

    # return render(request, 'index.html', context1)
    return JsonResponse({'response': context1})