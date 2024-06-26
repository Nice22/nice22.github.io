from flask import Flask, render_template
from flask_babel import Babel, _, refresh

app = Flask(__name__)
babel = Babel(app)

@app.route('/')
def index():
    return render_template('\nice22.github.io/index.html')

if __name__ == '__main__':
    app.run(debug=True)