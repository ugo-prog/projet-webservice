from flask import Flask, jsonify
from config import Config
from models import db
from routes.books import books_bp
from flask_migrate import Migrate
from routes.reviews import reviews_bp
from routes.stats import stats_bp
from routes.auth import auth_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db, compare_type=True)

# Création temporaire des tables
with app.app_context():
    db.create_all()

# Enregistrement des blueprints avec le préfixe /api
app.register_blueprint(reviews_bp, url_prefix='/api')
app.register_blueprint(books_bp, url_prefix='/api')
app.register_blueprint(stats_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api')

@app.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5009)