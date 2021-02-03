# Feb 2 Class notes


app = Flask(__name__)

# frontend routes
@app.route("/")
def home():
    return render_template("index.html") 

exdict 

@app.route('/')

# pulling info from elephant sql
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgress??: something something'


@app.route('return api data')
def first():
    data = db.session.query().all()
    return jsonify (data)

# one service route per table
# each visualization on different route
# put burden of population in backend 



# d3.json("api").then(function(data) {
#     console.log(data)
# })