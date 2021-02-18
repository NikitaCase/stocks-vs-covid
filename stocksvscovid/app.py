# Import Libraries
# ----------------------------------------------------------------------------

from flask import Flask, render_template, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
#from scrapeStocks import Get_Stock

# ------------------------------------------------------------------------------
# Create an engine for the database
# ------------------------------------------------------------------------------
engine = create_engine(
    'postgres://enwwbrxgztksrt:1c2aad3ab81e0cf9607b24d641b4f4be8a34a9841e3cac37739b4ba14569b605@ec2-3-214-3-162.compute-1.amazonaws.com:5432/dfidnj18uan5ha', echo=False)
# cxn = engine.connect()

# Reflect Database into ORM classes
# ------------------------------------------------------------------------------
Base = automap_base()
Base.prepare(engine, reflect=True)

# ------------------------------------------------------------------------------
# Flask Setup
# ------------------------------------------------------------------------------
app = Flask(__name__)


# Frontend Route and Homepage
# ------------------------------------------------------------------------------
@app.route("/")
def home():
    return render_template("index.html")


# Backend Routes:
# Entertainment page
# ------------------------------------------------------------------------------
@app.route('/entertainment')
def entertainment():

    stocks = Base.classes.entertainment
    session = Session(engine)

    gc = session.query(stocks.Ticker, stocks.Adj_Close, stocks.Date).filter(
        stocks.Ticker == 'GC.TO').order_by(stocks.Date).all()
    recp = session.query(stocks.Ticker, stocks.Adj_Close, stocks.Date).filter(
        stocks.Ticker == 'RECP.TO').order_by(stocks.Date).all()
    cgx = session.query(stocks.Ticker, stocks.Adj_Close, stocks.Date).filter(
        stocks.Ticker == 'CGX.TO').order_by(stocks.Date).all()

    entertainment_stocks = {"entertainment_stocks": [
        {
            'Ticker': 'GC.TO',
            'Date': [row[2] for row in gc],
            'Adj_Close': [row[1] for row in gc]
        },
        {
            'Ticker': 'RECP.TO',
            'Date': [row[2] for row in recp],
            'Adj_Close': [row[1] for row in recp]
        },
        {
            'Ticker': 'CGX.TO',
            'Date': [row[2] for row in cgx],
            'Adj_Close': [row[1] for row in cgx]
        }
    ]}
    session.close()
    return jsonify(entertainment_stocks)

# Telecommunication page
# ------------------------------------------------------------------------------
@app.route('/telecommunication')
def telecommunication():

    stocks = Base.classes.telecommunication
    session = Session(engine)

    rci = session.query(stocks.Ticker, stocks.Adj_Close, stocks.Date).filter(
        stocks.Ticker == 'RCI-B.TO').order_by(stocks.Date).all()
    bce = session.query(stocks.Ticker, stocks.Adj_Close, stocks.Date).filter(
        stocks.Ticker == 'BCE.TO').order_by(stocks.Date).all()

    telecommunication_stocks = {"telecommunication_stocks": [
        {
            'Ticker': 'RCI-B.TO',
            'Date': [row[2] for row in rci],
            'Adj_Close': [row[1] for row in rci]
        },
        {
            'Ticker': 'BCE.TO',
            'Date': [row[2] for row in bce],
            'Adj_Close': [row[1] for row in bce]
        }
    ]}
    session.close()
    return jsonify(telecommunication_stocks)

# Dates page
# --------------------------------------------------------------------------------
@app.route('/dates')
def dates():

    stocks = Base.classes.dates_table
    session = Session(engine)

    news = session.query(stocks.Date, stocks.News).all()

    date_dict = {"Story": [{
        'Date': [row[0] for row in news],
        'News': [row[1] for row in news]
    }]}

    session.close()
    return jsonify(date_dict)

# Technology Page
# ------------------------------------------------------------------------------
@app.route('/technology')
def technology():

    stocks = Base.classes.technology
    session = Session(engine)

    kxs = session.query(stocks.Ticker, stocks.Adj_Close, stocks.Date).filter(
        stocks.Ticker == 'KXS.TO').order_by(stocks.Date).all()
    shop = session.query(stocks.Ticker, stocks.Adj_Close, stocks.Date).filter(
        stocks.Ticker == 'SHOP.TO').order_by(stocks.Date).all()

    tech_stocks = {"technology": [
        {
            'Ticker': 'KXS.TO',
            'Date': [row[2] for row in kxs],
            'Adj_Close': [row[1] for row in kxs]
        },
        {
            'Ticker': 'SHOP.TO',
            'Date': [row[2] for row in shop],
            'Adj_Close': [row[1] for row in shop]
        }
    ]}
    session.close()
    return jsonify(tech_stocks)

# Aviation page
# ------------------------------------------------------------------------------
@app.route('/aviation')
def aviation():

    stocks = Base.classes.aviation
    session = Session(engine)

    bbd = session.query(stocks.Ticker, stocks.Adj_Close, stocks.Date).filter(
        stocks.Ticker == 'BBD-B.TO').order_by(stocks.Date).all()
    ac = session.query(stocks.Ticker, stocks.Adj_Close, stocks.Date).filter(
        stocks.Ticker == 'AC.TO').order_by(stocks.Date).all()

    aviation_stocks = {"aviation_stocks": [
        {
            'Ticker': 'BBD-B.TO',
            'Date': [row[2] for row in bbd],
            'Adj_Close': [row[1] for row in bbd]
        },
        {
            'Ticker': 'AC.TO',
            'Date': [row[2] for row in ac],
            'Adj_Close': [row[1] for row in ac]
        }
    ]}
    session.close()
    return jsonify(aviation_stocks)

# ------------------------------------------------------------------------------

### Murat Working on this
# @app.route('/ticker/api/<symbol>')
# def ticker_api():
#     tickerData
#     scraped = json.loads(Get_Stock(symbol).to_json(orient="records"))

#     for data in scraped.find():
#         tickerData.append(item)
#     return jsonify(scraped)

if __name__ == "__main__":
    app.run()
