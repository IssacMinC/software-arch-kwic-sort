from pymongo import MongoClient

class MongoHandler:
    def __init__(self, uri="", db_name=""):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.websites = self.db["Websites"]
        self.kwic = self.db["KWIC"]


    def insert_website(self, title, url, description, visited=0, payment=0):
        doc = {
            "title": title,
            "url": url,
            "description": description,
            "visited": visited,
            "payment": payment,
        }
        result = self.websites.insert_one(doc)
        return url

    def insert_kwic_entry(self, url, kwicDescription, firstWord):
        doc = {
            "url": url,
            "kwicDescription": kwicDescription,
            "firstWord": firstWord
        }
        return self.kwic.insert_one(doc)
    
    def delete_entry(self, url):
        self.websites.delete_one({"url" : url})
        self.kwic.delete_many({"url" : url})

    def get_website(self, urlID):
        return self.websites.find_one({"urlID": urlID})

    def get_kwic_by_word(self, word):
        return self.kwic.find({"firstWord": word})
    
    def get_next_url_id(self):
        return 0
    
