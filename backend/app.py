from flask import Flask
from flask_cors import CORS
from routes.employee_routes import employee_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(employee_bp)

@app.route('/')
def home():
    return "Employee Management API is running"

if __name__ == '__main__':
    app.run(debug=True)