# Import SQLAlchemy Dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Import more dependencies
import pandas as pd
from datetime import datetime as dt
import pandas_datareader as pdr
from bs4 import BeautifulSoup as bs
import requests

# Find out what day it is and declaring today variable
today = dt.utcnow().date()
today = dt.utcnow().date().strftime('%Y-%m-%d')

# Create dataframe from single stock ticker
def Get_Stock(ticker):
    df = pdr.DataReader(ticker, data_source='yahoo',
                        start='2019-01-01', end=today)
    df = df.reset_index()
    df = df.drop(columns=['Close'])
    df = df.rename(columns={'Adj Close': 'Adj_Close'})
    df = df[pd.notnull(df['Adj_Close'])]
    df.insert(6, column='Ticker', value=ticker)
    df['Date'] = pd.to_datetime(df['Date'])

    return df

# To update database with dataframe

def Update_Database(df_name, table_name):
    engine = create_engine(
        'postgres://xlijioqnhlxwoc:0a00b7a48002425a8b83c6e5bd8f95473b8ef96759ae3eeae3d3515cd22da78c@ec2-3-215-118-246.compute-1.amazonaws.com:5432/d7nea22a1dpr79', echo=False)
    session = Session(engine)
    Base = automap_base()
    Base.prepare(engine, reflect=True)
    cxn = engine.connect()
    df_name.to_sql(name=table_name, con=engine, if_exists='append', index=True)
    print(table_name + ' added')

    # Close connections
    cxn.close()
    session.close()


#### Create stock dataframes
# Create entertainment df
gc = Get_Stock('GC.TO')
recp = Get_Stock('RECP.TO')
cgx = Get_Stock('CGX.TO')
entertainment_df = pd.concat([gc, recp, cgx])

# Create telecommunication df
rci = Get_Stock('RCI-B.TO')
bce = Get_Stock('BCE.TO')
telecommunication_df = pd.concat([rci, bce])

# Create technology df
nv = Get_Stock('NVEI.TO')
shop = Get_Stock('SHOP.TO')
technology_df = pd.concat([nv, shop])

# Create aviation df
ac = Get_Stock('AC.TO')
bbd = Get_Stock('BBD-B.TO')
aviation_df = pd.concat([ac, bbd])

#### Update Databases
Update_Database(entertainment_df, 'entertainment')
Update_Database(telecommunication_df, 'telecommunication')
Update_Database(technology_df, 'technology')
Update_Database(aviation_df, 'aviation')

# import from scrapenews.py
from scrapeNews import scrape_News

# run function
Update_Database(scrape_News(), 'dates_table')

