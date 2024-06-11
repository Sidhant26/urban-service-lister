from flask import Flask, jsonify, request
from nltk.sentiment import SentimentIntensityAnalyzer
from flask_cors import CORS

app = Flask(__name__)
cors=CORS(app)

sia = SentimentIntensityAnalyzer()

@app.route('/predict', methods=['GET'])
def analyze_sentiment():
    text = request.args.get('text')
    sentiment_scores = sia.polarity_scores(text)
    if sentiment_scores['compound'] >= 0.05:
        sentiment = 'Positive'
    elif sentiment_scores['compound'] <= -0.05:
        sentiment = 'Negative'
    else:
        sentiment = 'Neutral'
    return jsonify({'sentiment': sentiment, 'scores': sentiment_scores})

if __name__ == '__main__':
    app.run(debug=True)