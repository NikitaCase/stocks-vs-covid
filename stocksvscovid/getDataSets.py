# Import SQLAlchemy Dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Other dependencies
import pandas as pd
from datetime import datetime as dt
import pandas_datareader as pdr
from bs4 import BeautifulSoup as bs
import requests

# Find out what day it is
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
        'postgres://enwwbrxgztksrt:1c2aad3ab81e0cf9607b24d641b4f4be8a34a9841e3cac37739b4ba14569b605@ec2-3-214-3-162.compute-1.amazonaws.com:5432/dfidnj18uan5ha', echo=False)
    session = Session(engine)
    Base = automap_base()
    Base.prepare(engine, reflect=True)
    cxn = engine.connect()
    df_name.to_sql(name=table_name, con=engine, if_exists='append', index=True)
    print(table_name + ' added')


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


from scrapeNews import scrape_News

Update_Database(scrape_News(), 'dates_table')

# Close connections
cxn.close()
session.close()
