import uuid
import csv
import json

class Artist:
    def __init__(self, name, image_url, country):
        self.name = name
        self.image_url = image_url
        self.country = country
        self.id = str(uuid.uuid4())  # Convert UUID to string for JSON compatibility
    
    def __eq__(self, other):
        return self.name == other.name

    def __hash__(self):
        return hash(self.name)

    def to_dict(self):  # Convert Artist to a dictionary for JSON serialization
        return {
            "id": self.id,
            "name": self.name,
            "image_url": self.image_url,
            "country": self.country
        }

csv_file = 'songs.csv'

# Open and read the CSV file
with open(csv_file, mode='r', newline='', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    
    artists = {}  # Use a dictionary to store unique artists
    songs = []

    def find_or_create_artist(name, image_url, country):
        if name in artists:
            return artists[name]
        artist = Artist(name, image_url, country)
        artists[name] = artist
        return artist
    
    # Iterate through each row
    for row in reader:
        artist = find_or_create_artist(row['artistName'], row['image_url'], row['country'])
        
        # Convert song row to a dictionary, but replace artist name with artist object
        song_data = dict(row)
        song_data["artist"] = artist.to_dict()  # Store artist as a dictionary
        song_data["artistId"] = artist.id

        songs.append(song_data)
    
    # Write JSON file
    with open('songs.json', 'w', encoding='utf-8') as json_file:
        json.dump(songs, json_file, indent=4, ensure_ascii=False)

    with open('artists.json', 'w', encoding='utf-8') as json_file:
        json.dump([artist.to_dict() for artist in artists.values()], json_file, indent=4, ensure_ascii=False)

print("✅ JSON files 'songs.json' created successfully!")

