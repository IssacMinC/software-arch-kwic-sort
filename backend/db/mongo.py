from pymongo import MongoClient

class MongoHandler:
    def __init__(self, uri="mongodb+srv://DBUser:DBPassword@cyberminer.syv0qil.mongodb.net/", db_name="Cyberminer"):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.websites = self.db["Websites"]
        self.kwic = self.db["KWIC"]

    def get_next_url_id(self):
        return self.websites.count_documents({})
    
    def insert_website(self, title, url, description, visited=0, payment=0):
        urlID = self.get_next_url_id()
        
        doc = {
            "title": title,
            "url": url,
            "urlID": urlID,
            "description": description,
            "visited": visited,
            "payment": payment,
        }
        result = self.websites.insert_one(doc)
        return urlID

    def insert_kwic_entry(self, urlID, kwicDescription, firstWord):
        doc = {
            "urlID": urlID,
            "kwicDescription": kwicDescription,
            "firstWord": firstWord
        }
        return self.kwic.insert_one(doc)
    
    def delete_entry(self, urlID):
        self.websites.delete_one({"urlID" : urlID})
        self.kwic.delete_many({"urlID" : urlID})

    def get_website(self, urlID):
        return self.websites.find_one({"urlID": urlID})

    def get_kwic_by_word(self, word):
        return self.kwic.find({"firstWord": word})
    
    def get_next_url_id(self):
        return 0