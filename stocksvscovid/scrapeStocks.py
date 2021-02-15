## Import dependencies
import pandas as pd
from datetime import datetime as dt
import pandas_datareader as pdr
from bs4 import BeautifulSoup as bs
import requests

## Finding date and declaring variable
today = dt.utcnow().date()
today = dt.utcnow().date().strftime('%Y-%m-%d')

## Get stock ticker
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
