from flask import Flask, request
from flask_cors import CORS
from db.mongo import MongoHandler

app = Flask(__name__)
CORS(app)

db = MongoHandler()
print(db.websites.count_documents({}))

class Parser:
  def __init__(self):
    self.current = ""
    self.all = []

  def clean(self, s) :
    tmp = []
    for w in s:
      w = w.lower()
      tmp.append(w)
    return tmp

  def parse(self, text):
    tmp = text.split()
    self.current = self.clean(tmp)
    self.all.append(self.current)
    return self.current

  def getInput(self):
    return self.current


class Shifter:
  def __init__(self):
    self.shifts = []

  def shift(self, s):
    tmp = []
    for i in range(0, len(s)):
      h1 = s[i:]
      h2 = s[:i]
      shift = h1+h2
      tmp.append(" ".join(shift))
    self.shifts = tmp
    return self.shifts
  
  def getShifts(self):
    return self.shifts

class Alphabetizer:
  def __init__(self):
    self.alphabetized = []

  def sort(self, s):
    self.alphabetized = sorted(s)
    return self.alphabetized

  def getAlpha(self):
    return self.alphabetized

class LineStorage:
  def __init__(self):
    self.store = []

  def add(self, s):
    self.store += s
    self.store.sort()

  def getData(self):
    return self.store

l = LineStorage()
p = Parser()
s = Shifter()
a = Alphabetizer()

testTitle = 0

@app.route('/store', methods=['POST'])
def store():
    data = request.json
    url = data["url"]
    desc = data["desc"]

    global testTitle
    title = testTitle
    testTitle += 1

    urlID = db.insert_website(title, url, desc)

    p.parse(desc)
    s.shift(p.getInput())
    a.sort(s.getShifts())
    
    for line in a.getAlpha():
      first_word = line.split()[0]
      db.insert_kwic_entry(urlID, line, first_word)

    return {
      "shifts": list(a.getAlpha()),
      "alphas": [f"Created {len(a.getAlpha())} KWIC entries"],
      "store": [f"{urlID}: {url}"]
    }


if __name__ == '__main__':
    app.run(debug=True)