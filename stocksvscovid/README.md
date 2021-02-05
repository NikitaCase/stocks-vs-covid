# Stocks-vs-covid

### Members
- Mark Rotil
- Nikita Case
- Eric Lee 
- Hadi Hanif
- Murat Cagri KOC

### Our project Goal 

Our goal for this project is to provide significant proof of which industries thrived through this pandemic.
This proof will be provided in the form of sample data from the yahoo stock market site. We have taken specific stocks and catagorized them under Entertainment, Hospitality, Aviation, Technology, and Telecommunications. We plan to keep users up to date with a chronological time line of announcements made in Ontario(scraped from the Global News Website) with a drop down bar. We included the year prior in our data sets to compare the norm between last year and the current year. We plan to dynamically showcase the comparison between 2019 to 2020 with interactive visulizations using plotly, D3, and the cloud base service, "Heroku" to launch our app.

We will track the prices of these stocks from the 1st of January 2020 to the 4th of December 2020 and then compare it to the previous year. 


### Hypothesis

We hypothesize that fluctuations of stock prices are strongly correlated with key events in Covid-19 such as lockdowns and that the correlation has decreased as time passed. We also want to show that this applies across all sectors of the stock market. 



### What We Are Using

##### Data Sources 
- Yahoo Finance: stock prices on a daily basis
- Global News: timeline of COVID milestones in Ontario (https://globalnews.ca/news/6859636/ontario-coronavirus-timeline/)

##### DataBase Services                            
* PostgreSQL                                                                                  
* ElephantSQL                               
                                                 
##### Languages      
* Javascript (Plotly, D3, Bootstrap)
* Python (Flask, Flask-SQLAlchemy) 
* HTML5 
* CSS
  
##### Cloud Service
* Heroku 


### Deployment

A flask app will be created and hosted on Heroku. It will have 3 routes: 

##### Home 

- Loads sample graphs from the dataset showing comparisons of stock prices and important announcement dates. 

- Contains dropdowns which the user can use to select stock tickers and dates to update the graphs and view changes in stock price around the chosen date.

##### Update 

- Opens the database, sorts data by user selection, updates the home page and redirects the user to the home page.
                                                 
                                                 
##### API 

- Returns all the data stored on the sql database (stock data and covid dates) in an api format.
