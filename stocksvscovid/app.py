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

#------------------------------------------------------------------------------
@app.route('/telecommunication')
def telecommunication(): 
    
    stocks = Base.classes.combined_table
    session = Session(engine)

    rci = session.query(stocks.Ticker, stocks.Adj_Close, stocks.date).filter(stocks.Ticker =='RCI-B.TO').order_by(stocks.date).all()
    bce = session.query(stocks.Ticker, stocks.Adj_Close, stocks.date).filter(stocks.Ticker =='BCE.TO').order_by(stocks.date).all()

    telecommunication_stocks =[
        {
        'Ticker': 'RCI-B.TO',
        'Date': [row[2] for row in rci],
        'Adj_Close': [row[1] for row in rci], 
        }, 
        {
        'Ticker': 'BCE.TO',
        'Date': [row[2] for row in bce],
        'Adj_Close': [row[1] for row in bce], 
        } 
    ]
    
    return jsonify(telecommunication_stocks)


#--------------------------------------------------------------------------------
@app.route('/dates')
def dates(): 
    
    stocks = Base.classes.dates_table
    session = Session(engine)

    news = session.query(stocks.Date, stocks.News).all()
  
    date_dict ={
        'Date': [row[0] for row in news],
        'News': [row[1] for row in news]
        }
 
    
    return jsonify(date_dict)

#------------------------------------------------------------------------------
@app.route('/technology')
def technology(): 
    
    stocks = Base.classes.combined_table
    session = Session(engine)

    gc = session.query(stocks.Ticker, stocks.Adj_Close, stocks.date).filter(stocks.Ticker =='NVEI.TO').order_by(stocks.date).all()
    recp = session.query(stocks.Ticker, stocks.Adj_Close, stocks.date).filter(stocks.Ticker =='SHOP.TO').order_by(stocks.date).all()

    tech_stocks =[
        {
        'Ticker': 'NVEI.TO',
        'Date': [row[2] for row in gc],
        'Adj_Close': [row[1] for row in gc], 
        }, 
              {
        'Ticker': 'SHOP.TO',
        'Date': [row[2] for row in recp],
        'Adj_Close': [row[1] for row in recp], 
        }, 
    ]
    
    return jsonify(tech_stocks)



#------------------------------------------------------------------------------
@app.route('/aviation')
def aviation(): 
    
    stocks = Base.classes.combined_table
    session = Session(engine)

    bbd = session.query(stocks.Ticker, stocks.Adj_Close, stocks.date).filter(stocks.Ticker =='BBD-B.TO').order_by(stocks.date).all()
    ac = session.query(stocks.Ticker, stocks.Adj_Close, stocks.date).filter(stocks.Ticker =='AC.TO').order_by(stocks.date).all()
 


    aviation_stocks =[
        {
        'Ticker': 'BBD-B.TO',
        'Date': [row[2] for row in bbd],
        'Adj_Close': [row[1] for row in bbd], 
        }, 
              {
        'Ticker': 'AC.TO',
        'Date': [row[2] for row in ac],
        'Adj_Close': [row[1] for row in ac], 
        }, 
    ]
    
    return (aviation_stocks)   



if __name__ == "__main__":
    app.run()
