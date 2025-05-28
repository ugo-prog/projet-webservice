from flask import Flask, jsonify
from config import Config
from models import db
from routes.books import books_bp
from flask_migrate import Migrate
from routes.reviews import reviews_bp

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(reviews_bp)

db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

app.register_blueprint(books_bp)

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')