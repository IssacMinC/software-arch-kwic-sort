from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

@app.route('/store', methods=['POST'])
def store():
    data = request.json
    line = data['line']
    p.parse(line)
    s.shift(p.getInput())
    a.sort(s.getShifts())
    l.add(a.getAlpha())

    return {
      "shifts": s.getShifts(),
      "alphas": a.getAlpha(),
      "store": l.getData()
    }

if __name__ == '__main__':
    app.run(debug=True)