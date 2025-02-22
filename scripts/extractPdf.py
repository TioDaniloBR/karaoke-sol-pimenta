import pdfplumber
import json
import re

# Caminho do PDF
pdf_path = "app/db/nacionais.pdf"

# Expressão regular para extrair os dados corretamente
def check_valid_row(row):
    if row[0] == "" or row[0] == "INTÉRPRETE":
        return False
    return True

def extract_text_from_pdf(pdf_path):
    songs = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            table = page.extract_table()
            if table:
                for row in table:
                    print(row) 
                    if check_valid_row(row):
                        data = {}
                        data["artist"] = row[0]
                        data["code"] = row[1]
                        data["title"] = row[2]
                        data["lyricsSnippet"] = row[3]
                        songs.append(data)
    return songs

# Executando as funções
songs = extract_text_from_pdf(pdf_path)

# Salvando o JSON
with open("songs.json", "w", encoding="utf-8") as f:
    json.dump(songs, f, indent=2, ensure_ascii=False)

print(f"Extração concluída! {len(songs)} músicas salvas em songs.json.")

