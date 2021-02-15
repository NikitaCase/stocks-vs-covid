# Import dependencies
import requests
import pandas as pd
from bs4 import BeautifulSoup as bs
from datetime import datetime as dt

# Import Beautiful Soup
def scrape_News():
    # Request to news site
    url = 'https://globalnews.ca/news/6859636/ontario-coronavirus-timeline/'
    response = requests.get(url)

    # Dictionary to convert date-time
    numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    names = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June',
             'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']

    month_dict = dict(zip(names, numbers))

    # Empty lists to hold parsed data
    dates = []
    news = []

    # Parse data
    soup = bs(response.text, 'html.parser')
    paragraphs = soup.find_all('p')
    for p in paragraphs:
        # Remove html tags
        p = p.get_text()
        # Select only news items in the form date, event
        t = p.startswith(('Jan.', 'Feb.', 'March', 'April', 'May',
                          'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'))
        if t == True:
            p = str(p).split(':')
            datestr = p[0].strip()
            datestr = datestr.replace(', ', ' ')
            datel = datestr.split(' ')
            for (k, v) in month_dict.items():
                if(datel[0] == k):
                    datel[0] = v
            date = "-".join(datel)
            date = dt.strptime(date, '%m-%d-%Y')
            event = p[1].strip()  # remove leading whitespace
            dates.append(date)
            news.append(event)

    #Create a dictionary of news items
    data = {
        'Date': dates,
        'News': news
    }

    # Transform dictionary to dataframe
    dates_df = pd.DataFrame(data, columns=['Date', 'News'])
    dates_df['Date'] = pd.to_datetime(dates_df['Date'])
    print(dates_df.head())
    return dates_df

# def Update_Dates():
#     engine = create_engine(
#         'postgres://enwwbrxgztksrt:1c2aad3ab81e0cf9607b24d641b4f4be8a34a9841e3cac37739b4ba14569b605@ec2-3-214-3-162.compute-1.amazonaws.com:5432/dfidnj18uan5ha', echo=False)
#     session = Session(engine)
#     Base = automap_base()
#     Base.prepare(engine, reflect=True)
#     dates_df.to_sql(name='dates_table', con=engine,
#                     if_exists='append', index=True)
#     print('dates table pushed')

#scrape_News()
#Update_Dates()
