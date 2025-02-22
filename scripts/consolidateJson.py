import json

file_national_artists = open('app/db/artists-national.json', 'r')
file_international_artists = open('app/db/artists-international.json', 'r')

national_artists = json.load(file_national_artists)
international_artists = json.load(file_international_artists)

file_international_artists.close()
file_national_artists.close()

def find_artist(artist, artist_base):
    for a in artist_base:
        if a['name'] == artist:
            return a

    return None


with open('app/db/songs-nationals.json', 'r') as f:
    nationals = json.load(f)
    for song in nationals:
        song['country'] = 'National'
        artist = find_artist(song['artist'], national_artists)
        if artist:
            song['image_url'] = artist['image_url']

with open('app/db/songs-internationals.json', 'r') as f:
    internationals = json.load(f)
    for song in internationals:
        song['country'] = 'International'
        artist = find_artist(song['artist'], international_artists)
        if artist:
            song['image_url'] = artist['image_url']

with open('app/db/songs.json', 'w') as f:
    songs = nationals + internationals
    json.dump(songs, f, ensure_ascii=False)


