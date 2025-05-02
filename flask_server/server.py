from flask import Flask

app = Flask(__name__)

@app.route("/interns")

def interns():
    return{"interns": ["intern1", "intern2"]}

if __name__ == "__main__":
    app.run(debug = True)

