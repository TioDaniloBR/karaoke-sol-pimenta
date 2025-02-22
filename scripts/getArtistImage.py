import requests
from requests.auth import HTTPBasicAuth
import json
import sys

CLIENT_ID = sys.argv[1]
CLIENT_SECRET = sys.argv[2]

def get_spotify_token():
    url = 'https://accounts.spotify.com/api/token'
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    data = {'grant_type': 'client_credentials'}
    auth = HTTPBasicAuth(CLIENT_ID, CLIENT_SECRET)
    
    response = requests.post(url, headers=headers, data=data, auth=auth)
    response.raise_for_status()
    return response.json()['access_token']

token = get_spotify_token()
def get_artist_image(artist_name):
    search_url = 'https://api.spotify.com/v1/search'
    headers = {'Authorization': f'Bearer {token}'}
    params = {'q': artist_name, 'type': 'artist', 'limit': 1}
    
    search_response = requests.get(search_url, headers=headers, params=params)
    search_response.raise_for_status()
    search_results = search_response.json()
    
    if search_results['artists']['items']:
        artist = search_results['artists']['items'][0]
        if artist['images']:
            return artist['images'][0]['url']  # URL da imagem de maior resolução
        else:
            print('Nenhuma imagem encontrada para o artista.')
    else:
        print('Artista não encontrado.')



def load_json(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)  
        return data
    except FileNotFoundError:
        print(f"Erro: Arquivo {file_path} não encontrado.")
        return []
    except json.JSONDecodeError:
        print(f"Erro: O arquivo {file_path} não é um JSON válido.")
        return []

def process_artists(songs):
    print('Processangdo artistas...')
    output = { 'notFoundArtists': [] }
    artists = []

    for song in songs:
        artist_already_added = song['artist'] in [artist['name'] for artist in artists]
        if not artist_already_added:
            print(f'Procurando imagem para o artista: {song["artist"]}')
            image_url = get_artist_image(song['artist'])
            if not image_url:
                print(f'Artista não encontrado: {song["artist"]}')
                output['notFoundArtists'].append(song['artist'])
            artist = {'name': song['artist'], 'image_url': image_url}
            artists.append(artist)
    output['artists'] = artists
    return output

# Exemplo de uso
file_path = "nacionais.json"  # Nome do arquivo JSON
songs = load_json(file_path)

output = process_artists(songs)
with open('artists.json', 'w', encoding='utf-8') as f:
    print('Salvando artistas...')
    artists = output['artists']
    json.dump(artists, f, ensure_ascii=False, indent=2)

with open('artistsNotFound.json', 'w', encoding='utf-8') as f:
    print('Salvando artistas não encontrados...')
    notFound = output['notFoundArtists']
    json.dump(notFound, f, ensure_ascii=False, indent=2)

