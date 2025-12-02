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

    def search_website(self, searchType, resultsOrder, keywords):
        keywords = keywords.split()
        query = {}
        if searchType == "or":
            query["description"] = {"$regex": "|".join(keywords)}
        elif searchType == "and":
            query["$and"] = [{"description": {"$regex": k}} for k in keywords]
        elif searchType == "not":
            query["description"] = {"$not": {"$regex": "|".join(keywords)}}

        results = list(self.websites.find(query))
        for r in results:
            r["_id"] = str(r["_id"])

        if resultsOrder == "alphabetical":
            results.sort(key=lambda x: str(x.get("title", "")).lower())
        elif resultsOrder == "frequency":
            results.sort(key=lambda x: x.get("visited", 0), reverse=True)
        elif resultsOrder == "payment":
            results.sort(key=lambda x: x.get("payment", 0), reverse=True)

        return results