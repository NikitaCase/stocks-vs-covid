# Import Libraries
#----------------------------------------------------------------------------

import os
from flask import Flask, render_template, jsonify
 
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine


#------------------------------------------------------------------------------
# Create an engine for the database
#------------------------------------------------------------------------------
engine = create_engine('postgres://gvrxbsgl:OSgGmghNCc6_K8YCTvPaVp4jmm78ezbm@raja.db.elephantsql.com:5432/gvrxbsgl', echo=False)
#cxn = engine.connect()

# Reflect Database into ORM classes
#------------------------------------------------------------------------------
Base = automap_base()
Base.prepare(engine, reflect=True)

print(Base.classes.keys())


#------------------------------------------------------------------------------
# Flask Setup
#------------------------------------------------------------------------------
app = Flask(__name__)


# Frontend Route 
#------------------------------------------------------------------------------
@app.route("/")
def home():
    return render_template("index.html")


# Backend Routes
#------------------------------------------------------------------------------
@app.route('/entertainment')
def entertainment(): 
    
    stocks = Base.classes.combined_table
    session = Session(engine)

    gc = session.query(stocks.Ticker, stocks.Adj_Close, stocks.date).filter(stocks.Ticker =='GC.TO').order_by(stocks.date).all()
    recp = session.query(stocks.Ticker, stocks.Adj_Close, stocks.date).filter(stocks.Ticker =='RECP.TO').order_by(stocks.date).all()
    cgx = session.query(stocks.Ticker, stocks.Adj_Close, stocks.date).filter(stocks.Ticker =='CGX.TO').order_by(stocks.date).all()


    entertainment_stocks =[
        {
        'Ticker': 'GC.TO',
        'Date': [row[2] for row in gc],
        'Adj_Close': [row[1] for row in gc], 
        }, 
              {
        'Ticker': 'RECP.TO',
        'Date': [row[2] for row in recp],
        'Adj_Close': [row[1] for row in recp], 
        }, 
              {
        'Ticker': 'CGX.TO',
        'Date': [row[2] for row in cgx],
        'Adj_Close': [row[1] for row in cgx], 
        } 
    ]
    
    return jsonify(entertainment_stocks)

    
    entertainment_stocks =[
        {
        'Ticker': 'GC.TO',
        'Date': [row[2] for row in gc],
        'Adj_Close': [row[1] for row in gc], 
        }, 
              {
        'Ticker': 'RECP.TO',
        'Date': [row[2] for row in recp],
        'Adj_Close': [row[1] for row in recp], 
        }, 
              {
        'Ticker': 'CGX.TO',
        'Date': [row[2] for row in cgx],
        'Adj_Close': [row[1] for row in cgx], 
        } 
    ]
    
    return jsonify(entertainment_stocks)

    
    entertainment_stocks =[
        {
        'Ticker': 'GC.TO',
        'Date': [row[2] for row in gc],
        'Adj_Close': [row[1] for row in gc], 
        }, 
              {
        'Ticker': 'RECP.TO',
        'Date': [row[2] for row in recp],
        'Adj_Close': [row[1] for row in recp], 
        }, 
              {
        'Ticker': 'CGX.TO',
        'Date': [row[2] for row in cgx],
        'Adj_Close': [row[1] for row in cgx], 
        } 
    ]
    
    return jsonify(entertainment_stocks)

    
    entertainment_stocks =[
        {
        'Ticker': 'GC.TO',
        'Date': [row[2] for row in gc],
        'Adj_Close': [row[1] for row in gc], 
        }, 
              {
        'Ticker': 'RECP.TO',
        'Date': [row[2] for row in recp],
        'Adj_Close': [row[1] for row in recp], 
        }, 
              {
        'Ticker': 'CGX.TO',
        'Date': [row[2] for row in cgx],
        'Adj_Close': [row[1] for row in cgx], 
        } 
    ]
    
    return jsonify(entertainment_stocks)

    
    entertainment_stocks =[
        {
        'Ticker': 'GC.TO',
        'Date': [row[2] for row in gc],
        'Adj_Close': [row[1] for row in gc], 
        }, 
              {
        'Ticker': 'RECP.TO',
        'Date': [row[2] for row in recp],
        'Adj_Close': [row[1] for row in recp], 
        }, 
              {
        'Ticker': 'CGX.TO',
        'Date': [row[2] for row in cgx],
        'Adj_Close': [row[1] for row in cgx], 
        } 
    ]
    
    return jsonify(entertainment_stocks)


#------------------------------------------------------------------------------
# Debugging
#------------------------------------------------------------------------------

if __name__ == "__main__":
    app.run()
