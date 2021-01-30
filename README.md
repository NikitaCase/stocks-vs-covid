# Stocks-vs-covid

### Members
- Mark Rotil
- Nikita Case
- Eric Lee 
- Hadi Hanif
- Murat Cagri KOC

### Our project Goal 

Our goal for this project is to provide significant proof of which industries thrived through this pandemic.
This proof will be provided in the form of sample data from the yahoo stock market site. We have taken specific stocks and catagorized them under Entertainment, Hospitality, Aviation, Technology, and Telecommunications. We plan to keep users up to date with a chronological time line of announcements made in Ontario(scraped from the Global News Website) with a drop down bar. In our data sets we have
included the year prior to compare what the norm was, to what the norm is now. We plan to dynamically showcase the comparison between 2019 to 2020 with interactive visulizations using plotly and D3. We plan to use to use the cloud base service, "Heroku" to launch our app.

We will track the prices of these stocks from the 1st of January 2020 to the 4th of December 2020 and then compare it to the previous year. 


### Hypothesis

We hypothesize that fluctuations of stock prices are strongly correlated with key events in Covid-19 such as lockdowns and that the correlation has weakened as time passed and that this applies across all sectors of the stock market. 



### What We Are Using

##### Data Sources 
- Yahoo Finance: stock prices on a daily basis
- Global News: timeline of COVID milestones in Ontario (https://globalnews.ca/news/6859636/ontario-coronavirus-timeline/)

##### DataBase Services                            
* PostgreSQL                                                                                  
* ElephantSQL                               
                                                 
##### Languags      
* Javascript (Plotly, D3)
* Python (Flask, Flask-SQLAlchemy) 
* HTML5 
* CSS
  
##### Cloud Service
* Heroku 


### Deployment

A flask app will be created with 3 routes
- Home 

Loads sample graphs from the dataset showing comparisons of stock prices and important announcement dates 

Contains dropdowns which the user can use to select stock tickers and dates

- Update 

Opens the database, sorts data by user selection, updates the home page and redirects the user to the 
                                                 
                                                 
- Api 

Returns all the data stored on the sql database (stock data and covid dates) in an api format
